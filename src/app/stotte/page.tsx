import { no, pageMetadata } from "@/lib/metadata"
import { Stotte } from "./content"

export const metadata = pageMetadata({
  title: no.stotte.title,
  description: no.stotte.intro,
  path: "/stotte",
})

export default function Page() {
  return <Stotte />
}
