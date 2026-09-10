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
    name: "Bart.js",
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
]
