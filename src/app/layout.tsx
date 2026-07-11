import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LanguageProvider } from "@/components/language/LanguageProvider";
import { UAEHeaderBanner } from "@/components/site/UAEHeaderBanner";
import { BackgroundVideo } from "@/components/site/BackgroundVideo";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloatingButton } from "@/components/site/WhatsAppFloatingButton";
import { BookingStickyCTA } from "@/components/site/BookingStickyCTA";
import Script from "next/script";
import { organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    default: "Advisero Global LLC",
    template: "%s | Advisero Global LLC",
  },
  description:
    "Global Business. Smarter Growth. Global Advisory & Digital Solutions — retail & e-commerce, accounting & tax, management consulting, advertising & media, and professional education.",
  keywords: [
    "Advisero Global",
    "global business consulting",
    "accounting and tax",
    "VAT registration",
    "UK company formation",
    "USA LLC formation",
    "e-commerce consulting",
    "digital marketing",
    "international business",
  ],
  metadataBase: new URL("https://advisero-global.com/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Advisero Global LLC",
    description:
      "Global Business. Smarter Growth. Global Advisory & Digital Solutions.",
    url: "https://advisero-global.com/",
    siteName: "Advisero Global LLC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advisero Global LLC",
    description:
      "Global Business. Smarter Growth. Global Advisory & Digital Solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
        <ThemeProvider>
          <LanguageProvider>
            <BackgroundVideo />
            <UAEHeaderBanner />
            {children}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
        <BookingStickyCTA />
        <WhatsAppFloatingButton />

        <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
          {organizationJsonLd()}
        </Script>
      </body>
    </html>
  );
}
