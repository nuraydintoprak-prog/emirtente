const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const OLD_GTM = `<!-- Google Tag Manager — deferred until interaction -->
<script>
window.dataLayer=window.dataLayer||[];
(function(){
  function loadGTM(){
    if(window._gtmLoaded)return;window._gtmLoaded=true;
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-K7R4XWXX');
  }
  ['click','scroll','keydown','mousemove','touchstart'].forEach(function(e){
    window.addEventListener(e,loadGTM,{once:true,passive:true});
  });
  setTimeout(loadGTM,3500);
})();
</script>
<!-- End Google Tag Manager -->`;

const NEW_GTM = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K7R4XWXX');</script>
<!-- End Google Tag Manager -->`;

const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html'));

let updated = 0;
htmlFiles.forEach(file => {
  const filePath = path.join(root, file);
  let html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('deferred until interaction')) {
    console.log(`  - ${file} (eşleşme yok)`);
    return;
  }
  html = html.replace(OLD_GTM, NEW_GTM);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  ✓ ${file}`);
  updated++;
});

console.log(`\nTamamlandı: ${updated} dosya güncellendi.`);
