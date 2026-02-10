import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BACKEND_PORT = process.env.BACKEND_PORT || "4000";

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
    proxy: {
      "/api": `http://localhost:${BACKEND_PORT}`,
    },
  },
});
