import { alert } from "@mdit/plugin-alert"

const canonicalUrl = process.env.URL || undefined

/** @type {import('@marp-team/marp-cli').Config} */
const config = {
  allowLocalFiles: true,
  engine: ({ marp }) => marp.use(alert),
  ogImage: (() => {
    if (canonicalUrl) return `${canonicalUrl}/og-image.jpg`
    if (process.env.VERCEL_URL)
      return `https://${process.env.VERCEL_URL}/og-image.jpg`
    return undefined
  })(),
  themeSet: 'themes',
  url: canonicalUrl,
}

export default config