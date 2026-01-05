#!/usr/bin/env node
/**
 * Image Generation Script for Website Template
 * Uses Google's Imagen API to generate professional images
 */

const fs = require('fs');
const path = require('path');

const IMAGEN_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict';
const API_KEY = process.env.GOOGLE_API_KEY || process.env.NANOBANA_API_KEY;

if (!API_KEY) {
  console.error('ERROR: GOOGLE_API_KEY or NANOBANA_API_KEY environment variable required');
  process.exit(1);
}

const PUBLIC_DIR = path.join(__dirname, 'public', 'images');

// Image specifications for the hair salon website
const IMAGES_TO_GENERATE = [
  // Hero images
  {
    filename: 'hero/salon-hero.jpg',
    prompt: 'Luxurious modern hair salon interior, bright natural lighting, stylish chairs and mirrors, fresh flowers, premium hair products on shelves, clean minimalist design, Gold Coast Australia aesthetic, professional photography',
    aspectRatio: '16:9'
  },

  // Service images
  {
    filename: 'services/womens-cut.jpg',
    prompt: 'Professional hairdresser cutting woman\'s hair in upscale salon, precision scissors, mirror reflection, modern styling chair, soft lighting, Australian hair salon, editorial photography style',
    aspectRatio: '4:3'
  },
  {
    filename: 'services/mens-cut.jpg',
    prompt: 'Barber giving stylish men\'s haircut, modern fade technique, male client in salon chair, professional clippers and scissors, masculine decor, Australian men\'s grooming, professional photography',
    aspectRatio: '4:3'
  },
  {
    filename: 'services/full-colour.jpg',
    prompt: 'Woman getting hair coloured in professional salon, foils in hair, colour bowls and brushes, stylist working, warm salon lighting, premium hair colour service, Australian salon',
    aspectRatio: '4:3'
  },
  {
    filename: 'services/balayage.jpg',
    prompt: 'Beautiful balayage hair result, sun-kissed highlights on long wavy hair, natural looking hair colour, soft golden tones, beach waves styling, Gold Coast hair salon result',
    aspectRatio: '4:3'
  },
  {
    filename: 'services/keratin.jpg',
    prompt: 'Smooth shiny hair after keratin treatment, sleek straight hair, healthy glossy finish, before and after hair transformation, salon professional treatment result',
    aspectRatio: '4:3'
  },
  {
    filename: 'services/bridal.jpg',
    prompt: 'Elegant bridal hairstyle, romantic updo with soft curls, wedding hair with delicate flowers, bride getting ready, natural makeup, wedding day hair styling',
    aspectRatio: '4:3'
  },
  {
    filename: 'services/extensions.jpg',
    prompt: 'Long flowing hair extensions, natural looking tape-in extensions, blonde highlights, volume and length, professional hair extension result, Australian woman',
    aspectRatio: '4:3'
  },
  {
    filename: 'services/scalp.jpg',
    prompt: 'Scalp treatment in progress, spa-like hair treatment, relaxing head massage, professional trichology treatment, healthy scalp care, wellness salon service',
    aspectRatio: '4:3'
  },

  // Team headshots
  {
    filename: 'team/sarah.jpg',
    prompt: 'Professional headshot of female hair salon owner, confident smile, stylish short blonde hair, age 40s, wearing black, modern salon background, Australian professional woman',
    aspectRatio: '1:1'
  },
  {
    filename: 'team/james.jpg',
    prompt: 'Professional headshot of male hair colourist, friendly expression, modern hairstyle, age 30s, wearing black, salon background, Australian Asian man, professional portrait',
    aspectRatio: '1:1'
  },
  {
    filename: 'team/emma.jpg',
    prompt: 'Professional headshot of young female hair stylist, warm smile, long brown hair, age 20s, wearing black, salon background, Australian woman, friendly portrait',
    aspectRatio: '1:1'
  },

  // Gallery images
  {
    filename: 'gallery/balayage-1.jpg',
    prompt: 'Stunning blonde balayage on long wavy hair, natural sun-kissed highlights, beach waves, hair colour result, Gold Coast hair salon work',
    aspectRatio: '1:1'
  },
  {
    filename: 'gallery/mens-fade-1.jpg',
    prompt: 'Modern men\'s fade haircut, clean lines, textured top, fresh barbershop style, Australian men\'s haircut',
    aspectRatio: '1:1'
  },
  {
    filename: 'gallery/bridal-1.jpg',
    prompt: 'Romantic bridal updo hairstyle, elegant wedding hair, soft curls and braids, wedding day beauty',
    aspectRatio: '1:1'
  },
  {
    filename: 'gallery/bob-1.jpg',
    prompt: 'Precision bob haircut, sleek modern bob, sharp lines, professional women\'s haircut, salon quality cut',
    aspectRatio: '1:1'
  },
  {
    filename: 'gallery/vivid-1.jpg',
    prompt: 'Vibrant fashion hair colour, bold creative colour, pink and purple tones, artistic hair colouring, statement hair',
    aspectRatio: '1:1'
  },
  {
    filename: 'gallery/extensions-1.jpg',
    prompt: 'Natural looking hair extensions result, long blonde hair, seamless blend, volume and length, professional extension work',
    aspectRatio: '1:1'
  },
  {
    filename: 'gallery/colour-2.jpg',
    prompt: 'Rich brunette hair colour, glossy chocolate brown hair, healthy shine, professional colour result',
    aspectRatio: '1:1'
  },
  {
    filename: 'gallery/curls-1.jpg',
    prompt: 'Beautiful natural curly hair, bouncy defined curls, curly hair styling, textured hair specialist result',
    aspectRatio: '1:1'
  },

  // About page
  {
    filename: 'about/salon-interior.jpg',
    prompt: 'Modern hair salon interior, styling stations with mirrors, comfortable chairs, plants and decor, bright welcoming space, premium hair salon Gold Coast',
    aspectRatio: '16:9'
  },
  {
    filename: 'about/salon-team.jpg',
    prompt: 'Hair salon team photo, three stylists in black uniforms, friendly professional group, modern salon background, Australian team',
    aspectRatio: '16:9'
  }
];

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function generateImage(prompt, aspectRatio = '4:3', retries = 3) {
  const enhancedPrompt = `Professional photograph: ${prompt}. High quality, clean composition, good natural lighting, no text or watermarks, realistic.`;

  const payload = {
    instances: [{ prompt: enhancedPrompt }],
    parameters: {
      sampleCount: 1,
      aspectRatio: aspectRatio,
      safetyFilterLevel: 'block_few',
      personGeneration: 'allow_adult'
    }
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    const response = await fetch(`${IMAGEN_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.status === 429) {
      const waitTime = attempt * 30000; // 30s, 60s, 90s
      console.log(`    Rate limited, waiting ${waitTime/1000}s (attempt ${attempt}/${retries})...`);
      await sleep(waitTime);
      continue;
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error ${response.status}: ${error.slice(0, 200)}`);
    }

    const data = await response.json();
    const predictions = data.predictions || [];

    if (predictions.length > 0 && predictions[0].bytesBase64Encoded) {
      return predictions[0].bytesBase64Encoded;
    }

    throw new Error('No image in response');
  }

  throw new Error('Max retries exceeded due to rate limiting');
}

async function saveImage(base64Data, filename) {
  const filepath = path.join(PUBLIC_DIR, filename);
  const dir = path.dirname(filepath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync(filepath, buffer);
  console.log(`  ✓ Saved: ${filename}`);
}

async function main() {
  console.log('\n🎨 Website Image Generator');
  console.log('==========================\n');
  console.log(`Generating ${IMAGES_TO_GENERATE.length} images...\n`);

  let success = 0;
  let failed = 0;

  for (const image of IMAGES_TO_GENERATE) {
    const filepath = path.join(PUBLIC_DIR, image.filename);

    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`  ⏭ Skipped (exists): ${image.filename}`);
      success++;
      continue;
    }

    console.log(`  ⏳ Generating: ${image.filename}`);

    try {
      const base64 = await generateImage(image.prompt, image.aspectRatio);
      await saveImage(base64, image.filename);
      success++;

      // Rate limiting - wait 15 seconds between successful requests
      await sleep(15000);
    } catch (error) {
      console.log(`  ✗ Failed: ${image.filename} - ${error.message}`);
      failed++;
    }
  }

  console.log('\n==========================');
  console.log(`✅ Success: ${success}/${IMAGES_TO_GENERATE.length}`);
  if (failed > 0) {
    console.log(`❌ Failed: ${failed}/${IMAGES_TO_GENERATE.length}`);
  }
  console.log('');
}

main().catch(console.error);
