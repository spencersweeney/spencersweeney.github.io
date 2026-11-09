import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const built = path.resolve(here, "../../lampkeep");
const JS_BUDGET = 500 * 1024;
const ASSET_BUDGET = Math.floor(2.5 * 1024 * 1024);

function walk(dir, pred) {
  let total = 0;
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      total += walk(full, pred);
      continue;
    }
    if (!pred(name)) continue;
    const size = gzipSync(readFileSync(full)).length;
    total += size;
    console.log(`${path.relative(built, full)} ${size} bytes gzip`);
  }
  return total;
}

const js = walk(built, (name) => /\.(js|css)$/.test(name));
const assets = walk(built, (name) => !/\.(js|css|html|map)$/.test(name));
console.log(`js+css gzip ${js}`);
console.log(`assets gzip ${assets}`);
if (js > JS_BUDGET) {
  console.error(`JS+CSS gzip ${js} exceeds 500 KB`);
  process.exit(1);
}
if (assets > ASSET_BUDGET) {
  console.error(`asset gzip ${assets} exceeds 2.5 MB`);
  process.exit(1);
}
