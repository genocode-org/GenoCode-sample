import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Two pages: the five steps (index.html) and an article with creatures in it (article.html).
    rollupOptions: {
      input: { main: "index.html", article: "article.html" },
    },
  },
});
