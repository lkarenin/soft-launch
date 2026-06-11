import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this project at https://<user>.github.io/soft-launch/
// so the build needs to know its base path. In local dev `vite` is run
// without the production env so base remains '/'.
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/soft-launch/' : '/',
  plugins: [react()],
})
