import Image from "next/image";
import { getMediaUrl } from "@/lib/payload";
import { extractTextFromLexical } from "@/lib/utils";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function CustomSection({ section, id }: SectionProps) {
  const imageUrl = section.image ? getMediaUrl(section.image) : null;

  return (
    <section
      id={id}
      className="py-16"
      style={{
        backgroundColor: (section.backgroundColor as string) || "#ffffff",
        color: (section.textColor as string) || "#000000",
      }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{section.title as string}</h2>
        {section.subtitle && (
          <p className="text-xl text-gray-600 mb-6">{section.subtitle as string}</p>
        )}
        {imageUrl && (
          <div className="relative h-96 mb-8">
            <Image
              src={imageUrl}
              alt={(section.title as string) || ""}
              fill
              className="object-cover rounded-lg"
              unoptimized
            />
          </div>
        )}
        {section.content && (
          <div className="prose max-w-none">
            <p>{extractTextFromLexical(section.content)}</p>
          </div>
        )}
        {section.buttonText && section.buttonLink && (
          <a
            href={section.buttonLink as string}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-6"
          >
            {section.buttonText as string}
          </a>
        )}
      </div>
    </section>
  );
}

