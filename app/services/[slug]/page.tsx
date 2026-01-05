import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { content, getService, getAllServiceSlugs, generateServiceSchema, generateBreadcrumbSchema } from '@/lib/content';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const { business } = content;
  return {
    title: `${service.title} ${business.city} | ${business.name}`,
    description: `${service.description.substring(0, 155)}...`,
    openGraph: {
      title: `${service.title} in ${business.city}`,
      description: service.shortDescription,
      images: [{ url: service.image, width: 800, height: 600 }],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { business, services, testimonials } = content;
  const relatedServices = services.filter(s => s.slug !== slug).slice(0, 3);
  const relatedTestimonials = testimonials.filter(t =>
    t.service.toLowerCase().includes(service.title.toLowerCase().split(' ')[0])
  ).slice(0, 2);

  const serviceSchema = generateServiceSchema(service);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/#services' },
    { name: service.title, url: `/services/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${service.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-900/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-white">Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-pink-600/20 text-pink-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
              {service.price} • {service.duration}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">{service.title}</h1>
            <p className="text-xl text-gray-300 mb-8">{service.shortDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
                Book This Service
              </Link>
              <a href={`tel:${business.phone}`} className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all">
                Call {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left - Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2>About {service.title}</h2>
                <p>{service.description}</p>

                <div className="aspect-video rounded-xl overflow-hidden my-8">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                </div>

                <h3>What&apos;s Included</h3>
                <ul>
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>

                <h3>Why Choose {business.name} for {service.title}?</h3>
                <p>
                  At {business.name}, we&apos;ve been delivering exceptional {service.title.toLowerCase()} services to
                  {business.city} clients since {business.established}. Our team of expert stylists combines years
                  of experience with ongoing training to ensure you receive the best results every time.
                </p>
                <p>
                  We use only premium, salon-exclusive products that are gentle on your hair while delivering
                  stunning, long-lasting results. Every service begins with a thorough consultation to understand
                  your goals and ensure we deliver exactly what you&apos;re looking for.
                </p>
              </div>

              {/* Testimonials */}
              {relatedTestimonials.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What Clients Say</h3>
                  <div className="grid gap-6">
                    {relatedTestimonials.map((t, i) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex gap-1 mb-3">
                          {[...Array(t.rating)].map((_, j) => (
                            <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-700 mb-4">&ldquo;{t.text}&rdquo;</p>
                        <div className="font-semibold text-gray-900">{t.name}, {t.location}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right - Sidebar */}
            <div className="lg:col-span-1">
              {/* Booking Card */}
              <div className="bg-pink-50 rounded-xl p-6 mb-8 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Book {service.title}</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price</span>
                    <span className="font-semibold text-gray-900">{service.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-gray-900">{service.duration}</span>
                  </div>
                </div>
                <Link href="/contact" className="block w-full bg-pink-600 hover:bg-pink-700 text-white text-center px-6 py-3 rounded-full font-semibold transition-colors">
                  Book Now
                </Link>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Free consultation included
                </p>
              </div>

              {/* Related Services */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Other Services</h3>
                <div className="space-y-4">
                  {relatedServices.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="flex items-center gap-4 group">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">{s.title}</div>
                        <div className="text-sm text-gray-500">{s.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Amazing Hair?</h2>
          <p className="text-gray-400 mb-8">Book your {service.title.toLowerCase()} appointment today</p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
