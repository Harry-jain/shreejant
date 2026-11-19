const { chromium } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Load logo-dark.jpg and make background transparent
  const darkBase64 = fs.readFileSync("./public/logo-dark.jpg").toString("base64");
  const lightBase64 = fs.readFileSync("./public/logo-light.jpg").toString("base64");

  const darkPngBase64 = await page.evaluate(async (b64) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;

        // The background of logo-dark is dark navy ~ rgb(2..6, 11..18, 24..35)
        // Background color at corner (0,0):
        const bgR = d[0], bgG = d[1], bgB = d[2];

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          // Distance from dark background
          const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
          if (dist < 18) {
            d[i + 3] = 0; // Pure transparent!
          } else if (dist < 32) {
            // Feather edge
            d[i + 3] = Math.round(((dist - 18) / 14) * 255);
          }
        }
        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL("image/png").split(",")[1]);
      };
      img.src = "data:image/jpeg;base64," + b64;
    });
  }, darkBase64);

  fs.writeFileSync("./public/logo-dark.png", Buffer.from(darkPngBase64, "base64"));
  console.log("Created public/logo-dark.png with clean transparent background!");

  const lightPngBase64 = await page.evaluate(async (b64) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;

        // Background of logo-light is warm cream ~ rgb(254..255, 248..251, 230..242)
        const bgR = d[0], bgG = d[1], bgB = d[2];

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i], g = d[i + 1], b = d[i + 2];
          const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
          if (dist < 15) {
            d[i + 3] = 0; // Pure transparent!
          } else if (dist < 28) {
            d[i + 3] = Math.round(((dist - 15) / 13) * 255);
          }
        }
        ctx.putImageData(imgData, 0, 0);
        resolve(canvas.toDataURL("image/png").split(",")[1]);
      };
      img.src = "data:image/jpeg;base64," + b64;
    });
  }, lightBase64);

  fs.writeFileSync("./public/logo-light.png", Buffer.from(lightPngBase64, "base64"));
  console.log("Created public/logo-light.png with clean transparent background!");

  await browser.close();
})();

