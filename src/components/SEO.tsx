import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

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
    const updateMetaTags = () => {
      // Update title
      document.title = formattedTitle;

      // Update meta tags
      const metaTags = {
        "og:title": formattedTitle,
        "og:description": description,
        "og:type": type,
        "og:url": currentUrl,
        "og:image": absoluteImageUrl,
        "twitter:card": twitterCard,
        "twitter:title": formattedTitle,
        "twitter:description": description,
        "twitter:image": absoluteImageUrl,
        "twitter:url": currentUrl,
        description: description,
      };

      // Update or create meta tags
      Object.entries(metaTags).forEach(([name, content]) => {
        let meta = document.querySelector(
          `meta[property="${name}"], meta[name="${name}"]`
        );
        if (!meta) {
          meta = document.createElement("meta");
          if (name.startsWith("og:")) {
            meta.setAttribute("property", name);
          } else {
            meta.setAttribute("name", name);
          }
          document.head.appendChild(meta);
        }
        meta.setAttribute("content", content);
      });
    };

    updateMetaTags();
  }, [
    formattedTitle,
    description,
    type,
    currentUrl,
    absoluteImageUrl,
    twitterCard,
  ]);

  return (
    <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle}>
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
