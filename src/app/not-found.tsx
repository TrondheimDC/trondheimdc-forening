import type { Metadata } from "next"
import { no } from "@/lib/metadata"
import { NotFoundContent } from "./not-found-content"

export const metadata: Metadata = {
  title: no.notFound,
  robots: { index: false },
}

export default function NotFound() {
  return <NotFoundContent />
}
