import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const url = process.argv[2] || "http://localhost:3000/pm";
const outFile = process.argv[3] || ".screens/dark.png";

await mkdir(".screens", { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: "dark",
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.evaluate(() => {
  document.documentElement.dataset.theme = "dark";
  localStorage.setItem("stoa-theme", "dark");
});
await page.waitForTimeout(900);
await page.screenshot({ path: outFile, fullPage: true });
console.log(`wrote ${outFile}`);
await browser.close();
