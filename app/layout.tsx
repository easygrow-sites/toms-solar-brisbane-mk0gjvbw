import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { content, generateLocalBusinessSchema, generateFAQSchema } from "@/lib/content";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(content.seo.siteUrl || 'https://example.com'),
  title: {
    default: content.seo.title,
    template: `%s | ${content.business.name}`,
  },
  description: content.seo.description,
  keywords: content.seo.keywords,
  authors: [{ name: content.business.name }],
  creator: content.business.name,
  publisher: content.business.name,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: content.seo.siteUrl,
    siteName: content.seo.siteName,
    title: content.seo.title,
    description: content.seo.description,
    images: [
      {
        url: `https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=630&fit=crop`,
        width: 1200,
        height: 630,
        alt: `${content.business.name} - ${content.business.service} in ${content.business.city}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: content.seo.title,
    description: content.seo.description,
    images: [`https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&h=630&fit=crop`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: content.seo.siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema();

  // Dynamic color CSS variables from content.json
  const colorStyles = `
    :root {
      --color-primary: ${content.colors?.primary || '#2563eb'};
      --color-primary-light: ${content.colors?.primaryLight || '#3b82f6'};
      --color-secondary: ${content.colors?.secondary || '#1f2937'};
      --color-accent: ${content.colors?.accent || '#f59e0b'};
    }
  `;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Dynamic brand colors */}
        <style dangerouslySetInnerHTML={{ __html: colorStyles }} />
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        {/* Preconnect to image domains */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
