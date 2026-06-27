/**
 * Emir Tente — SEO Düzeltme Scripti
 * - Eksik OG etiketleri ekle
 * - Eksik Twitter Card etiketleri ekle
 * - Eksik Schema.org BreadcrumbList ekle
 * - Google Ads uyumluluğu için meta etiketleri
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const BASE = 'https://emirtente.com.tr';
const OG_IMG = `${BASE}/img/WhatsApp%20Image%202026-06-26%20at%2019.10.05.jpeg`;

function processHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  let changed = false;

  // 1. Twitter Card (yoksa)
  if (!html.includes('twitter:card')) {
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : 'Emir Tente — Çeşme';
    const desc = descMatch ? descMatch[1] : 'Çeşme tente ve pergola uzmanı.';

    const twitterMeta = `  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${desc}" />
  <meta name="twitter:image" content="${OG_IMG}" />`;

    html = html.replace('  <!-- Open Graph -->', `${twitterMeta}\n  <!-- Open Graph -->`);
    changed = true;
  }

  // 2. OG image boyutu (yoksa)
  if (html.includes('og:image') && !html.includes('og:image:width')) {
    html = html.replace(
      /(<meta property="og:image"\s+content="[^"]+"\s*\/>)/,
      `$1\n  <meta property="og:image:width" content="1200" />\n  <meta property="og:image:height" content="630" />\n  <meta property="og:locale" content="tr_TR" />\n  <meta property="og:site_name" content="Emir Tente" />`
    );
    changed = true;
  }

  // 3. Open Graph eksikse ekle (OG olmayan sayfalar)
  if (!html.includes('og:title') && html.includes('<title>')) {
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : 'Emir Tente';
    const desc = descMatch ? descMatch[1] : 'Çeşme tente ve pergola uzmanı.';
    const url = canonicalMatch ? canonicalMatch[1] : BASE;

    const ogMeta = `  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:image" content="${OG_IMG}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="tr_TR" />
  <meta property="og:site_name" content="Emir Tente" />`;

    html = html.replace('</head>', `${ogMeta}\n</head>`);
    changed = true;
  }

  // 4. robots meta (yoksa) — Google Ads uyumluluğu için
  if (!html.includes('name="robots"')) {
    // Yasal sayfalar için noindex
    const isLegal = ['gizlilik-politikasi.html', 'kullanim-sartlari.html', 'cerez-politikasi.html'].includes(fileName);
    const robotsContent = isLegal ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
    html = html.replace(
      '<meta name="viewport"',
      `<meta name="robots" content="${robotsContent}" />\n  <meta name="viewport"`
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`  ✓ ${fileName}`);
  } else {
    console.log(`  - ${fileName} (değişiklik yok)`);
  }
}

const htmlFiles = fs.readdirSync(root)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(root, f));

console.log(`SEO düzeltmeleri uygulanıyor...\n`);
htmlFiles.forEach(processHtml);
console.log('\nSEO optimizasyonu tamamlandı.');
