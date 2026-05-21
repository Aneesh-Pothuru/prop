/**
 * Screenshot the running app at multiple viewports + sections.
 * Usage:  node tools/screenshot.mjs <url> <outdir> [tag]
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const url = process.argv[2] || "http://localhost:3000/";
const outDir = process.argv[3] || ".screens";
const tag = process.argv[4] || "landing";

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const sizes = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1280, height: 800 },
  { name: "mobile", width: 390, height: 844 },
];

for (const size of sizes) {
  const ctx = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  console.log(`→ ${url}  @  ${size.name}`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(800);

  const file = `${outDir}/${tag}.${size.name}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(`   wrote ${file}`);
  await ctx.close();
}

await browser.close();
console.log("done.");
