import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://trimstyle.sicloud.ru/
export default defineConfig({
  base: '/',
  plugins: [react()],
})
