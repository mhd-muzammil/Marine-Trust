import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.marinebiodiversityconservation.com';

const staticRoutes = [
  '/',
  '/about',
  '/getinvolved',
  '/opine',
  '/careers',
  '/fellowship',
  '/projects',
  '/contact',
  '/donate',
  '/threats',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cancellation-refund-policy',
  '/membership-agreement',
  '/donation-policy',
  '/marine-life',
  '/countries',
  '/marine-quiz',
  '/ocean-drive',
  '/marine-news',
  '/heros',
  '/deleteaccount'
];

// TODO: Fetch dynamic routes (marine life species, countries, blog posts) if available via API

const generateSitemap = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
  .map((route) => {
    return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ sitemap.xml generated successfully!');
};

generateSitemap();
