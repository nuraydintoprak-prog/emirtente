const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const GTM_HEAD = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K7R4XWXX');</script>
<!-- End Google Tag Manager -->`;

const GTM_BODY = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K7R4XWXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

let updated = 0;
let skipped = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(root, file);
  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('GTM-K7R4XWXX')) {
    console.log(`  - ${file} (zaten var)`);
    skipped++;
    return;
  }

  // <head> içine <meta charset> sonrasına ekle
  html = html.replace(
    /(<meta charset="UTF-8"\s*\/>)/,
    `$1\n  ${GTM_HEAD}`
  );

  // <body> açılış tagından hemen sonraya ekle
  html = html.replace(
    /(<body[^>]*>)/,
    `$1\n${GTM_BODY}`
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  ✓ ${file}`);
  updated++;
});

console.log(`\nTamamlandı: ${updated} güncellendi, ${skipped} atlandı.`);
