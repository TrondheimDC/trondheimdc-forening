import "../styles/index.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "next-themes"
import { I18nextProvider, useTranslation } from "react-i18next"
import { Footer } from "@/components/Footer"
import { Menu } from "@/components/Menu"
import i18n from "@/i18n"

// Split out so useTranslation() runs inside I18nextProvider's subtree,
// rather than in the component that renders the provider itself.
const AppShell = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation("common", { keyPrefix: "menu" })

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/img/apple-touch-icon-180x180.png" />
      </Head>
      {/* First focusable element on every page — invisible until a keyboard
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
        <Component {...pageProps} />
      </main>
      <Footer />
    </ThemeProvider>
  )
}

const MyApp = (props: AppProps) => (
  <I18nextProvider i18n={i18n}>
    <AppShell {...props} />
  </I18nextProvider>
)

export default MyApp
