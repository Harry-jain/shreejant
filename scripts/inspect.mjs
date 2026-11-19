// scripts/inspect.mjs
import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

// Parse arguments
const args = process.argv.slice(2);
let port = '3000';
let outDir = '.taste-skill/before';
let urls = ['/', '/demos/salon'];
let widths = [1440, 768, 390];
let shouldStartServer = false;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--port' && args[i + 1]) port = args[++i];
  else if (args[i] === '--out' && args[i + 1]) outDir = args[++i];
  else if (args[i] === '--urls' && args[i + 1]) urls = args[++i].split(',');
  else if (args[i] === '--widths' && args[i + 1]) widths = args[++i].split(',').map(Number);
  else if (args[i] === '--start') shouldStartServer = true;
  else if (!args[i].startsWith('--')) {
    if (!isNaN(Number(args[i]))) port = args[i];
    else outDir = args[i];
  }
}

fs.mkdirSync(outDir, { recursive: true });

const heightMap = {
  1440: 900,
  1024: 768,
  768: 1024,
  390: 844,
  360: 800,
};

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status === 200) return true;
    } catch {
      // wait and retry
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

async function inspect() {
  let serverProcess = null;

  if (shouldStartServer) {
    console.log(`Starting next server on port ${port}...`);
    serverProcess = spawn(process.execPath, ['./node_modules/next/dist/bin/next', 'start', '-p', port], {
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: false,
    });

    serverProcess.stdout.on('data', (d) => {
      const msg = d.toString();
      if (msg.includes('Ready') || msg.includes('Starting')) console.log('[server]', msg.trim());
    });
    serverProcess.stderr.on('data', (d) => {
      console.error('[server err]', d.toString().trim());
    });

    const ready = await waitForServer(`http://127.0.0.1:${port}/`, 25000);
    if (!ready) {
      console.error('Server failed to start within timeout');
      if (serverProcess) serverProcess.kill();
      process.exit(1);
    }
  }

  console.log(`Starting inspection on port ${port}, output to ${outDir}...`);
  const browser = await chromium.launch({ headless: true });
  let hasFailures = false;
  const reports = [];

  try {
    for (const route of urls) {
      const routeSlug = route === '/' ? 'home' : route.replace(/[^a-zA-Z0-9_-]/g, '_').replace(/^_+/, '');

      for (const w of widths) {
        const h = heightMap[w] || 900;
        const context = await browser.newContext({
          viewport: { width: w, height: h },
          deviceScaleFactor: 1,
        });
        const page = await context.newPage();

        const consoleErrors = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        page.on('pageerror', (err) => {
          consoleErrors.push(err.message);
        });

        const fullUrl = `http://127.0.0.1:${port}${route}`;
        try {
          const response = await page.goto(fullUrl, { waitUntil: 'load', timeout: 30000 });
          const status = response ? response.status() : 0;
          await page.waitForTimeout(600);

          // Check horizontal overflow
          const overflow = await page.evaluate(() => {
            const docEl = document.documentElement;
            return {
              scrollWidth: docEl.scrollWidth,
              clientWidth: docEl.clientWidth,
              hasOverflow: docEl.scrollWidth > docEl.clientWidth + 1,
            };
          });

          const screenshotFileName = `${routeSlug}-${w}.png`;
          const screenshotPath = path.join(outDir, screenshotFileName);
          await page.screenshot({ path: screenshotPath, fullPage: false });

          // If home page, also scroll down to #demos and capture the cinematic preview
          if (route === '/') {
            const demoSection = page.locator('#demos');
            if (await demoSection.count() > 0) {
              await demoSection.scrollIntoViewIfNeeded();
              await page.waitForTimeout(1600);
              const demoScreenshotName = `home-demos-${w}.png`;
              await page.screenshot({
                path: path.join(outDir, demoScreenshotName),
                fullPage: false,
              });
            }
          }

          // If theatre view, wait for 1.2s title card to transition into sample
          if (route.startsWith('/demos/')) {
            await page.waitForTimeout(1600);
            const theatreScreenshotName = `${routeSlug}-active-${w}.png`;
            await page.screenshot({
              path: path.join(outDir, theatreScreenshotName),
              fullPage: false,
            });
          }

          const pass = status === 200 && !overflow.hasOverflow && consoleErrors.length === 0;
          if (!pass) hasFailures = true;

          reports.push({
            route,
            width: w,
            status,
            hasOverflow: overflow.hasOverflow,
            scrollWidth: overflow.scrollWidth,
            clientWidth: overflow.clientWidth,
            consoleErrors,
            screenshotPath,
          });

          console.log(
            `[${pass ? 'PASS' : 'FAIL'}] ${route} @ ${w}px -> HTTP ${status}, overflow: ${overflow.hasOverflow}, errors: ${consoleErrors.length}, saved ${screenshotFileName}`
          );
        } catch (err) {
          hasFailures = true;
          console.error(`[ERROR] Failed loading ${fullUrl} at ${w}px:`, err.message);
          reports.push({
            route,
            width: w,
            error: err.message,
          });
        } finally {
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
    if (serverProcess) {
      console.log('Shutting down local server...');
      serverProcess.kill('SIGTERM');
    }
  }

  const reportPath = path.join(outDir, 'inspect-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(reports, null, 2), 'utf-8');
  console.log(`Inspection complete. Report saved to ${reportPath}`);

  return !hasFailures;
}

inspect().then((ok) => {
  process.exit(ok ? 0 : 1);
});
