export type Group = {
  slug: string
  name: string
  url: string
  logo: string | null
  blurb: string
}

// Trondheim tech/design meetup groups. This is a general index, not a list
// of groups TDC has funded — see /stotte for the funding criteria.
// Blurbs are placeholder paraphrases of each group's own meetup.com
// description; see TODO.md before treating them as final copy.
export const groups: Group[] = [
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

// Looked up by slug rather than by index: the hero picks a handful of these
// logos out for its floating tiles, and doing that positionally meant adding
// or reordering a group here silently swapped which logos the hero showed.
export const groupBySlug = (slug: string): Group | undefined =>
  groups.find((group) => group.slug === slug)
