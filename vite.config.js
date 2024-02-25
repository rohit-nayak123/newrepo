// vite.config.js

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/newrepo/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        notes: resolve(__dirname, "notes.html"),
        games: resolve(__dirname, "games/index.html"),
        ticTackToe: resolve(__dirname, "games/tic-tack-toe.html"),
      },
    },
  },
});
