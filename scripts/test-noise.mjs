import fs from 'node:fs';

// Generate a valid 128x128 grayscale noise PNG buffer without external dependencies
// Minimal uncompressed PNG generator
function createNoisePngBase64(size = 128) {
  // Let's generate a SVG with high contrast monochrome noise
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const uri = createNoisePngBase64(128);
console.log('URI generated:', uri.substring(0, 80));
