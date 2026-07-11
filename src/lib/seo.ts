export function organizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Advisero Global LLC",
    url: "https://advisero-global.com/",
    logo: "https://advisero-global.com/logo.png",
    description:
      "Global Business. Smarter Growth. Global Advisory & Digital Solutions — retail & e-commerce, accounting & tax, management consulting, advertising & media, and professional education.",
    sameAs: ["https://www.linkedin.com/"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@advisero-global.com",
        availableLanguage: ["en"],
      },
    ],
  };

  return JSON.stringify(data);
}
