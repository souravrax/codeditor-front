import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), monacoEditorPlugin({})],
  esbuild: {
    jsx: "preserve",
  },
});
