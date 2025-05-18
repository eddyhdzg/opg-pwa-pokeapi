import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  name?: string;
  type?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  keywords?: string[];
}

const SEO: React.FC<SEOProps> = ({
  title = "Pokemon Viewer",
  description = "Explore the world of Pokemon with our interactive Pokedex",
  image,
  name = "Pokemon Viewer",
  type = "website",
  twitterCard = "summary_large_image",
  keywords = ["pokemon", "pwa", "pokemon api", "pokemon database"],
}) => {
  const location = useLocation();
  const currentUrl = `https://pokemon-pwa.com${location.pathname}`;

  // Ensure we have an absolute URL for the image
  const absoluteImageUrl = image
    ? image.startsWith("http")
      ? image
      : `https://pokeapi.co${image}`
    : "https://pokemon-pwa.com/pokemon-default.jpg";

  return (
    <Helmet prioritizeSeoTags>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="475" />
      <meta property="og:image:height" content="475" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={name} />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEO;
