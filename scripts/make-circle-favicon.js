const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createCircleFavicon() {
  const inputPath = 'C:/Users/N ganesh/.gemini/antigravity/brain/d92d3e5e-52ed-44b3-b880-08c85c0f5b98/.user_uploaded/media_1788261199644.png';
  
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width;
  const height = metadata.height;
  const radius = Math.min(width, height) / 2;

  // Circular SVG mask
  const circleSvg = Buffer.from(
    `<svg width="${width}" height="${height}">
      <circle cx="${width / 2}" cy="${height / 2}" r="${radius}" fill="#fff"/>
    </svg>`
  );

  const circularImageBuffer = await sharp(inputPath)
    .composite([
      {
        input: circleSvg,
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  const publicFaviconPath = path.join(__dirname, '../public/favicon.png');
  const appIconPath = path.join(__dirname, '../app/icon.png');
  const appFaviconIcoPath = path.join(__dirname, '../app/favicon.ico');
  const publicIconPath = path.join(__dirname, '../public/icon.png');

  // Save 512x512 PNG
  await sharp(circularImageBuffer)
    .resize(512, 512)
    .png()
    .toFile(publicFaviconPath);

  await sharp(circularImageBuffer)
    .resize(512, 512)
    .png()
    .toFile(appIconPath);

  await sharp(circularImageBuffer)
    .resize(512, 512)
    .png()
    .toFile(publicIconPath);

  // Save 32x32 for favicon.ico
  await sharp(circularImageBuffer)
    .resize(32, 32)
    .png()
    .toFile(appFaviconIcoPath);

  console.log('Successfully generated crisp circle-shaped favicons!');
}

createCircleFavicon().catch(console.error);
