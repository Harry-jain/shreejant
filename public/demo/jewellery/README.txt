RATNAVALI CONCEPT DEMO — JEWELLERY IMAGE ASSETS
==================================================

The jewellery demo works out of the box without external photos by using high-fidelity built-in SVG artwork.

To replace the SVG artwork with real photography:
1. Place your image files in this directory (`public/demo/jewellery/`) using these exact filenames:
   - `hero.webp` (4:5 ratio, used in the hero arch frame)
   - `necklace.webp` (4:5 ratio, Imperial Bridal necklace)
   - `solitaire.webp` (4:5 ratio, Rare Solitaire diamond ring)
   - `kada.webp` (4:5 ratio, Royal Jadau heritage bangle)

2. Technical Specifications:
   - Aspect ratio: 4:5 (recommended 1200x1500 px)
   - Format: WebP, optimized to under 150 KB per image
   - Backdrop: Plain dark-violet or clean neutral studio background
   - Composition: Clean product-focused jewellery shots; no people, no logos, no watermarks

3. Licensing:
   - Only use photos you own, commissioned, or whose license explicitly allows commercial use. Keep a record of each image license.

4. Configuration:
   - Update `src/data/demo.ts`: set the corresponding `image` fields from `null` to:
     `{ src: '/demo/jewellery/necklace.webp', width: 1200, height: 1500, alt: 'Imperial Bridal polki necklace' }`
