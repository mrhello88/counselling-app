import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const BACKEND_URL =
    mode === "development"
      ? "http://localhost:3000" // Local backend for development
      : "https://counselling-app-ki9p.onrender.com"; // Deployed backend for production

  const STRIPE_PUBLIC_KEY =
    "pk_test_51QfqHlEu2tFhmAYyWj7e3Xa2QtvTbBMYOheKcKxpZwKI1ew82bco4iGhVTaxM7kWsanIpzixXgNgFyQ3tG95Qfpp00AnAXwQIN";

  return {
    plugins: [react()],
    define: {
      "process.env.BACKEND_URL": JSON.stringify(BACKEND_URL),
      "process.env.STRIPE_PUBLIC_KEY": JSON.stringify(STRIPE_PUBLIC_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
