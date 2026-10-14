"use client"

import { ThemeProvider } from "next-themes"
import { I18nextProvider, useTranslation } from "react-i18next"
import { Footer } from "@/components/Footer"
import { Menu } from "@/components/Menu"
import i18n from "@/i18n"

// Split out so useTranslation() runs inside I18nextProvider's subtree,
// rather than in the component that renders the provider itself.
const Shell = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation("common", { keyPrefix: "menu" })

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      {/* First focusable element on every page, invisible until a keyboard
          user tabs to it, then lets them jump past the header nav straight
          to the page content instead of tabbing through it every time. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {t("skipToContent")}
      </a>
      <Menu />
      <main id="main-content" tabIndex={-1} className="pt-16 outline-none">
        {children}
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>
    <Shell>{children}</Shell>
  </I18nextProvider>
)
