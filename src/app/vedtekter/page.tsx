import { no, pageMetadata } from "@/lib/metadata"
import { Vedtekter } from "./content"

export const metadata = pageMetadata({
  title: no.vedtekter.title,
  description: no.vedtekter.description,
  path: "/vedtekter",
})

export default function Page() {
  return <Vedtekter />
}
