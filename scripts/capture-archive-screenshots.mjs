import { chromium } from "playwright"

const YEARS = [
  { year: 2012, url: "https://2012.trondheimdc.no" },
  { year: 2013, url: "https://2013.trondheimdc.no" },
  { year: 2014, url: "https://2014.trondheimdc.no" },
  { year: 2015, url: "https://2015.trondheimdc.no" },
  { year: 2016, url: "https://2016.trondheimdc.no" },
  { year: 2017, url: "https://2017.trondheimdc.no" },
  { year: 2018, url: "https://2018.trondheimdc.no" },
  { year: 2019, url: "https://2019.trondheimdc.no" },
  { year: 2023, url: "https://2023.trondheimdc.no" },
  { year: 2024, url: "https://2024.trondheimdc.no" },
  { year: 2025, url: "https://2025.trondheimdc.no" },
  // 2026 additionally gets a dark-mode capture (see below) since the
  // Archive component swaps between the two based on the site's theme.
  { year: 2026, url: "https://2026.trondheimdc.no", dark: true },
]

const browser = await chromium.launch()

async function capture(url, dest, colorScheme) {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    colorScheme,
  })
  await page.goto(url, { waitUntil: "load", timeout: 20000 })
  await page.waitForTimeout(1000)
  await page.screenshot({ path: dest, type: "jpeg", quality: 70 })
  await page.close()
}

for (const { year, url, dark } of YEARS) {
  try {
    await capture(url, `public/img/archive/${year}.jpg`, "light")
    console.log(`ok   ${year} -> public/img/archive/${year}.jpg`)
    if (dark) {
      await capture(url, `public/img/archive/${year}-dark.jpg`, "dark")
      console.log(`ok   ${year} (dark) -> public/img/archive/${year}-dark.jpg`)
    }
  } catch (err) {
    console.log(`FAIL ${year} (${url}): ${err.message.split("\n")[0]}`)
  }
}

await browser.close()
