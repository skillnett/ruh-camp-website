import Image from "next/image";
import { getMediaUrl } from "@/lib/payload";
import { extractTextFromLexical } from "@/lib/utils";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function AboutSection({ section, id }: SectionProps) {
  const imageUrl = section.image ? getMediaUrl(section.image) : null;

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {imageUrl && (
            <div className="relative h-96">
              <Image
                src={imageUrl}
                alt={(section.title as string) || ""}
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>
          )}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {section.title as string}
            </h2>
            {section.subtitle && (
              <p className="text-xl text-gray-600 mb-6">{section.subtitle as string}</p>
            )}
            {section.content && (
              <div className="prose max-w-none">
                <p>{extractTextFromLexical(section.content)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

