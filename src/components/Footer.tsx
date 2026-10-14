"use client"

import Link from "next/link"
import { useTranslation } from "react-i18next"
import { TdcWordmark } from "./TdcWordmark"
import { ThemeToggle } from "./ThemeToggle"

const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/trondheimdc/",
    path: "M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/TDConf",
    path: "M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.28-.12-2.43-.12-2.4 0-4.04 1.47-4.04 4.16v2.32H7.5V13h2.73v8z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@trondheimdc/videos",
    path: "M23 7.5a3 3 0 0 0-2.1-2.12C19.05 4.9 12 4.9 12 4.9s-7.05 0-8.9.48A3 3 0 0 0 1 7.5C.5 9.36.5 12 .5 12s0 2.64.5 4.5a3 3 0 0 0 2.1 2.12c1.85.48 8.9.48 8.9.48s7.05 0 8.9-.48A3 3 0 0 0 23 16.5c.5-1.86.5-4.5.5-4.5s0-2.64-.5-4.5zM9.75 15.5v-7l6 3.5z",
  },
]

export const Footer = () => {
  const { t } = useTranslation("common", { keyPrefix: "footer" })

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div className="space-y-1 text-sm text-muted-foreground">
            <TdcWordmark className="mb-3 [--wordmark-size:2rem]" />
            <p className="font-display text-base text-foreground">
              TrondheimDC
            </p>
            <p>{t("address")}</p>
            <p>{t("orgNr")}: 936657788</p>
            <p>
              <a
                href={`mailto:${t("contact")}`}
                className="hover:text-foreground"
              >
                {t("contact")}
              </a>
            </p>
            <p>
              <a
                href="https://utlegg.trondheimdc.no"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                {t("utlegg")}
              </a>
            </p>
          </div>

          <ul className="flex h-fit items-center gap-3">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <p>© {new Date().getFullYear()} TrondheimDC</p>
          </div>
          <Link href="/vedtekter" className="hover:text-foreground">
            Vedtekter
          </Link>
        </div>
      </div>
    </footer>
  )
}
