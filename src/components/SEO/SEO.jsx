import React from "react";
import { Helmet } from "react-helmet-async";
import {
  getAbsoluteUrl,
  seoNavigation,
  siteSeo,
} from "../../seo/siteSeoData";

const getNavigationLinks = () =>
  seoNavigation.flatMap((item) => [
    { name: item.name, path: item.path },
    ...(item.children || []).map((child) => ({
      name: child.name,
      path: child.path,
      parentName: item.name,
    })),
  ]);

const findNavigationGroup = (path) =>
  seoNavigation.find((item) => {
    const normalizedPath = path.toLowerCase();

    return (
      item.path.toLowerCase() === normalizedPath ||
      item.children?.some((child) => child.path.toLowerCase() === normalizedPath)
    );
  });

const getShortTitle = (title) => title.split("|")[0].trim();

const buildBreadcrumbSchema = (page) => {
  const group = findNavigationGroup(page.path);
  const items = [
    {
      name: "홈",
      path: "/",
    },
  ];

  if (page.path !== "/" && group) {
    items.push({ name: group.name, path: group.path });

    if (group.path.toLowerCase() !== page.path.toLowerCase()) {
      items.push({ name: getShortTitle(page.title), path: page.path });
    }
  } else if (page.path !== "/") {
    items.push({ name: getShortTitle(page.title), path: page.path });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${getAbsoluteUrl(page.path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
};

const buildWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": siteSeo.organizationId,
      name: siteSeo.siteName,
      url: siteSeo.siteUrl,
      logo: getAbsoluteUrl("/logo512.ico"),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+82-${siteSeo.phone.replace(/^0/, "")}`,
        contactType: "customer service",
        areaServed: "KR",
        availableLanguage: "Korean",
      },
    },
    {
      "@type": "WebSite",
      "@id": siteSeo.websiteId,
      url: siteSeo.siteUrl,
      name: siteSeo.siteName,
      inLanguage: "ko-KR",
      publisher: { "@id": siteSeo.organizationId },
    },
  ],
});

const buildNavigationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: siteSeo.project.navigationSchemaName,
  itemListElement: getNavigationLinks().map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SiteNavigationElement",
      name: item.name,
      url: getAbsoluteUrl(item.path),
    },
  })),
});

const buildProjectSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  "@id": `${siteSeo.siteUrl}/#apartment`,
  name: siteSeo.siteName,
  url: siteSeo.siteUrl,
  description: siteSeo.defaultDescription,
  image: getAbsoluteUrl(siteSeo.ogImage),
  telephone: siteSeo.phone,
  address: {
    "@type": "PostalAddress",
    addressCountry: siteSeo.project.addressCountry,
    addressRegion: siteSeo.project.addressRegion,
    addressLocality: siteSeo.project.addressLocality,
    streetAddress: siteSeo.project.streetAddress,
  },
  brand: siteSeo.project.brands.map((brandName) => ({
    "@type": "Brand",
    name: brandName,
  })),
});

const buildWebPageSchema = (page) => ({
  "@context": "https://schema.org",
  "@type": page.pageType || "WebPage",
  "@id": `${getAbsoluteUrl(page.path)}#webpage`,
  url: getAbsoluteUrl(page.path),
  name: page.title,
  description: page.description,
  inLanguage: "ko-KR",
  isPartOf: { "@id": siteSeo.websiteId },
  about: { "@id": siteSeo.organizationId },
  breadcrumb: {
    "@id": `${getAbsoluteUrl(page.path)}#breadcrumb`,
  },
  keywords: siteSeo.keywords.join(", "),
  publisher: { "@id": siteSeo.organizationId },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: getAbsoluteUrl(page.image || siteSeo.ogImage),
  },
  mainEntity: {
    "@id": `${siteSeo.siteUrl}/#apartment`,
  },
});

const SEO = ({ page }) => {
  if (!page) return null;

  const canonicalUrl = getAbsoluteUrl(page.path);
  const imageUrl = getAbsoluteUrl(page.image || siteSeo.ogImage);
  const schemas = [
    buildWebsiteSchema(),
    buildProjectSchema(),
    buildNavigationSchema(),
    buildWebPageSchema(page),
    buildBreadcrumbSchema(page),
    ...(page.extraSchemas || []),
  ];

  return (
    <Helmet prioritizeSeoTags>
      <title>{page.title}</title>
      <meta name="description" content={page.description} />
      <meta name="keywords" content={siteSeo.keywords.join(", ")} />
      <meta name="robots" content={page.robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={page.ogType || "website"} />
      <meta property="og:locale" content={siteSeo.locale} />
      <meta property="og:site_name" content={siteSeo.siteName} />
      <meta property="og:title" content={page.title} />
      <meta property="og:description" content={page.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={page.title} />
      <meta name="twitter:description" content={page.description} />
      <meta name="twitter:image" content={imageUrl} />

      {page.article?.publishedTime && (
        <meta
          property="article:published_time"
          content={page.article.publishedTime}
        />
      )}
      {page.article?.modifiedTime && (
        <meta
          property="article:modified_time"
          content={page.article.modifiedTime}
        />
      )}
      {page.article?.section && (
        <meta property="article:section" content={page.article.section} />
      )}

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
