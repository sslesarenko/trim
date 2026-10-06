import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Project site: https://sslesarenko.github.io/trim/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? '/' : '/trim/',
  plugins: [react()],
}))
