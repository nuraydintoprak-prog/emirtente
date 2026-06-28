/**
 * Görselleri servis boyutuna uygun thumbnail'lara dönüştür
 * - Product cards: 800px max width (354px gösterilen × 2.25x DPR)
 * - Hero: 1920px max width
 * - About / Hakkımızda: 900px max width
 * - Temiz dosya adları (boşuk/Türkçe karakter yok)
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'img');
const thumbDir = path.join(imgDir, 'thumb');
if (!fs.existsSync(thumbDir)) fs.mkdirSync(thumbDir);

const items = [
  // ── Ürün kartları (prod-showcase) ─────────────────────
  { src: 'bioklimatik sistemleri.png',            out: 'bioklimatik-sistemleri', w: 800 },
  { src: 'Rolling Roof Sistemleri.png',           out: 'rolling-roof',           w: 800 },
  { src: 'pergola sistemleri.png',                out: 'pergola-sistemleri',     w: 800 },
  { src: 'klasik-tente.png',                      out: 'klasik-tente',           w: 800 },
  { src: 'mafsalli-tente1.png',                   out: 'mafsalli-tente',         w: 800 },
  { src: 'vin-tente.png',                         out: 'vin-tente',              w: 800 },
  { src: 't-tente.png',                           out: 't-tente',                w: 800 },
  { src: 'Şeffaf Store.png',                      out: 'seffaf-store',           w: 800 },
  { src: 'körüklü tente.png',                     out: 'koruklu-tente',          w: 800 },
  { src: 'giyotin cam.png',                       out: 'giyotin-cam',            w: 800 },
  { src: 'katlanır cam.png',                      out: 'katlanir-cam',           w: 800 },
  { src: 'karpuz tente.png',                      out: 'karpuz-tente',           w: 800 },
  { src: 'havuz tente.png',                       out: 'havuz-tente',            w: 800 },
  { src: 'kasetli tente.png',                     out: 'kasetli-tente',          w: 800 },
  { src: 'kıs-bahcesi.png',                       out: 'kis-bahcesi',            w: 800 },
  { src: 'oval-pergula.png',                      out: 'oval-pergola',           w: 800 },
  { src: 'oval-tente.png',                        out: 'oval-tente',             w: 800 },
  { src: 'otomatik-pergola.jpeg',                 out: 'otomatik-pergola',       w: 800 },
  { src: 'otomatik-pergula.jpg',                  out: 'otomatik-pergula',       w: 800 },
  { src: 'dekor foto.png',                        out: 'dekor',                  w: 800 },

  // ── Sürgülü Cam (WhatsApp JPEG) ───────────────────────
  { src: 'WhatsApp Image 2026-06-26 at 19.10.01.jpeg', out: 'surgulu-cam',      w: 800 },

  // ── Preview/Bizden görselleri ─────────────────────────
  { src: 'WhatsApp Image 2026-06-26 at 19.09.57.jpeg', out: 'proje-1',          w: 900 },
  { src: 'WhatsApp Image 2026-06-26 at 19.14.54.jpeg', out: 'proje-2',          w: 900 },
  { src: 'WhatsApp Image 2026-06-26 at 19.10.00 (1).jpeg', out: 'proje-3',      w: 900 },

  // ── Hero background ───────────────────────────────────
  { src: 'WhatsApp Image 2026-06-26 at 19.10.00 (2).jpeg', out: 'hero',         w: 1920 },

  // ── Hakkımızda ────────────────────────────────────────
  { src: 'hakkimizda.png',                        out: 'hakkimizda',             w: 900 },

  // ── Logo ──────────────────────────────────────────────
  { src: 'logo.jpg',                              out: 'logo',                   w: 400 },
];

async function processItem(item) {
  const srcPath = path.join(imgDir, item.src);
  if (!fs.existsSync(srcPath)) {
    console.log(`  ⚠ Bulunamadı: ${item.src}`);
    return;
  }

  const jpgOut  = path.join(thumbDir, `${item.out}.jpg`);
  const avifOut = path.join(thumbDir, `${item.out}.avif`);

  const resized = sharp(srcPath).resize({ width: item.w, withoutEnlargement: true });

  await resized.clone().jpeg({ quality: 82, progressive: true }).toFile(jpgOut);
  await resized.clone().avif({ quality: 68, effort: 6 }).toFile(avifOut);

  const orig = fs.statSync(srcPath).size;
  const avif = fs.statSync(avifOut).size;
  const pct  = Math.round((1 - avif / orig) * 100);
  console.log(`  ✓ ${item.out}: ${Math.round(orig/1024)}KB → ${Math.round(avif/1024)}KB AVIF (-%${pct})`);
}

(async () => {
  console.log(`${items.length} görsel thumbnail oluşturuluyor...\n`);
  for (const item of items) await processItem(item);
  console.log('\nThumbnail oluşturma tamamlandı.');
})();
