import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/mikrus-pwa/",
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["src/assets/react.svg"],
      manifest: {
        name: "mikr.us PWA",
        short_name: "mikr.us",
        description: "App that allows you to manage mikr.us servers",
        theme_color: "#402B43",
        icons: [
          {
            src: "src/assets/react.svg",
            sizes: "192x192",
            type: "image/svg",
          },
             {
            src: "src/assets/react.svg",
            sizes: "512x512",
            type: "image/svg",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.mikr.us',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
