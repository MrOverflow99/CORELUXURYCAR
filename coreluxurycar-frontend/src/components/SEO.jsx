import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"

const BASE_URL = "https://coreluxurycar.com"

function SEO({ title, description }) {
  const { pathname } = useLocation()
  const fullTitle = `${title} | CoreLuxuryCar`
  const canonical = `${BASE_URL}${pathname}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default SEO
export { SEO }
