import Image from "next/image";
import { getMediaUrl } from "@/lib/payload";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function GallerySection({ section, id }: SectionProps) {
  const galleryImages: Array<{ image: unknown; caption?: string }> = [];
  
  if (section.images && Array.isArray(section.images) && section.images.length > 0) {
    section.images.forEach((item: unknown) => {
      const itemData = item as Record<string, unknown>;
      if (itemData.image) {
        galleryImages.push({
          image: itemData.image,
          caption: itemData.caption as string | undefined,
        });
      }
    });
  }
  
  if (galleryImages.length === 0 && section.image) {
    galleryImages.push({
      image: section.image,
      caption: undefined,
    });
  }

  return (
    <section
      id={id}
      className="py-16"
      style={{
        backgroundColor: (section.backgroundColor as string) || "#f9fafb",
        color: (section.textColor as string) || "#000000",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {section.title as string}
        </h2>
        {section.subtitle && (
          <p className="text-xl text-center text-gray-600 mb-12">
            {section.subtitle as string}
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
                    alt={item.caption || (section.title as string) || ""}
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

