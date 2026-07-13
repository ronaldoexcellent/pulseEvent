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
  },
})