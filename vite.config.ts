import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('gsap'))         return 'vendor-gsap'
          if (id.includes('framer-motion')) return 'vendor-framer'
          if (id.includes('lenis'))         return 'vendor-lenis'
          if (id.includes('node_modules/react')) return 'vendor-react'
        },
      },
    },
  },
})
