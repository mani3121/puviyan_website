import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve(process.cwd(), 'public/images');
const VALID_INPUT_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']); // source formats we will convert from (include webp so we can make AVIF)

/**
 * Generate optimized variants (.avif, .webp) for each source image.
 * Skips generation if the variant already exists and is newer than the source.
 */
async function main() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`[optimize-images] Directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(IMAGES_DIR, { withFileTypes: true });
  let processed = 0;
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const srcPath = path.join(IMAGES_DIR, entry.name);
    const ext = path.extname(entry.name).toLowerCase();
    if (!VALID_INPUT_EXT.has(ext)) continue; // ignore gifs/webp/ico, etc.

    const base = path.join(IMAGES_DIR, path.basename(entry.name, ext));
    const avifPath = `${base}.avif`;
    const webpPath = `${base}.webp`;

    const srcStat = fs.statSync(srcPath);

    // Only (re)generate if missing or older than source
    if (shouldGenerate(avifPath, srcStat)) {
      await sharp(srcPath)
        .avif({ quality: 60 })
        .toFile(avifPath);
      console.log(`✔ AVIF generated: ${path.basename(avifPath)}`);
    }

    if (shouldGenerate(webpPath, srcStat)) {
      await sharp(srcPath)
        .webp({ quality: 70 })
        .toFile(webpPath);
      console.log(`✔ WebP generated: ${path.basename(webpPath)}`);
    }

    processed++;
  }

  console.log(`\n[optimize-images] Completed. Processed ${processed} source images in ${IMAGES_DIR}`);
}

function shouldGenerate(outPath, srcStat) {
  if (!fs.existsSync(outPath)) return true;
  try {
    const outStat = fs.statSync(outPath);
    return outStat.mtimeMs < srcStat.mtimeMs; // regenerate if older
  } catch {
    return true;
  }
}

main().catch((err) => {
  console.error('[optimize-images] Error:', err);
  process.exit(1);
});
