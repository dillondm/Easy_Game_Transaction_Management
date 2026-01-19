import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7144', // ← Updated to YOUR API port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})