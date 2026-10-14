import { no, pageMetadata } from "@/lib/metadata"
import { CommunityStand } from "./content"

export const metadata = pageMetadata({
  title: no.communityStand.title,
  description: no.communityStand.intro,
  path: "/community-stand",
})

export default function Page() {
  return <CommunityStand />
}
