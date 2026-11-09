import { defineConfig } from "vite";
import { resolve } from "node:path";

// Published site is the gh-pages branch root. The game is a subpath so the
// solar-system homepage at / stays the Pages entry.
export default defineConfig({
  base: "/lampkeep/",
  build: {
    outDir: resolve(__dirname, "../lampkeep"),
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: false,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
