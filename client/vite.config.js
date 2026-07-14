import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 5173, // or whatever your port is
    headers: {
      // This tells the browser: "It is okay for popups (like Google Auth) to talk to this window"
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
    proxy: {
      // Forward any request starting with /api to your backend
      '/api': {
        target: 'http://localhost:3000', // ⚠️ Change 3000 to whatever port your Express server uses
        changeOrigin: true,
      },
    },
  },
})