const fs=require('fs');
const path=require('path');

const existing=[
  {f:'WhatsApp Image 2026-06-26 at 19.10.00 (2).jpeg',alt:'Tente projesi panoramik'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.00 (3).jpeg',alt:'Tente projesi panoramik 2'},
  {f:'otomatik-pergula.jpg',alt:'Otomatik Pergola'},
  {f:'karpuz tente.png',alt:'Karpuz Tente'},
  {f:'oval-pergula.png',alt:'Oval Pergola'},
  {f:'t-tente.png',alt:'T-Modul Tente'},
  {f:'klasik-tente.png',alt:'Klasik Tente'},
  {f:'kıs-bahcesi.png',alt:'Kis Bahcesi'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.05 (3).jpeg',alt:'Pergola projesi'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.06 (2).jpeg',alt:'Bioklimatik pergola'},
  {f:'WhatsApp Image 2026-06-26 at 19.09.51.jpeg',alt:'Tente projesi 1'},
  {f:'WhatsApp Image 2026-06-26 at 19.09.51 (1).jpeg',alt:'Tente projesi 2'},
  {f:'WhatsApp Image 2026-06-26 at 19.09.57.jpeg',alt:'Tente projesi 3'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.00 (1).jpeg',alt:'Pergola projesi 1'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.01 (1).jpeg',alt:'Pergola projesi 2'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.02 (1).jpeg',alt:'Perde projesi 1'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.07 (1).jpeg',alt:'Tente projesi 4'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.08 (1).jpeg',alt:'Perde projesi 2'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.40 (1).jpeg',alt:'Branda projesi'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.54.jpeg',alt:'Proje 12'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.56.jpeg',alt:'Proje 13'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.56 (1).jpeg',alt:'Proje 14'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.56 (2).jpeg',alt:'Proje 15'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.13.jpeg',alt:'Proje 16'},
];

const newItems=[
  {f:'WhatsApp Image 2026-06-26 at 19.09.51 (2).jpeg',alt:'Tente projesi 5'},
  {f:'WhatsApp Image 2026-06-26 at 19.09.51 (3).jpeg',alt:'Tente projesi 6'},
  {f:'WhatsApp Image 2026-06-26 at 19.09.51 (4).jpeg',alt:'Tente projesi 7'},
  {f:'WhatsApp Image 2026-06-26 at 19.09.57 (1).jpeg',alt:'Branda projesi 2'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.00 (4).jpeg',alt:'Pergola projesi 3'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.00 (6).jpeg',alt:'Pergola projesi 4'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.00 (7).jpeg',alt:'Pergola projesi 5'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.00.jpeg',alt:'Pergola projesi 6'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.01 (2).jpeg',alt:'Pergola projesi 7'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.01 (3).jpeg',alt:'Pergola projesi 8'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.01 (4).jpeg',alt:'Pergola projesi 9'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.01.jpeg',alt:'Pergola projesi 10'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.02 (2).jpeg',alt:'Perde projesi 3'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.02 (3).jpeg',alt:'Perde projesi 4'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.02.jpeg',alt:'Perde projesi 5'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.04 (1).jpeg',alt:'Tente kurulum 1'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.04 (2).jpeg',alt:'Tente kurulum 2'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.04 (3).jpeg',alt:'Tente kurulum 3'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.04 (4).jpeg',alt:'Tente kurulum 4'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.04 (5).jpeg',alt:'Tente kurulum 5'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.04 (6).jpeg',alt:'Tente kurulum 6'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.04 (7).jpeg',alt:'Tente kurulum 7'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.04 (8).jpeg',alt:'Tente kurulum 8'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.04 (9).jpeg',alt:'Tente kurulum 9'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.04.jpeg',alt:'Tente kurulum 10'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.05 (1).jpeg',alt:'Pergola uygulama 1'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.05 (2).jpeg',alt:'Pergola uygulama 2'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.05 (4).jpeg',alt:'Pergola uygulama 3'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.05 (5).jpeg',alt:'Pergola uygulama 4'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.05 (6).jpeg',alt:'Pergola uygulama 5'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.05 (7).jpeg',alt:'Pergola uygulama 6'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.05 (8).jpeg',alt:'Pergola uygulama 7'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.05 (9).jpeg',alt:'Pergola uygulama 8'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.05.jpeg',alt:'Pergola uygulama 9'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.06 (1).jpeg',alt:'Tente sistemi 1'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.06 (3).jpeg',alt:'Tente sistemi 2'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.06 (4).jpeg',alt:'Tente sistemi 3'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.06 (5).jpeg',alt:'Tente sistemi 4'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.06.jpeg',alt:'Tente sistemi 5'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.07 (2).jpeg',alt:'Pergola montaj 1'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.07 (3).jpeg',alt:'Pergola montaj 2'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.07 (4).jpeg',alt:'Pergola montaj 3'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.07 (5).jpeg',alt:'Pergola montaj 4'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.07.jpeg',alt:'Pergola montaj 5'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.08 (2).jpeg',alt:'Branda uygulama 1'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.08 (3).jpeg',alt:'Branda uygulama 2'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.08 (4).jpeg',alt:'Branda uygulama 3'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.08 (5).jpeg',alt:'Branda uygulama 4'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.08 (6).jpeg',alt:'Branda uygulama 5'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.08 (7).jpeg',alt:'Branda uygulama 6'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.08 (8).jpeg',alt:'Branda uygulama 7'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.08 (9).jpeg',alt:'Branda uygulama 8'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.08.jpeg',alt:'Branda uygulama 9'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.09 (1).jpeg',alt:'Proje fotoğrafı 1'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.09 (2).jpeg',alt:'Proje fotoğrafı 2'},
  {f:'WhatsApp Image 2026-06-26 at 19.10.09.jpeg',alt:'Proje fotoğrafı 3'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.40 (2).jpeg',alt:'Branda projesi 3'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.40 (3).jpeg',alt:'Branda projesi 4'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.40 (4).jpeg',alt:'Branda projesi 5'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.40 (5).jpeg',alt:'Branda projesi 6'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.40.jpeg',alt:'Branda projesi 7'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.41 (1).jpeg',alt:'Branda projesi 8'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.42 (1).jpeg',alt:'Perde projesi 6'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.42.jpeg',alt:'Perde projesi 7'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.48.jpeg',alt:'Proje fotoğrafı 4'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.54 (1).jpeg',alt:'Proje fotoğrafı 5'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.55 (1).jpeg',alt:'Proje fotoğrafı 6'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.55.jpeg',alt:'Proje fotoğrafı 7'},
  {f:'WhatsApp Image 2026-06-26 at 19.14.56 (3).jpeg',alt:'Proje fotoğrafı 8'},
  {f:'otomatik-pergola.jpeg',alt:'Otomatik Pergola projesi'},
  {f:'seffaf-tente.jpg',alt:'Şeffaf Tente projesi'},
];

const allItems=[...existing,...newItems];

const svgIcon='<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';

function getAvifSrc(f){
  return f.replace(/\.(jpeg|jpg|png)$/,'.avif');
}

function buildItem(item,idx){
  const {f,alt}=item;
  const avifSrc='img/'+getAvifSrc(f);
  const imgSrc='img/'+f;
  return `      <div class="gallery-item" onclick="lb(${idx})"><picture><source srcset="${avifSrc}" type="image/avif"><img src="${imgSrc}" alt="${alt}" loading="lazy" /></picture><div class="gallery-overlay">${svgIcon}</div></div>`;
}

const gridHtml=allItems.map((item,idx)=>buildItem(item,idx)).join('\n');

const imgsArr=allItems.map(item=>`"img/${item.f}"`).join(',');
const imgsJs='const imgs=['+imgsArr+'];';

const galeriPath=path.join(__dirname,'..','galeri.html');
let html=fs.readFileSync(galeriPath,'utf8');

// gallery-grid içeriğini değiştir
html=html.replace(
  /(<div class="gallery-grid" id="galleryGrid">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/,
  '$1\n'+gridHtml+'\n\n    </div>\n  </div>\n</section>'
);

// imgs[] dizisini güncelle
html=html.replace(
  /const imgs=\[[\s\S]*?\];/,
  imgsJs
);

fs.writeFileSync(galeriPath,html,'utf8');
console.log('Galeri güncellendi. Toplam öğe:',allItems.length,'('+existing.length+' mevcut + '+newItems.length+' yeni)');
