export const SITE_URL = "https://aquigolf.es";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const FOUNDER_ID = `${SITE_URL}/#francisco-menacho`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const OFFICIAL_PROFILES = [
  { name: "YouTube", url: "https://www.youtube.com/@Aqui_Golf" },
  { name: "Instagram", url: "https://www.instagram.com/aqui.golf/" },
  { name: "Facebook", url: "https://www.facebook.com/AquiGolfSimuladores/" },
];

export function absoluteSiteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).href;
}

// Brand, founder and contacts match the public website and its legal notice.
// No shop address, certifications, reviews or aggregate ratings are inferred.
export function getEntityGraph() {
  return [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: "Aquí Golf",
      alternateName: "Aqui Golf",
      url: `${SITE_URL}/`,
      description: "Diseño, consultoría, instalación y soporte de simuladores de golf a medida en España para viviendas y negocios.",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/aqui-golf-circular.png`,
      },
      email: "info@aquigolf.es",
      telephone: "+34678107234",
      founder: { "@id": FOUNDER_ID },
      sameAs: OFFICIAL_PROFILES.map(({ url }) => url),
      areaServed: { "@type": "Country", name: "España" },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Información sobre proyectos de simuladores de golf",
        telephone: "+34678107234",
        email: "info@aquigolf.es",
        availableLanguage: "es",
        areaServed: "ES",
      },
      publishingPrinciples: `${SITE_URL}/sobre-aqui-golf#criterios-editoriales`,
    },
    {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Francisco Menacho Valle",
      alternateName: "Francisco Menacho",
      url: `${SITE_URL}/sobre-aqui-golf#francisco-menacho`,
      image: `${SITE_URL}/francisco-aqui-golf.webp`,
      jobTitle: "Fundador de Aquí Golf",
      worksFor: { "@id": ORGANIZATION_ID },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: "Aquí Golf",
      publisher: { "@id": ORGANIZATION_ID },
      inLanguage: "es-ES",
    },
  ];
}

export function getPageSchema({
  title,
  description,
  path = "/",
  image = "/despues_1.webp",
  faqs = [],
  serviceType,
  article,
  breadcrumbs = [],
  pageType = "WebPage",
}) {
  const canonical = absoluteSiteUrl(path);
  const schemaIdBase = canonical.endsWith("/") ? canonical : `${canonical}/`;
  const webpageId = `${schemaIdBase}#webpage`;
  const breadcrumbItems = breadcrumbs.length
    ? [{ label: "Inicio", href: "/" }, ...breadcrumbs.filter(({ href }) => href !== "/")]
    : [];
  const authorId = typeof article?.author === "string"
    ? (/Francisco Menacho/i.test(article.author) ? FOUNDER_ID : ORGANIZATION_ID)
    : article?.author?.["@id"] || ORGANIZATION_ID;

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...getEntityGraph(),
      {
        "@type": pageType,
        "@id": webpageId,
        url: canonical,
        name: title,
        description,
        inLanguage: "es-ES",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        primaryImageOfPage: { "@type": "ImageObject", url: absoluteSiteUrl(image) },
        ...(breadcrumbItems.length ? { breadcrumb: { "@id": `${schemaIdBase}#breadcrumb` } } : {}),
        ...(article ? { mainEntity: { "@id": `${schemaIdBase}#article` } } : {}),
      },
      ...(serviceType ? [{
        "@type": "Service",
        "@id": `${schemaIdBase}#service`,
        name: serviceType,
        serviceType,
        description,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "Country", name: "España" },
        url: canonical,
        mainEntityOfPage: { "@id": webpageId },
      }] : []),
      ...(article ? [{
        "@type": "Article",
        "@id": `${schemaIdBase}#article`,
        headline: article.headline || title,
        description,
        url: canonical,
        image: absoluteSiteUrl(image),
        inLanguage: "es-ES",
        mainEntityOfPage: { "@id": webpageId },
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": authorId },
        publisher: { "@id": ORGANIZATION_ID },
        ...(article.datePublished ? { datePublished: article.datePublished } : {}),
        ...(article.dateModified ? { dateModified: article.dateModified } : {}),
      }] : []),
      ...(breadcrumbItems.length ? [{
        "@type": "BreadcrumbList",
        "@id": `${schemaIdBase}#breadcrumb`,
        itemListElement: breadcrumbItems.map(({ label, href }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: label,
          item: href ? absoluteSiteUrl(href) : canonical,
        })),
      }] : []),
      ...(faqs.length ? [{
        "@type": "FAQPage",
        "@id": `${schemaIdBase}#faq`,
        url: canonical,
        isPartOf: { "@id": webpageId },
        mainEntity: faqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      }] : []),
    ],
  };
}
