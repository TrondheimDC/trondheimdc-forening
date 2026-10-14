import { useTranslation } from "react-i18next"
import { Seo } from "@/components/Seo"

const NotFound = () => {
  const { t } = useTranslation("common")

  return (
    <>
      <Seo title={t("notFound")} description={t("meta.description")} />
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-32 sm:px-6">
        <h1 className="border-r border-border pr-4 font-display text-3xl">
          404
        </h1>
        <p className="text-lg">{t("notFound")}</p>
      </div>
    </>
  )
}

export default NotFound
