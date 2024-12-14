import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: 'Product-Eco-Score-Checker',
  plugins: [react()],
  optimizeDeps: {
    include: ['chart.js'],
  },
})
