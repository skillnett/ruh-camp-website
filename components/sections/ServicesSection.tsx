import Image from "next/image";
import { getMediaUrl } from "@/lib/payload";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function ServicesSection({ section, id }: SectionProps) {
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {section.title as string}
        </h2>
        {section.subtitle && (
          <p className="text-xl text-center text-gray-600 mb-12">
            {section.subtitle as string}
          </p>
        )}
        {section.services && Array.isArray(section.services) && section.services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {section.services.map((service: unknown, index: number) => {
              const serviceData = service as Record<string, unknown>;
              return (
                <div key={index} className="text-center">
                  {serviceData.icon && (
                    <div className="mb-4">
                      <Image
                        src={getMediaUrl(serviceData.icon)}
                        alt={(serviceData.title as string) || ""}
                        width={64}
                        height={64}
                        className="mx-auto"
                        unoptimized
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{serviceData.title as string}</h3>
                  {serviceData.description && (
                    <p className="text-gray-600">{serviceData.description as string}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

