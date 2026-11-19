// scripts/smoke-demos.mjs
// Tests all 8 demo URLs on the running Next.js production server.
// Fails unless each returns 200 and contains "Sample demo".

const DEMO_IDS = [
  'salon',
  'jewellery',
  'clinic',
  'restaurant',
  'gym',
  'shop',
  'classes',
  'general',
];

const PORT = process.env.PORT || process.argv[2] || '3000';
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function runSmokeTests() {
  console.log(`Starting smoke tests against ${BASE_URL}...`);
  let failed = 0;

  for (const id of DEMO_IDS) {
    const directUrl = `${BASE_URL}/demos/${id}`;
    const embedUrl = `${BASE_URL}/demos/${id}?embed=1&tour=1`;

    for (const url of [directUrl, embedUrl]) {
      try {
        const res = await fetch(url, { headers: { 'User-Agent': 'SmokeTest/1.0' } });
        if (res.status !== 200) {
          console.error(`[FAIL] ${url} returned HTTP ${res.status}`);
          failed++;
          continue;
        }
        const text = await res.text();
        if (!text.includes('Sample demo')) {
          console.error(`[FAIL] ${url} did not contain required text "Sample demo"`);
          failed++;
          continue;
        }
        console.log(`[PASS] ${url} (HTTP 200, "Sample demo" verified)`);
      } catch (err) {
        console.error(`[ERROR] ${url} fetch failed:`, err.message);
        failed++;
      }
    }
  }

  if (failed > 0) {
    console.error(`Smoke test failed: ${failed} requests failed.`);
    process.exit(1);
  }

  console.log(`All ${DEMO_IDS.length} demo URLs (direct and embedded) passed smoke testing!`);
  process.exit(0);
}

runSmokeTests();
