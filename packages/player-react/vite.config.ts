/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import path from "path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic",
      jsxImportSource: "react",
    }),
    cssInjectedByJsPlugin(),
  ],
  resolve: {
    alias: {},
  },
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  build: {
    lib: {
      name: "VideoPlayerReact",
      entry: path.resolve(__dirname, "./src/index.tsx"),
      formats: ["es", "cjs", "iife"],
      fileName: (format) => {
        switch (format) {
          case "es":
            return "index.mjs";
          case "cjs":
            return "index.cjs";
          case "iife":
            return "index.js";
          default:
            return "index.js";
        }
      },
    },
    minify: false,
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        banner: `/**
 *  Copyright ${new Date(Date.now()).getFullYear()}  VideoDB 
 *  @license MIT
**/`,
        exports: "named",
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
        },
      },
    },
  },
  test: {
    environment: "jsdom",
  },
});
