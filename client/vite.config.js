import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      // Example alias (replace '@chakra-ui/react' alias if not needed)
      "@chakra-ui/react": path.resolve(__dirname, "node_modules/@chakra-ui/react"),
    },
  },
});

