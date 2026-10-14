// The link preview image (1200x630) for Slack, LinkedIn, Facebook and so on.
// Rendered by Satori, which supports a subset of CSS: every element with more
// than one child needs display: flex. https://github.com/vercel/satori#css
//
// Edit freely, then preview with `pnpm og` (writes public/og-image.jpg).
// `pnpm build` renders it too, so a deploy always ships the current version.

export const OG_SIZE = { width: 1200, height: 630 }
const PADDING = { x: 80, y: 72 }

export const OgImage = ({
  kicker,
  subtitle,
  logo,
  background,
}: {
  kicker: string
  subtitle: string
  logo: string // data URL
  background: string // data URL
}) => (
  <div
    style={{
      // Satori adds padding on top of width/height, so size the content box.
      width: OG_SIZE.width - 2 * PADDING.x,
      height: OG_SIZE.height - 2 * PADDING.y,
      boxSizing: "content-box",
      padding: `${PADDING.y}px ${PADDING.x}px`,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      color: "#fefefe",
      fontFamily: "IBM Plex Sans",
      backgroundColor: "#0f0f0f",
      // The hero's backdrop, darkened the way the site does it so the copy reads.
      backgroundImage: `linear-gradient(rgba(15,15,15,0.55), rgba(15,15,15,0.85)), url(${background})`,
      backgroundSize: "100% 100%, cover",
    }}
  >
    <img src={logo} height={92} width={226} alt="" />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          fontFamily: "Space Grotesk",
          fontSize: 76,
          lineHeight: 1.05,
          color: "#9bf7a9",
          marginBottom: 20,
        }}
      >
        {kicker}
      </div>
      <div style={{ fontSize: 32, lineHeight: 1.4, maxWidth: 940 }}>
        {subtitle}
      </div>
    </div>
    <div style={{ fontSize: 26, color: "#c4c4c4" }}>forening.trondheimdc.no</div>
  </div>
)
