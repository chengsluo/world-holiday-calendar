export const data = { permalink: "sitemap.xml", eleventyExcludeFromCollections: true };

export function render({ site }) {
  const urls = site.pages.map(({ path }) => `  <url><loc>${site.origin}${site.base}${path}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
