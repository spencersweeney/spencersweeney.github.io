import { spawn } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";

const here = path.dirname(fileURLToPath(import.meta.url));
const built = path.resolve(here, "../../lampkeep");
const budget = 200 * 1024;

function gzipTotal(dir) {
  let total = 0;
  const files = readdirSync(dir);
  for (const name of files) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      total += gzipTotal(full);
      continue;
    }
    if (!/\.(js|css)$/.test(name)) continue;
    const size = gzipSync(readFileSync(full)).length;
    total += size;
    console.log(`${path.relative(built, full)} ${size} bytes gzip`);
  }
  return total;
}

const bytes = gzipTotal(built);
console.log(`js+css gzip total ${bytes}`);
if (bytes > budget) {
  console.error(`Over the 200KB gzip budget (${bytes})`);
  process.exit(1);
}

const server = spawn("python3", ["-m", "http.server", "4173", "--bind", "127.0.0.1"], {
  cwd: path.resolve(here, "../.."),
  stdio: "ignore",
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

try {
  let up = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch("http://127.0.0.1:4173/lampkeep/");
      if (res.ok) {
        up = true;
        break;
      }
    } catch {
      await sleep(200);
    }
  }
  if (!up) throw new Error("static server did not start");

  const chrome = await launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
  });
  const result = await lighthouse("http://127.0.0.1:4173/lampkeep/", {
    port: chrome.port,
    onlyCategories: ["performance", "best-practices"],
    formFactor: "desktop",
    screenEmulation: { disabled: true },
    output: "json",
  });
  await chrome.kill();
  const perf = Math.round((result.lhr.categories.performance.score ?? 0) * 100);
  const bp = Math.round((result.lhr.categories["best-practices"].score ?? 0) * 100);
  console.log(`lighthouse performance ${perf}, best-practices ${bp}`);
  if (perf < 90 || bp < 90) {
    console.error("Lighthouse scores below 90");
    process.exit(1);
  }
} finally {
  server.kill();
}
