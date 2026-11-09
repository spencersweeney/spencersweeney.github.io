import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const chromeLauncher = require("chrome-launcher");
const lighthouseMod = require("lighthouse");
const lighthouse = lighthouseMod.default ?? lighthouseMod;

const here = path.dirname(fileURLToPath(import.meta.url));
const built = path.resolve(here, "../../lampkeep");
const JS_BUDGET = 250 * 1024;
const MODEL_BUDGET = Math.floor(2.5 * 1024 * 1024);
const PAGE_BUDGET = 30 * 1024;

function walk(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

const files = walk(built);
let js = 0;
let models = 0;
let page = 0;
const forbidden = /PLACEHOLDER|TODO|TO CONFIRM|\btodo\b/;
for (const full of files) {
  const rel = path.relative(built, full);
  const raw = readFileSync(full);
  if (/\.(js|css|html)$/.test(full) && forbidden.test(raw.toString("utf8"))) {
    console.error(`forbidden placeholder text in ${rel}`);
    process.exit(1);
  }
  if (/\.(js|css)$/.test(full)) {
    const size = gzipSync(raw).length;
    js += size;
    console.log(`${rel} ${size} bytes gzip`);
  }
  if (/\.(glb|png|jpe?g|webp)$/.test(full)) models += raw.length;
  if (rel.startsWith(`career${path.sep}`) || rel === "career/index.html") page += raw.length;
}
console.log(`js+css gzip ${js}`);
console.log(`models+textures raw ${models}`);
console.log(`career page ${page}`);
if (js > JS_BUDGET) {
  console.error(`JS+CSS gzip ${js} exceeds 250 KB`);
  process.exit(1);
}
if (models > MODEL_BUDGET) {
  console.error(`models ${models} exceed 2.5 MB`);
  process.exit(1);
}
if (page > PAGE_BUDGET) {
  console.error(`career page ${page} exceeds 30 KB`);
  process.exit(1);
}

const port = 4183;
const server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", path.resolve(built, "..")], {
  stdio: "ignore",
});
await new Promise((resolvePromise) => setTimeout(resolvePromise, 400));
const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});
try {
  const result = await lighthouse(`http://127.0.0.1:${port}/lampkeep/career/`, {
    port: chrome.port,
    output: "json",
    onlyCategories: ["performance", "accessibility"],
    logLevel: "error",
  });
  const perf = Math.round((result.lhr.categories.performance.score ?? 0) * 100);
  const a11y = Math.round((result.lhr.categories.accessibility.score ?? 0) * 100);
  console.log(`lighthouse performance ${perf}`);
  console.log(`lighthouse accessibility ${a11y}`);
  if (perf < 95 || a11y < 100) {
    console.error("Lighthouse career-page scores missed the bar");
    process.exit(1);
  }
} finally {
  await chrome.kill();
  server.kill();
}
