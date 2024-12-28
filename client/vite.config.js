import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const BACKEND_URL =
    mode === "development"
      ? "http://localhost:3000" // Local backend for development
      : "https://mentora-pweq.onrender.com"; // Deployed backend for production

  return {
    plugins: [react()],
    define: {
      "process.env.BACKEND_URL": JSON.stringify(BACKEND_URL),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
