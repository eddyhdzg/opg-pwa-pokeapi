import { useEffect } from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  titleTemplate?: string;
  defaultTitle?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
}

const SEO: React.FC<SEOProps> = ({
  title,
  titleTemplate = "%s | Pokemon Viewer",
  defaultTitle = "Pokemon Viewer",
  description = "A Progressive Web App for exploring Pokemon data",
  keywords = ["pokemon", "pwa", "pokemon api", "pokemon database"],
  image,
  url,
  type = "website",
  twitterCard = "summary_large_image",
}) => {
  const formattedTitle = title
    ? titleTemplate.replace("%s", title)
    : defaultTitle;
  const currentUrl =
    url ||
    (typeof window !== "undefined"
      ? window.location.href
      : "https://pokemon-pwa.com");

  // Convert relative image URL to absolute URL
  const absoluteImageUrl = image
    ? image.startsWith("http")
      ? image
      : `${window.location.origin}${image}`
    : `${window.location.origin}/pokemon-default.jpg`;

  // Update meta tags when URL changes
  useEffect(() => {
    // Force meta tag updates
    const metaTags = document.getElementsByTagName("meta");
    for (let i = 0; i < metaTags.length; i++) {
      const tag = metaTags[i];
      if (tag.getAttribute("property") === "og:url") {
        tag.setAttribute("content", currentUrl);
      }
      if (tag.getAttribute("name") === "twitter:url") {
        tag.setAttribute("content", currentUrl);
      }
      if (tag.getAttribute("property") === "og:image") {
        tag.setAttribute("content", absoluteImageUrl);
      }
      if (tag.getAttribute("name") === "twitter:image") {
        tag.setAttribute("content", absoluteImageUrl);
      }
    }
  }, [currentUrl, absoluteImageUrl]);

  return (
    <Helmet
      titleTemplate={titleTemplate}
      defaultTitle={defaultTitle}
      onChangeClientState={(newState) => {
        // Force update meta tags
        if (newState.title) {
          document.title = newState.title;
        }
      }}
    >
      {/* Basic Meta Tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:width" content="475" />
      <meta property="og:image:height" content="475" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:url" content={currentUrl} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEO;
