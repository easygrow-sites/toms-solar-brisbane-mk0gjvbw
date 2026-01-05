import { Metadata } from 'next';
import Link from 'next/link';
import { content } from '@/lib/content';

export const metadata: Metadata = {
  title: `Gallery | ${content.business.name}`,
  description: `View our portfolio of stunning hair transformations. See examples of cuts, colour, balayage, bridal styles and more from ${content.business.name}.`,
};

export default function GalleryPage() {
  const { business, gallery, services } = content;

  // Use gallery items from content.json (with real AI-generated images)
  const categories = ['Colour', "Men's", 'Bridal', 'Cuts', 'Extensions', 'Styling'];

  // Extend gallery by repeating and varying the content.json items
  const extendedGallery = categories.flatMap((category) => {
    const categoryItems = gallery.filter(g => g.category === category);
    // If we have items for this category, use them; otherwise create placeholder entries
    if (categoryItems.length > 0) {
      return categoryItems.map(item => ({
        image: item.image,
        alt: item.alt,
        category: item.category,
      }));
    }
    // For categories without gallery items, use service images
    const serviceMatch = services.find(s =>
      s.title.toLowerCase().includes(category.toLowerCase()) ||
      category.toLowerCase().includes(s.title.toLowerCase().split(' ')[0])
    );
    return [{
      image: serviceMatch?.image || '/images/gallery/balayage-1.jpg',
      alt: `${category} style`,
      category,
    }];
  });

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Work</h1>
            <p className="text-xl text-gray-300">
              Browse through some of our favourite transformations. From natural balayage to bold fashion colours,
              precision cuts to stunning bridal styles.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-5 py-2 rounded-full bg-pink-600 text-white font-medium">
              All
            </button>
            {categories.map((category) => (
              <button key={category} className="px-5 py-2 rounded-full bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 font-medium transition-colors border border-gray-200">
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {extendedGallery.map((item, i) => (
              <div key={i} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block bg-pink-600 text-white text-xs px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Want Results Like These?</h2>
            <p className="text-gray-600 mt-4">Book your appointment and let our expert stylists transform your look</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all text-center"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{service.shortDescription}</p>
                <span className="text-pink-600 font-semibold">{service.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg className="w-16 h-16 text-pink-600 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
          </svg>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Follow Us on Instagram</h2>
          <p className="text-gray-600 mb-8">
            See our latest work and behind-the-scenes content. Tag us in your photos!
          </p>
          {business.socialMedia.instagram && (
            <a
              href={business.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all"
            >
              @{business.socialMedia.instagram.split('/').pop()}
            </a>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready for Your Transformation?</h2>
          <p className="text-white/90 mb-8">Book your appointment today and let us create something beautiful.</p>
          <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all">
            Book Now
          </Link>
        </div>
      </section>
    </>
  );
}
