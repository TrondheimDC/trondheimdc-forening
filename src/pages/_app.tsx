import "../styles/index.css"
import type { AppType } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "next-themes"
import { I18nextProvider } from "react-i18next"
import { Footer } from "@/components/Footer"
import { Menu } from "@/components/Menu"
import i18n from "@/i18n"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <I18nextProvider i18n={i18n}>
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
          <link
            rel="apple-touch-icon"
            href="/img/apple-touch-icon-180x180.png"
          />
        </Head>
        <Menu />
        <main className="pt-16">
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeProvider>
    </I18nextProvider>
  )
}

export default MyApp
