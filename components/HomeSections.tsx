import Image from "next/image";
import { getMediaUrl } from "@/lib/payload";

interface SectionProps {
  section: any;
}

function HeroSection({ section }: SectionProps) {
  const imageUrl = section.image ? getMediaUrl(section.image) : null;

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center"
      style={{
        backgroundColor: section.backgroundColor || "#ffffff",
        color: section.textColor || "#000000",
      }}
    >
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={imageUrl}
            alt={section.title || ""}
            fill
            className="object-cover opacity-50"
            priority
            unoptimized
          />
        </div>
      )}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{section.title}</h1>
        {section.subtitle && (
          <p className="text-xl md:text-2xl mb-8">{section.subtitle}</p>
        )}
        {section.content && (
          <div className="prose prose-lg max-w-3xl mx-auto mb-8">
            {/* Rich text content would be rendered here */}
            <p>{section.content}</p>
          </div>
        )}
        {section.buttonText && section.buttonLink && (
          <a
            href={section.buttonLink}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {section.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}

function AboutSection({ section }: SectionProps) {
  const imageUrl = section.image ? getMediaUrl(section.image) : null;

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: section.backgroundColor || "#f9fafb",
        color: section.textColor || "#000000",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {imageUrl && (
            <div className="relative h-96">
              <Image
                src={imageUrl}
                alt={section.title || ""}
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>
          )}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {section.title}
            </h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600 mb-6">{section.subtitle}</p>
            )}
            {section.content && (
              <div className="prose max-w-none">
                <p>{section.content}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ section }: SectionProps) {
  return (
    <section
      className="py-16"
      style={{
        backgroundColor: section.backgroundColor || "#ffffff",
        color: section.textColor || "#000000",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="text-xl text-center text-gray-600 mb-12">
            {section.subtitle}
          </p>
        )}
        {section.services && section.services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {section.services.map((service: any, index: number) => (
              <div key={index} className="text-center">
                {service.icon && (
                  <div className="mb-4">
                    <Image
                      src={getMediaUrl(service.icon)}
                      alt={service.title || ""}
                      width={64}
                      height={64}
                      className="mx-auto"
                      unoptimized
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                {service.description && (
                  <p className="text-gray-600">{service.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function GallerySection({ section }: SectionProps) {
  // Get images from either images array or single image field
  const galleryImages: Array<{ image: unknown; caption?: string }> = [];
  
  // First, check if there's an images array
  if (section.images && Array.isArray(section.images) && section.images.length > 0) {
    section.images.forEach((item: any) => {
      if (item.image) {
        galleryImages.push({
          image: item.image,
          caption: item.caption,
        });
      }
    });
  }
  
  // If no images in array, but there's a single image, use it
  if (galleryImages.length === 0 && section.image) {
    galleryImages.push({
      image: section.image,
      caption: undefined,
    });
  }

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: section.backgroundColor || "#f9fafb",
        color: section.textColor || "#000000",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="text-xl text-center text-gray-600 mb-12">
            {section.subtitle}
          </p>
        )}
        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryImages.map((item, index) => {
              const imageUrl = getMediaUrl(item.image);
              if (!imageUrl) return null;
              
              return (
                <div key={index} className="relative h-64">
                  <Image
                    src={imageUrl}
                    alt={item.caption || section.title || ""}
                    fill
                    className="object-cover rounded-lg"
                    unoptimized
                  />
                  {item.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                      {item.caption}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Немає зображень для відображення
          </p>
        )}
      </div>
    </section>
  );
}

function TestimonialsSection({ section }: SectionProps) {
  return (
    <section
      className="py-16"
      style={{
        backgroundColor: section.backgroundColor || "#ffffff",
        color: section.textColor || "#000000",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {section.title}
        </h2>
        {section.subtitle && (
          <p className="text-xl text-center text-gray-600 mb-12">
            {section.subtitle}
          </p>
        )}
        {section.testimonials && section.testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {section.testimonials.map((testimonial: any, index: number) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                {testimonial.rating && (
                  <div className="mb-2">{"⭐".repeat(testimonial.rating)}</div>
                )}
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  {testimonial.avatar && (
                    <Image
                      src={getMediaUrl(testimonial.avatar)}
                      alt={testimonial.author || ""}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                      unoptimized
                    />
                  )}
                  <span className="font-semibold">{testimonial.author}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function CustomSection({ section }: SectionProps) {
  const imageUrl = section.image ? getMediaUrl(section.image) : null;

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: section.backgroundColor || "#ffffff",
        color: section.textColor || "#000000",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{section.title}</h2>
        {section.subtitle && (
          <p className="text-xl text-gray-600 mb-6">{section.subtitle}</p>
        )}
        {imageUrl && (
          <div className="relative h-96 mb-8">
            <Image
              src={imageUrl}
              alt={section.title || ""}
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
          </div>
        )}
        {section.content && (
          <div className="prose max-w-none">
            <p>{section.content}</p>
          </div>
        )}
        {section.buttonText && section.buttonLink && (
          <a
            href={section.buttonLink}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
          >
            {section.buttonText}
          </a>
        )}
      </div>
    </section>
  );
}

export function HomeSections({ sections }: { sections: any[] }) {
  console.log("sections---", sections);
  if (!sections || sections.length === 0) {
    return null;
  }

  // Sort sections by order
  const sortedSections = [...sections].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <>
      {sortedSections.map((section, index) => {
        const key = section.id || `section-${index}`;

        switch (section.sectionType) {
          case "hero":
            return <HeroSection key={key} section={section} />;
          case "about":
            return <AboutSection key={key} section={section} />;
          case "services":
            return <ServicesSection key={key} section={section} />;
          case "gallery":
            return <GallerySection key={key} section={section} />;
          case "testimonials":
            return <TestimonialsSection key={key} section={section} />;
          case "custom":
          default:
            return <CustomSection key={key} section={section} />;
        }
      })}
    </>
  );
}
