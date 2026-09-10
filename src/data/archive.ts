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
// the site, captured with scripts/capture-archive-screenshots.mjs. Re-run
// that script and commit the updated files under public/img/archive/ if
// an old site's content changes.
export const archiveYears: ArchiveYear[] = [
  {
    year: 2012,
    url: "https://2012.trondheimdc.no",
    image: "/img/archive/2012.jpg",
  },
  {
    year: 2013,
    url: "https://2013.trondheimdc.no",
    image: "/img/archive/2013.jpg",
  },
  {
    year: 2014,
    url: "https://2014.trondheimdc.no",
    image: "/img/archive/2014.jpg",
  },
  {
    year: 2015,
    url: "https://2015.trondheimdc.no",
    image: "/img/archive/2015.jpg",
  },
  {
    year: 2016,
    url: "https://2016.trondheimdc.no",
    image: "/img/archive/2016.jpg",
  },
  {
    year: 2017,
    url: "https://2017.trondheimdc.no",
    image: "/img/archive/2017.jpg",
  },
  {
    year: 2018,
    url: "https://2018.trondheimdc.no",
    image: "/img/archive/2018.jpg",
  },
  {
    year: 2019,
    url: "https://2019.trondheimdc.no",
    image: "/img/archive/2019.jpg",
  },
  { year: 2020, url: null, note: "notHeld" },
  {
    year: 2021,
    url: null,
    note: "communityWeek",
    image: "/img/archive/2021.png",
  },
  { year: 2022, url: null, note: "notHeld" },
  {
    year: 2023,
    url: "https://2023.trondheimdc.no",
    image: "/img/archive/2023.jpg",
  },
  {
    year: 2024,
    url: "https://2024.trondheimdc.no",
    image: "/img/archive/2024.jpg",
  },
  {
    year: 2025,
    url: "https://2025.trondheimdc.no",
    image: "/img/archive/2025.jpg",
  },
  {
    year: 2026,
    url: "https://2026.trondheimdc.no",
    image: "/img/archive/2026.jpg",
    darkImage: "/img/archive/2026-dark.jpg",
  },
]
