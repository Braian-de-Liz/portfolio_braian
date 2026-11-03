/* global process */
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Open Graph exige URL absoluta na imagem. Defina VITE_SITE_URL no deploy
// (ex.: https://seudominio.com) para o link ganhar a prévia correta.
const siteUrl = (process.env.VITE_SITE_URL || '').replace(/\/$/, '');
const injetaSiteUrl = () => ({
  name: 'inject-site-url',
  transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    injetaSiteUrl(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    include: ['src/**/*.test.{js,jsx}'],
    css: false,
    restoreMocks: true,
  },
})
