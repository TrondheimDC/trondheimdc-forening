import { useTranslation } from "react-i18next"
import { About } from "@/components/About"
import { Archive } from "@/components/Archive"
import { GroupsIndex } from "@/components/GroupsIndex"
import { Hero } from "@/components/Hero"
import { PhotoStrip } from "@/components/PhotoStrip"
import { Seo, SITE_URL } from "@/components/Seo"

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

const Home = () => {
  const { t } = useTranslation("common", { keyPrefix: "meta" })

  return (
    <>
      <Seo description={t("description")} path="/" />
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

export default Home
