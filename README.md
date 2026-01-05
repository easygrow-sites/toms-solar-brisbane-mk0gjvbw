# EasyGrow Website Template

A simple, fast Next.js website template for service businesses. Just swap the content and deploy.

## Quick Start

1. **Generate content for a new customer:**
```bash
node generate-content.js "BestHair" "Hairdresser" "Gold Coast" "0400 123 456" "info@besthair.com.au"
```

2. **Install and run:**
```bash
npm install
npm run dev
```

3. **Deploy to Vercel:**
```bash
npx vercel --prod
```

## Customization

Edit `content.json` to change:
- Business name, phone, email
- Service type and location
- Hero text and CTA
- Services offered
- About section
- Testimonials
- SEO metadata
- Brand colors

## Structure

```
├── content.json      # All customizable content
├── app/
│   ├── layout.tsx    # Root layout with SEO
│   ├── page.tsx      # Main landing page
│   └── globals.css   # Tailwind styles
├── public/images/    # Logo and images
└── generate-content.js # Content generator script
```

## For EasyGrow Dashboard

The dashboard can automatically:
1. Fork this template repo
2. Run `generate-content.js` with customer data
3. Commit and push to trigger Vercel deploy
