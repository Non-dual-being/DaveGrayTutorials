import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 5173, // Zorgt ervoor dat de app altijd op poort 5173 draait
    open: true, // Opent de app automatisch in de browser
    hmr: true, // Hot Module Replacement voor snellere updates
  },
  build: {
    outDir: 'dist', // Zorgt ervoor dat Vite de bestanden in 'dist' plaatst
  },
  preview: {
    port: 4173, // Voor de productie-preview
  }
})
