/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom', // Le decimos que simule un navegador
    globals: true,        // Nos permite usar describe() y it() sin importarlos en cada archivo
    setupFiles: './src/setupTests.ts', // Archivo que se ejecutará antes de los tests
  }
})