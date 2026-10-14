// Renders public/og-image.jpg (1200x630), the link preview image for Slack, LinkedIn,
// Facebook and so on, with headless Chromium (Playwright), the same way as build-icons.mjs.
// The copy comes from the Norwegian locale (hero.kicker, hero.subtitle), so run this again
// after changing either:
//   node scripts/build-og-image.mjs
// CHROMIUM_PATH overrides the browser binary (default: newest ~/.cache/ms-playwright headless shell).
import { globSync, readFileSync, writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"
import { chromium } from "playwright"

const root = new URL("..", import.meta.url).pathname
const pub = (file) => join(root, "public", file)
const dataUrl = (file, type) =>
  `data:${type};base64,${readFileSync(pub(file)).toString("base64")}`
// The logo is stacked blocks that only just touch; a hairline stroke closes the
// anti-aliasing seams that otherwise show between them at this size.
const logo = readFileSync(pub("img/logos/TDC_white.svg"), "utf8").replaceAll(
  'fill="white"',
  'fill="white" stroke="white" stroke-width="0.8"',
)
const { hero } = JSON.parse(readFileSync(pub("locales/no/common.json"), "utf8"))

function chromiumPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH
  const pattern = join(
    homedir(),
    ".cache/ms-playwright/chromium_headless_shell-*/*/chrome-headless-shell",
  )
  return globSync(pattern).sort().at(-1)
}

const html = `<!doctype html>
<style>
  @font-face { font-family: "Space Grotesk"; src: url(${dataUrl("fonts/space-grotesk-latin-400-normal.woff2", "font/woff2")}); }
  @font-face { font-family: "Space Grotesk"; src: url(${dataUrl("fonts/space-grotesk-latin-ext-400-normal.woff2", "font/woff2")}); unicode-range: U+0100-024F; }
  @font-face { font-family: "IBM Plex Sans"; src: url(${dataUrl("fonts/ibm-plex-sans-latin-400-normal.woff2", "font/woff2")}); }
  html, body { margin: 0; }
  body {
    width: 1200px; height: 630px; box-sizing: border-box; padding: 72px 80px;
    display: flex; flex-direction: column; justify-content: space-between;
    color: #fefefe; font-family: "IBM Plex Sans", sans-serif;
    /* The hero's backdrop, darkened the same way the site does it so the copy reads. */
    background:
      linear-gradient(rgb(15 15 15 / 0.55), rgb(15 15 15 / 0.85)),
      url(${dataUrl("img/hero-background.webp", "image/webp")}) center / cover #0f0f0f;
  }
  img { height: 92px; align-self: flex-start; }
  h1 { margin: 0 0 20px; font: 400 76px/1.05 "Space Grotesk", sans-serif; color: #9bf7a9; }
  p { margin: 0; max-width: 940px; font-size: 32px; line-height: 1.4; }
  footer { font-size: 26px; color: #c4c4c4; }
</style>
<img src="data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}" alt="">
<main>
  <h1>${hero.kicker}</h1>
  <p>${hero.subtitle}</p>
</main>
<footer>forening.trondheimdc.no</footer>`

const browser = await chromium.launch({ executablePath: chromiumPath() })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.setContent(html)
await page.evaluate(() => document.fonts.ready)
writeFileSync(pub("og-image.jpg"), await page.screenshot({ type: "jpeg", quality: 85 }))
await browser.close()
console.log("Wrote public/og-image.jpg")
