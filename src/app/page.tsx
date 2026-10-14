import { About } from "@/components/About"
import { Archive } from "@/components/Archive"
import { GroupsIndex } from "@/components/GroupsIndex"
import { Hero } from "@/components/Hero"
import { PhotoStrip } from "@/components/PhotoStrip"
import { no, pageMetadata, SITE_URL } from "@/lib/metadata"

export const metadata = pageMetadata({
  description: no.meta.description,
  path: "/",
})

// Lets search engines show the association's details (org.nr, address,
// contact) in their own panel. Same facts as the footer.
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TrondheimDC",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  email: "partner@trondheimdc.no",
  taxID: "936657788",
  foundingDate: "2025-11-10",
  address: {
    "@type": "PostalAddress",
    postOfficeBoxNumber: "1275 Torgarden",
    postalCode: "7462",
    addressLocality: "Trondheim",
    addressCountry: "NO",
  },
  sameAs: ["https://trondheimdc.no"],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON, not user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <Hero />
      <About />
      <GroupsIndex />
      <PhotoStrip />
      <Archive />
    </>
  )
}
