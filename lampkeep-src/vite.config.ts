import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import { careerPageHtml } from "./src/content/careerPage";

function stripCareer(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripCareer);
  if (!value || typeof value !== "object") return value;
  const out: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (key.toLowerCase() === "todo") continue;
    out[key] = stripCareer(entry);
  }
  return out;
}

function careerPlugin(): Plugin {
  return {
    name: "lampkeep-career",
    enforce: "pre",
    load(id) {
      const norm = id.replaceAll("\\", "/");
      if (!norm.endsWith("/content/career.json")) return null;
      if (process.env.NODE_ENV !== "production") return null;
      const data = JSON.parse(readFileSync(id, "utf8")) as { items?: { status?: string }[]; resume?: { status?: string; href?: string | null } };
      data.items = (data.items ?? []).filter((item) => item.status === "approved");
      if (data.resume && data.resume.status !== "approved") data.resume = { status: "hidden", href: null };
      return JSON.stringify(stripCareer(data));
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url !== "/lampkeep/career" && url !== "/lampkeep/career/") {
          next();
          return;
        }
        res.setHeader("content-type", "text/html; charset=utf-8");
        res.end(careerPageHtml(true));
      });
    },
    closeBundle() {
      const dir = resolve(__dirname, "../lampkeep/career");
      mkdirSync(dir, { recursive: true });
      writeFileSync(resolve(dir, "index.html"), careerPageHtml(false));
    },
  };
}

export default defineConfig({
  base: "/lampkeep/",
  plugins: [careerPlugin()],
  build: {
    outDir: resolve(__dirname, "../lampkeep"),
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 900,
    target: "es2022",
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
