import { Helmet } from "react-helmet-async"

function SEO({ title, description }) {
  const fullTitle = `${title} | CoreLuxuryCar`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href="https://coreluxurycar.com/" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content="https://coreluxurycar.com/" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default SEO
export { SEO }
