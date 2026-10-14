export type Group = {
  slug: string
  name: string
  url: string
  logo: string | null
  blurb: string
}

// Trondheim tech/design meetup groups. This is a general index, not a list
// of groups TDC has funded; see /stotte for the funding criteria.
// Blurbs are placeholder paraphrases of each group's own meetup.com
// description; see TODO.md before treating them as final copy.
// Order here does not matter; add new groups wherever.
const unsorted: Group[] = [
  {
    slug: "javabin-trondheim",
    name: "javaBin Trondheim",
    url: "https://www.meetup.com/javabin-trondheim/",
    logo: "/img/groups/javabin-trondheim.webp",
    blurb:
      "Brukergruppe og sosialt samlingspunkt for alle som er nysgjerrige på teknologi – nybegynnere, studenter og erfarne utviklere. Gratis og åpne arrangementer.",
  },
  {
    slug: "bartjs",
    name: "BartJS",
    url: "https://www.meetup.com/bartjs/",
    logo: "/img/groups/bartjs.webp",
    blurb:
      "Trondheims meetup om alt av JavaScript og TypeScript – fra servere og IoT til UI-utvikling.",
  },
  {
    slug: "nnug-trondheim",
    name: "NNUG Trondheim",
    url: "https://www.meetup.com/nnug-trondheim/",
    logo: "/img/groups/nnug-trondheim.webp",
    blurb:
      "Norwegian .NET User Group – uavhengig brukergruppe for utviklere og arkitekter som jobber med Microsofts .NET-teknologier.",
  },
  {
    slug: "dotfemmes",
    name: "dotFEMMES",
    url: "https://www.meetup.com/dotfemmes-developers-of-trondheim-femmes/",
    logo: null,
    blurb:
      "Gruppe for kvinner og kjønnsminoriteter i Trondheim som brenner for programmering og programvareutvikling.",
  },
  {
    slug: "ixda-trondheim",
    name: "IxDA Trondheim",
    url: "https://www.meetup.com/ixdatrondheim/",
    logo: "/img/groups/ixda-trondheim.webp",
    blurb: "Trondheims største og mest aktive miljø for interaksjonsdesign.",
  },
  {
    slug: "rust-trondheim",
    name: "Rust Trondheim",
    url: "https://www.meetup.com/rust-trondheim/",
    logo: "/img/groups/rust-trondheim.webp",
    blurb:
      "For alle som er nysgjerrige på programmeringsspråket Rust. Månedlige samlinger der de koder og prater Rust. Nybegynnere er like velkomne som alle andre.",
  },
  {
    slug: "spillmakerlauget-midt",
    name: "Spillmakerlauget Midt",
    url: "https://www.meetup.com/sml-midt/",
    logo: "/img/groups/spillmakerlauget-midt.webp",
    blurb:
      "Midt-Norge-avdelingen av Spillmakerlauget, en gruppe for spillutviklere drevet av spillutviklere.",
  },
]

// Sorted once here rather than at each call site, so the index renders
// alphabetically and a group added above lands in the right place without
// anyone hunting for the right line. localeCompare rather than `<`, which
// compares code points and would drop dotFEMMES and javaBin below every
// name that starts with a capital.
export const groups: Group[] = [...unsorted].sort((a, b) =>
  a.name.localeCompare(b.name, "no"),
)
