#!/usr/bin/env node
/**
 * Generate content.json for a new customer
 * Usage: node generate-content.js "Business Name" "Service" "Location" "Phone" "Email"
 */

const fs = require('fs');

const [,, businessName, service, location, phone, email] = process.argv;

if (!businessName || !service || !location) {
  console.log('Usage: node generate-content.js "Business Name" "Service" "Location" "Phone" "Email"');
  process.exit(1);
}

// Generate professional, SEO-optimized content
const serviceLower = service.toLowerCase();
const year = new Date().getFullYear();

const content = {
  business: {
    name: businessName,
    tagline: `${location}'s Most Trusted ${service} - Quality You Can Count On`,
    phone: phone || "1300 000 000",
    email: email || `hello@${businessName.toLowerCase().replace(/\s+/g, '')}.com.au`,
    address: location,
    service: service,
    location: location,
    abn: "",
    established: year - 10
  },
  hero: {
    title: `#1 Rated ${service} in ${location}`,
    subtitle: `Transform your look with ${location}'s premier ${serviceLower} team. Over 10 years of experience delivering stunning results and exceptional service.`,
    cta: "Book Your Appointment",
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "5000+", label: "Happy Clients" },
      { value: "4.9", label: "Google Rating" }
    ]
  },
  services: [
    {
      title: "Cuts & Styling",
      description: `Expert cuts and styling tailored to your unique features. Our ${location} stylists stay current with the latest trends while creating timeless looks.`,
      icon: "scissors",
      price: "From $45"
    },
    {
      title: "Colour & Highlights",
      description: `Full colour, balayage, highlights and colour correction. We use premium products for vibrant, long-lasting results that protect your hair.`,
      icon: "palette",
      price: "From $120"
    },
    {
      title: "Treatments & Care",
      description: `Revitalize damaged hair with our luxury treatments. Keratin smoothing, deep conditioning, and scalp therapy for healthy, beautiful hair.`,
      icon: "sparkles",
      price: "From $80"
    },
    {
      title: "Bridal & Events",
      description: `Make your special day unforgettable. Bridal packages include trial sessions, day-of styling, and group bookings for the whole wedding party.`,
      icon: "heart",
      price: "From $250"
    }
  ],
  about: {
    title: `Why ${location} Chooses ${businessName}`,
    description: `Since ${year - 10}, ${businessName} has been ${location}'s destination for exceptional ${serviceLower} services. Our passionate team combines artistic vision with technical expertise to help you look and feel your absolute best. We believe great hair starts with understanding your lifestyle, preferences, and goals.`,
    mission: `Our mission is simple: deliver salon experiences that exceed expectations, using sustainable practices and premium products that are kind to your hair and the environment.`,
    features: [
      { title: "Licensed Professionals", desc: "Fully qualified stylists with ongoing training" },
      { title: "Premium Products", desc: "We only use salon-quality, sustainable products" },
      { title: "Hygiene Guaranteed", desc: "Strict sanitization protocols for your safety" },
      { title: "Free Consultations", desc: "Every visit starts with understanding your needs" }
    ]
  },
  testimonials: [
    {
      name: "Emma Richardson",
      location: location,
      text: `I've been coming to ${businessName} for 3 years and wouldn't go anywhere else. The team really listens and always delivers exactly what I'm looking for. Best ${serviceLower} in ${location}!`,
      rating: 5,
      service: "Balayage & Cut"
    },
    {
      name: "Sophie Chen",
      location: location,
      text: `Found my forever salon! The attention to detail is incredible, and the atmosphere is so relaxing. My colour has never looked better. Highly recommend to anyone in ${location}.`,
      rating: 5,
      service: "Full Colour"
    },
    {
      name: "Michael Torres",
      location: location,
      text: `Finally a barber-quality cut in a salon environment. Quick, professional, and they actually remember how I like my hair. Great value for the quality.`,
      rating: 5,
      service: "Men's Cut & Style"
    },
    {
      name: "Jessica Williams",
      location: location,
      text: `${businessName} did my bridal hair and I couldn't have been happier. They made me feel so beautiful on my big day. The trial was thorough and the day-of service was flawless.`,
      rating: 5,
      service: "Bridal Package"
    }
  ],
  faq: [
    {
      q: `What are your opening hours?`,
      a: `We're open Tuesday to Saturday, 9am-6pm, with late nights on Thursday until 8pm. Closed Sunday and Monday.`
    },
    {
      q: `Do I need to book an appointment?`,
      a: `We recommend booking in advance to secure your preferred time, but we do accept walk-ins when availability allows.`
    },
    {
      q: `What products do you use?`,
      a: `We exclusively use premium, salon-quality products that are gentle on your hair and the environment.`
    },
    {
      q: `Do you offer parking?`,
      a: `Yes! Free parking is available directly behind our salon, with additional street parking nearby.`
    }
  ],
  footer: {
    copyright: `© ${year} ${businessName}. All rights reserved. ABN pending.`,
    areas: `Proudly serving ${location}, and surrounding suburbs`,
    hours: "Tue-Sat 9am-6pm | Thu late night 8pm"
  },
  seo: {
    title: `${businessName} | Best ${service} in ${location} | Book Online`,
    description: `${location}'s top-rated ${serviceLower} salon. Expert cuts, colour, and styling with 10+ years experience. 5-star reviews. Book your appointment today!`,
    keywords: [
      `${serviceLower} ${location}`,
      `best ${serviceLower} ${location}`,
      `${location} ${serviceLower}`,
      `hair salon ${location}`,
      `${serviceLower} near me`,
      `${location} hair colour`,
      `balayage ${location}`,
      businessName
    ],
    ogImage: `https://source.unsplash.com/1200x630/?${encodeURIComponent(serviceLower)},salon`
  },
  colors: {
    primary: "#f97316",
    secondary: "#1f2937",
    accent: "#fbbf24"
  },
  images: {
    hero: `https://source.unsplash.com/1600x900/?${encodeURIComponent(serviceLower)},salon,modern`,
    about: `https://source.unsplash.com/800x600/?${encodeURIComponent(serviceLower)},professional,team`,
    gallery: [
      `https://source.unsplash.com/400x400/?hair,style,1`,
      `https://source.unsplash.com/400x400/?hair,colour,2`,
      `https://source.unsplash.com/400x400/?salon,interior,3`,
      `https://source.unsplash.com/400x400/?hairstyle,4`
    ],
    logo: "/images/logo.png"
  },
  schema: {
    type: "LocalBusiness",
    priceRange: "$$"
  }
};

fs.writeFileSync('content.json', JSON.stringify(content, null, 2));
console.log(`Generated content.json for ${businessName}`);
console.log(`- Service: ${service}`);
console.log(`- Location: ${location}`);
