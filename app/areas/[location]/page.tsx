import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { content, getServiceArea, getAllAreaSlugs, generateBreadcrumbSchema } from '@/lib/content';

type Props = {
  params: Promise<{ location: string }>;
};

export async function generateStaticParams() {
  return getAllAreaSlugs().map((location) => ({ location }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const area = getServiceArea(location);
  if (!area) return {};

  const { business } = content;
  return {
    title: `${business.service} ${area.name} | ${business.name}`,
    description: `Professional ${business.service.toLowerCase()} services in ${area.name}. ${area.description}`,
    openGraph: {
      title: `${business.service} in ${area.name} - ${business.name}`,
      description: `${area.description} Book your appointment today.`,
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { location } = await params;
  const area = getServiceArea(location);
  if (!area) notFound();

  const { business, services, testimonials, serviceAreas } = content;
  const areaTestimonials = testimonials.filter(t =>
    t.location.toLowerCase().includes(area.name.toLowerCase())
  ).slice(0, 3);
  const otherAreas = serviceAreas.filter(a => a.slug !== location).slice(0, 4);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Service Areas', url: '/#areas' },
    { name: area.name, url: `/areas/${location}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-900/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/#areas" className="hover:text-white">Areas</Link>
            <span>/</span>
            <span className="text-white">{area.name}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-pink-400 font-medium">Serving {area.name}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              {business.service} in {area.name}
            </h1>
            <p className="text-xl text-gray-300 mb-8">{area.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
                Book Appointment
              </Link>
              <a href={`tel:${business.phone}`} className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all">
                {business.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Services Available in {area.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-600 transition-colors">
                  <svg className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.shortDescription}</p>
                <span className="text-pink-600 font-semibold">{service.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us for This Area */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why {area.name} Clients Choose {business.name}
              </h2>
              <p className="text-gray-600 mb-6">
                Since {business.established}, we&apos;ve been serving clients from {area.name} and the greater
                {business.city} region. Our convenient location in {business.suburb} makes us easily
                accessible, with plenty of free parking available.
              </p>
              <p className="text-gray-600 mb-8">
                We understand that {area.name} residents appreciate quality and convenience.
                That&apos;s why we offer online booking, extended hours on Thursdays, and a relaxing
                salon experience that makes every visit special.
              </p>
              <ul className="space-y-3">
                {[
                  'Easy access from ' + area.name,
                  'Free parking available',
                  'Online booking 24/7',
                  'Extended Thursday hours',
                  'Award-winning stylists',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-pink-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&h=600&fit=crop" alt={`${business.name} salon`} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials from this area */}
      {areaTestimonials.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              What {area.name} Clients Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {areaTestimonials.map((t, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.location}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Areas We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherAreas.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}`}
                className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <svg className="w-5 h-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="font-medium text-gray-900">{business.service} {a.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Book Your Appointment in {area.name}
          </h2>
          <p className="text-white/90 mb-8">
            Join thousands of happy clients from {area.name}. Book online or call us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all">
              Book Online
            </Link>
            <a href={`tel:${business.phone}`} className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-pink-600 transition-all">
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
