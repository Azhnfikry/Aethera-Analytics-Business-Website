import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {BLOG_POSTS} from './src/data';

const SITE_URL = 'https://www.aetheraanalytics.com';

// Generates sitemap.xml at build time so new blog posts are listed automatically
function sitemap(): Plugin {
  return {
    name: 'sitemap',
    generateBundle() {
      const pages = ['/', '/about', '/blog', '/privacy', '/terms'].map((path) => ({path}));
      const posts = BLOG_POSTS.map((p) => ({path: `/blog/${p.id}`, lastmod: p.publishedAt}));
      const urls = [...pages, ...posts]
        .map(({path, lastmod}: {path: string; lastmod?: string}) =>
          `  <url><loc>${SITE_URL}${path}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), sitemap()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
