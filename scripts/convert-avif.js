const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'img');
const extensions = ['.jpg', '.jpeg', '.png'];

async function convertToAvif(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const avifPath = filePath.replace(/\.(jpg|jpeg|png)$/i, '.avif');
  if (fs.existsSync(avifPath)) return { skipped: true, file: path.basename(filePath) };
  try {
    await sharp(filePath)
      .avif({ quality: 72, effort: 6 })
      .toFile(avifPath);
    const origSize = fs.statSync(filePath).size;
    const avifSize = fs.statSync(avifPath).size;
    const saved = Math.round((1 - avifSize / origSize) * 100);
    return { ok: true, file: path.basename(filePath), saved: `${saved}%` };
  } catch (e) {
    return { err: true, file: path.basename(filePath), msg: e.message };
  }
}

async function main() {
  const files = fs.readdirSync(imgDir)
    .filter(f => extensions.includes(path.extname(f).toLowerCase()))
    .filter(f => f !== 'logo.jpg' && f !== 'logo (2).jpg'); // keep logo as-is

  console.log(`Converting ${files.length} images to AVIF...`);
  let ok = 0, skipped = 0, errors = 0;

  for (const file of files) {
    const result = await convertToAvif(path.join(imgDir, file));
    if (result.ok) { console.log(`  ✓ ${result.file} → saved ${result.saved}`); ok++; }
    else if (result.skipped) { skipped++; }
    else { console.error(`  ✗ ${result.file}: ${result.msg}`); errors++; }
  }

  console.log(`\nDone: ${ok} converted, ${skipped} skipped (existing), ${errors} errors`);
}

main();
