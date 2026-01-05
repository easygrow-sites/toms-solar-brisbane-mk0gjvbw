import contentData from '../content.json';

export const content = contentData;

export type Service = typeof content.services[0];
export type ServiceArea = typeof content.serviceAreas[0];
export type Testimonial = typeof content.testimonials[0];
export type TeamMember = typeof content.team[0];
export type FAQ = typeof content.faq[0];
export type GalleryItem = typeof content.gallery[0];

export function getService(slug: string): Service | undefined {
  return content.services.find(s => s.slug === slug);
}

export function getServiceArea(slug: string): ServiceArea | undefined {
  return content.serviceAreas.find(a => a.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return content.services.map(s => s.slug);
}

export function getAllAreaSlugs(): string[] {
  return content.serviceAreas.map(a => a.slug);
}

// Image with fallback - uses picsum.photos as fallback for missing images
// This allows the site to work while AI images are being generated
export function withFallback(imagePath: string, fallbackSeed: string, width = 800, height = 600): string {
  // In development/build, we can't check if files exist, so we use CSS onerror fallback
  // The actual fallback is handled via CSS or onerror in the img tag
  return imagePath;
}

// Fallback image generators using picsum.photos (free, no API key needed)
export function getFallbackImage(seed: string, width = 800, height = 600): string {
  const safeSeed = seed.replace(/\s+/g, '-').toLowerCase();
  return `https://picsum.photos/seed/${safeSeed}/${width}/${height}`;
}

export function getServiceImage(service: string, index: number = 0): string {
  const seed = `${service}-${index}`.replace(/\s+/g, '-').toLowerCase();
  return `https://picsum.photos/seed/${seed}/800/600`;
}

export function getHeroImage(service: string): string {
  const seed = `hero-${service}`.replace(/\s+/g, '-').toLowerCase();
  return `https://picsum.photos/seed/${seed}/1920/1080`;
}

export function getTeamImage(name: string): string {
  const seed = `team-${name}`.replace(/\s+/g, '-').toLowerCase();
  return `https://picsum.photos/seed/${seed}/400/400`;
}

export function getGalleryImage(category: string, index: number): string {
  const seed = `gallery-${category}-${index}`.replace(/\s+/g, '-').toLowerCase();
  return `https://picsum.photos/seed/${seed}/600/600`;
}

// Schema.org structured data generators
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": content.schema.type,
    "name": content.business.name,
    "description": content.seo.description,
    "url": content.seo.siteUrl,
    "telephone": content.business.phone,
    "email": content.business.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": content.business.address,
      "addressLocality": content.business.city,
      "addressRegion": content.business.state,
      "postalCode": content.business.postcode,
      "addressCountry": content.business.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -28.0023,
      "longitude": 153.4145
    },
    "openingHoursSpecification": Object.entries(content.business.openingHours)
      .filter(([_, hours]) => hours !== "Closed")
      .map(([day, hours]) => ({
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": day.charAt(0).toUpperCase() + day.slice(1),
        "opens": hours.split(" - ")[0],
        "closes": hours.split(" - ")[1]
      })),
    "priceRange": content.schema.priceRange,
    "image": getHeroImage(content.business.service),
    "sameAs": Object.values(content.business.socialMedia)
  };
}

export function generateServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": content.schema.type,
      "name": content.business.name
    },
    "areaServed": content.serviceAreas.map(a => ({
      "@type": "City",
      "name": a.name
    })),
    "description": service.description,
    "offers": {
      "@type": "Offer",
      "price": service.price.replace(/[^0-9]/g, ''),
      "priceCurrency": "AUD"
    }
  };
}

export function generateFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${content.seo.siteUrl}${item.url}`
    }))
  };
}
