import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://sazidthecreator.github.io/',
  base: '/CREATIVE-BRANDING/',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
