const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const TARGET_WIDTH = 800;
const TARGET_HEIGHT = 450;
const VALID_EXT = /\.(jpg|jpeg|png|webp)$/i;

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const dir = path.dirname(filePath);

  const cleanBase = baseName.replace(/[_-]?normalized$/i, "");

  try {
    await sharp(filePath)
      .resize({
        width: TARGET_WIDTH,
        height: TARGET_HEIGHT,
        fit: "cover",
        position: "centre"
      })
      .toFile(filePath);

    console.log(`  Normalized: ${path.basename(filePath)} (${TARGET_WIDTH}x${TARGET_HEIGHT})`);
  } catch (err) {
    console.error(`  Error processing ${path.basename(filePath)}:`, err.message);
  }
}

async function processFolder(folderPath) {
  const files = fs.readdirSync(folderPath);
  const images = files.filter(f => VALID_EXT.test(f));

  for (const file of images) {
    if (/(-normalized)\./i.test(file)) continue;
    await processImage(path.join(folderPath, file));
  }
}

async function main() {
  const entries = fs.readdirSync(PUBLIC_DIR, { withFileTypes: true });
  const folders = entries
    .filter(e => e.isDirectory() && !e.name.startsWith(".") && e.name !== "node_modules");

  console.log(`Found ${folders.length} menu folders\n`);

  for (const folder of folders) {
    const folderPath = path.join(PUBLIC_DIR, folder.name);
    const files = fs.readdirSync(folderPath).filter(f => VALID_EXT.test(f));
    if (files.length === 0) continue;

    console.log(`Processing ${folder.name} (${files.length} images)`);
    await processFolder(folderPath);
  }

  console.log("\nDone! All images normalized to 16:9 (800x450).");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});

