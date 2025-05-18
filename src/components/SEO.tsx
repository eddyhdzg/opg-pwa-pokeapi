import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

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
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://pokemon-pwa.com";

  // Handle Pokemon sprite URLs
  const absoluteImageUrl = image
    ? image.startsWith("http")
      ? image
      : image.startsWith("data:")
      ? image
      : `${window.location.origin}${image}`
    : `${window.location.origin}/pokemon-default.jpg`;

  // Update meta tags when URL changes
  useEffect(() => {
    // Force meta tag updates
    const updateMetaTags = () => {
      // Update title
      document.title = title;

      // Update meta tags
      const metaTags = {
        "og:title": title,
        "og:description": description,
        "og:type": type,
        "og:url": currentUrl,
        "og:image": absoluteImageUrl,
        "og:image:secure_url": absoluteImageUrl,
        "twitter:card": twitterCard,
        "twitter:title": title,
        "twitter:description": description,
        "twitter:image": absoluteImageUrl,
        "twitter:url": currentUrl,
        description: description,
        "og:site_name": name,
        "og:image:type": "image/png",
        "og:image:alt": `Image of ${title}`,
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
    title,
    description,
    type,
    currentUrl,
    absoluteImageUrl,
    twitterCard,
    name,
  ]);

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <link rel="canonical" href={currentUrl} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Open Graph tags */}
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />

      {/* OG image tags */}
      <meta property="og:image" content={absoluteImageUrl} />
      <meta property="og:image:secure_url" content={absoluteImageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="475" />
      <meta property="og:image:height" content="475" />
      <meta property="og:image:alt" content={`Image of ${title}`} />

      {/* Twitter tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />
      <meta name="twitter:url" content={currentUrl} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    </Helmet>
  );
};

export default SEO;
