import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/journal/',
  build: {
    outDir: 'dist',
  },
  plugins: [react()], // React 플러그인 추가
});