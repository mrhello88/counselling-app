import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.BACKEND_URL": JSON.stringify(
      "http://localhost:5000" || "https://counselling-app-ki9p.onrender.com/"
    ), // Replace with your backend URL
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
