import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 600,

    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|react-router-dom|react-helmet-async)/,
            },
            {
              name: "icons",
              test: /node_modules[\\/](lucide-react|react-icons)/,
            },
            {
              name: "vendor",
              test: /node_modules/,
            },
          ],
        },
      },
    },
  },
});