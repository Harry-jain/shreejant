const fs = require('fs');

// We can read public/logo-dark.jpg and write an optimized PNG where background navy (#010B18) maps to pure black #000000.
// When using mix-blend-screen, #000000 has zero contribution (100% transparent)!
// Let's check if canvas or Jimp/sharp is available, or we can use an uncompressed PNG writer.

// Let's test if sharp or canvas is in node_modules
try {
  const sharp = require('sharp');
  console.log('Sharp is available');
} catch (e) {
  console.log('Sharp not found');
}

