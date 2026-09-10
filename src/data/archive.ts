export type ArchiveYear = {
  year: number
  url: string | null
  note?: string
  image?: string
  darkImage?: string
}

// The full run of TDC editions. 2020 and 2022 are unlinked with no
// conference (pandemic / nothing happened). 2021 had TDC Community Week
// instead of a full conference — there's no surviving site for it, so
// `image` points at a static graphic rather than a screenshot.
//
// For entries with a `url`, `image`/`darkImage` are static screenshots of
// the site, captured with scripts/capture-archive-screenshots.mjs. If an old
// site's content changes, re-run that script, then scripts/optimize-images.mjs
// to regenerate the .webp copies these paths point at, and commit both.
export const archiveYears: ArchiveYear[] = [
  {
    year: 2012,
    url: "https://2012.trondheimdc.no",
    image: "/img/archive/2012.webp",
  },
  {
    year: 2013,
    url: "https://2013.trondheimdc.no",
    image: "/img/archive/2013.webp",
  },
  {
    year: 2014,
    url: "https://2014.trondheimdc.no",
    image: "/img/archive/2014.webp",
  },
  {
    year: 2015,
    url: "https://2015.trondheimdc.no",
    image: "/img/archive/2015.webp",
  },
  {
    year: 2016,
    url: "https://2016.trondheimdc.no",
    image: "/img/archive/2016.webp",
  },
  {
    year: 2017,
    url: "https://2017.trondheimdc.no",
    image: "/img/archive/2017.webp",
  },
  {
    year: 2018,
    url: "https://2018.trondheimdc.no",
    image: "/img/archive/2018.webp",
  },
  {
    year: 2019,
    url: "https://2019.trondheimdc.no",
    image: "/img/archive/2019.webp",
  },
  { year: 2020, url: null, note: "notHeld" },
  {
    year: 2021,
    url: null,
    note: "communityWeek",
    image: "/img/archive/2021.webp",
  },
  { year: 2022, url: null, note: "notHeld" },
  {
    year: 2023,
    url: "https://2023.trondheimdc.no",
    image: "/img/archive/2023.webp",
  },
  {
    year: 2024,
    url: "https://2024.trondheimdc.no",
    image: "/img/archive/2024.webp",
  },
  {
    year: 2025,
    url: "https://2025.trondheimdc.no",
    image: "/img/archive/2025.webp",
  },
  {
    year: 2026,
    url: "https://2026.trondheimdc.no",
    image: "/img/archive/2026.webp",
    darkImage: "/img/archive/2026-dark.webp",
  },
]
