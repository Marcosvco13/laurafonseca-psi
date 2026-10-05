import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // usado no canonical, og:image e JSON-LD
  site: 'https://laurafonseca.psc.br',

  integrations: [sitemap()],
});