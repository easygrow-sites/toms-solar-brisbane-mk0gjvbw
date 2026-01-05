import { Metadata } from 'next';
import Link from 'next/link';
import { content } from '@/lib/content';

export const metadata: Metadata = {
  title: `About Us | ${content.business.name}`,
  description: content.about.mission,
};

export default function AboutPage() {
  const { business, about, team } = content;
  const heroImage = content.images?.about || 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop';

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 bg-gray-900">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-900/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">About</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">{about.title}</h1>
            <p className="text-xl text-gray-300">{about.mission}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-brand font-semibold tracking-wide uppercase text-sm">Our Story</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-6">How It All Started</h2>
              {about.story.split('\n\n').map((paragraph, i) => (
                <p key={i} className="text-gray-600 mb-4 leading-relaxed">{paragraph}</p>
              ))}
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img src={heroImage} alt={business.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6">
                <div className="text-4xl font-bold text-brand">{new Date().getFullYear() - business.established}+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand font-semibold tracking-wide uppercase text-sm">Our Values</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">What We Believe In</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {about.values.map((value, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm text-center">
                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand font-semibold tracking-wide uppercase text-sm">Our Team</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">{content.copy?.teamTitle || 'Meet Our Team'}</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {content.copy?.teamSubtitle || `Our talented team brings together diverse skills and experiences to deliver exceptional results for every client.`}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-brand font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, j) => (
                      <span key={j} className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-medium">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-light font-semibold tracking-wide uppercase text-sm">Why Choose Us</span>
            <h2 className="text-3xl font-bold text-white mt-2">The {business.name} Difference</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {about.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 bg-gray-800 rounded-xl p-6">
                <div className="w-12 h-12 bg-brand/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-8">
            Contact us today for a free quote.
          </p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-brand px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
