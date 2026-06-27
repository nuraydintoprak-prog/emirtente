/**
 * Emir Tente — HTML Optimizasyon Scripti
 * 1. <img> → <picture> (AVIF + fallback)
 * 2. CSS background-image → data-bg-avif swapper
 * 3. dns-prefetch hint'leri
 * 4. theme-color meta
 * 5. favicon link
 * 6. KVKK çerez banner'ı
 * 7. AVIF background JS detection
 * 8. Google Ads güvenlik: X-Content-Type-Options meta hint
 */

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const imgDir = path.join(root, 'img');

function hasAvif(imgSrc) {
  const base = imgSrc.replace(/\.(jpg|jpeg|png)$/i, '.avif');
  const full = path.join(root, base);
  return fs.existsSync(full);
}

function wrapWithPicture(imgTag, srcAttr) {
  if (!srcAttr || !srcAttr.startsWith('img/')) return imgTag;
  // logo'yu değiştirme
  if (imgTag.includes('logo.jpg') || imgTag.includes('logo (2).jpg')) return imgTag;
  // zaten picture içindeyse atla
  if (imgTag.includes('<picture')) return imgTag;

  const ext = path.extname(srcAttr).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return imgTag;
  if (!hasAvif(srcAttr)) return imgTag;

  const avifSrc = srcAttr.replace(/\.(jpg|jpeg|png)$/i, '.avif');
  return `<picture><source srcset="${avifSrc}" type="image/avif">${imgTag}</picture>`;
}

function processBgImages(html) {
  return html.replace(
    /style="(background-image:\s*url\('(img\/[^']+\.(jpg|jpeg|png))'\)[^"]*)"/gi,
    (match, styleVal, imgPath) => {
      if (!hasAvif(imgPath)) return match;
      const avifPath = imgPath.replace(/\.(jpg|jpeg|png)$/i, '.avif');
      return `data-bg="${imgPath}" data-bg-avif="${avifPath}" style="${styleVal}"`;
    }
  );
}

const COOKIE_BANNER_HTML = `
<!-- KVKK Çerez Onay Banner -->
<div id="cookie-banner" role="dialog" aria-label="Çerez Tercihleri" aria-live="polite">
  <p class="cookie-text">
    Bu web sitesi, deneyiminizi geliştirmek ve reklam hizmetleri (Google Ads) için çerezler kullanmaktadır.
    <a href="cerez-politikasi.html">Çerez Politikamızı</a> ve
    <a href="gizlilik-politikasi.html">Gizlilik Politikamızı</a> inceleyebilirsiniz.
  </p>
  <div class="cookie-actions">
    <button class="cookie-btn-accept" id="cookieAccept" onclick="setCookieConsent('accepted')">Kabul Et</button>
    <button class="cookie-btn-reject" id="cookieReject" onclick="setCookieConsent('rejected')">Reddet</button>
  </div>
</div>
<script>
(function(){
  function getCookie(n){var v='; '+document.cookie;var p=v.split('; '+n+'=');if(p.length===2)return p.pop().split(';').shift();}
  window.setCookieConsent=function(v){
    var d=new Date();d.setFullYear(d.getFullYear()+1);
    document.cookie='emir_cookie_consent='+v+';expires='+d.toUTCString()+';path=/;SameSite=Lax';
    var b=document.getElementById('cookie-banner');if(b){b.classList.add('hidden');setTimeout(function(){b.remove();},400);}
  };
  var c=getCookie('emir_cookie_consent');
  if(c){var b=document.getElementById('cookie-banner');if(b)b.remove();}
  // AVIF background detection
  (function(){
    var t=new Image();
    t.onload=function(){
      if(t.width<1||t.height<1)return;
      document.querySelectorAll('[data-bg-avif]').forEach(function(el){
        el.style.backgroundImage="url('"+el.getAttribute('data-bg-avif')+"')";
      });
    };
    t.onerror=function(){};
    t.src='data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgmgIN+AAACAACAAAAAA==';
  })();
})();
</script>`;

function processHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);
  let changed = false;

  // 1. <img> → <picture>
  html = html.replace(/<img\s[^>]*>/gi, (imgTag) => {
    const srcMatch = imgTag.match(/src="([^"]+)"/i);
    if (!srcMatch) return imgTag;
    const newTag = wrapWithPicture(imgTag, srcMatch[1]);
    if (newTag !== imgTag) changed = true;
    return newTag;
  });

  // 2. Background-image → data-bg-avif
  const before2 = html;
  html = processBgImages(html);
  if (html !== before2) changed = true;

  // 3. Google Fonts display=swap (zaten varsa atla)
  if (html.includes('fonts.googleapis.com') && !html.includes('display=swap')) {
    html = html.replace(
      /(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)"/g,
      (m, url) => `${url}&display=swap"`
    );
    changed = true;
  }

  // 4. dns-prefetch ekle (yoksa)
  if (html.includes('fonts.googleapis.com') && !html.includes('dns-prefetch')) {
    html = html.replace(
      '<link rel="preconnect" href="https://fonts.googleapis.com" />',
      '<link rel="preconnect" href="https://fonts.googleapis.com" />\n  <link rel="dns-prefetch" href="//fonts.googleapis.com" />\n  <link rel="dns-prefetch" href="//fonts.gstatic.com" />'
    );
    changed = true;
  }

  // 5. theme-color meta (yoksa)
  if (!html.includes('theme-color')) {
    html = html.replace(
      '<meta name="viewport"',
      '<meta name="theme-color" content="#b07d38" />\n  <meta name="viewport"'
    );
    changed = true;
  }

  // 6. favicon (yoksa)
  if (!html.includes('rel="icon"') && !html.includes("rel='icon'")) {
    html = html.replace(
      '<link rel="canonical"',
      '<link rel="icon" href="img/logo.jpg" type="image/jpeg" />\n  <link rel="canonical"'
    );
    changed = true;
  }

  // 7. KVKK cookie banner (yoksa)
  if (!html.includes('cookie-banner') && html.includes('</body>')) {
    html = html.replace('</body>', COOKIE_BANNER_HTML + '\n</body>');
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

console.log(`${htmlFiles.length} HTML dosyası işleniyor...\n`);
htmlFiles.forEach(processHtml);
console.log('\nHTML optimizasyonu tamamlandı.');
