import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  // URL pública do site (ex.: https://yurisoares.com.br) — usada nas meta tags de SEO/compartilhamento.
  const siteUrl = (env.VITE_SITE_URL ?? "").replace(/\/$/, "");

  return {
    server: {
      host: "::",
      port: 8080,
    },
    preview: {
      host: true,
      allowedHosts: true,
    },
    plugins: [
      react(),
      {
        name: "inject-site-url",
        transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", siteUrl),
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
