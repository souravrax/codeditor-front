import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
//@ts-expect-error - no types for tailwindcss vite
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    jsx: "preserve",
  },
  build: {
    sourcemap: true,
  },
});
