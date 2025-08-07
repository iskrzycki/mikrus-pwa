import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/mikrus-pwa/",
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["public/assets/icon-72.png", "public/assets/icon-120.png", "public/assets/icon-128.png", "public/assets/icon-144.png", "public/assets/icon-180.png", "public/assets/icon-192.png", "public/assets/icon-512.png", "public/assets/icon-1024.png"],
      manifest: {
        name: "mikr.us PWA",
        short_name: "mikr.us",
        description: "App that allows you to manage mikr.us servers",
        theme_color: "#402B43",
        icons: [
          {
            "src": "public/assets/icon-72.png",
            "sizes": "72x72",
            "type": "image/png"
          },
          {
            "src": "public/assets/icon-120.png",
            "sizes": "120x120",
            "type": "image/png"
          },
          {
            "src": "public/assets/icon-128.png",
            "sizes": "128x128",
            "type": "image/png"
          },
          {
            "src": "public/assets/icon-144.png",
            "sizes": "144x144",
            "type": "image/png"
          },
           {
            "src": "public/assets/icon-152.png",
            "sizes": "152x152",
            "type": "image/png"
          },
           {
            "src": "public/assets/icon-167.png",
            "sizes": "167x167",
            "type": "image/png"
          },
          {
            "src": "public/assets/icon-180.png",
            "sizes": "180x180",
            "type": "image/png"
          },
          {
            "src": "public/assets/icon-192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "public/assets/icon-512.png",
            "sizes": "512x512",
            "type": "image/png"
          },
          {
            "src": "public/assets/icon-1024.png",
            "sizes": "1024x1024",
            "type": "image/png"
          },
        ]
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
