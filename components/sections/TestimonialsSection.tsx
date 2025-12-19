import Image from "next/image";
import { getMediaUrl } from "@/lib/payload";

interface SectionProps {
  section: Record<string, unknown>;
  id?: string;
}

export function TestimonialsSection({ section, id }: SectionProps) {
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
        {section.testimonials && Array.isArray(section.testimonials) && section.testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {section.testimonials.map((testimonial: unknown, index: number) => {
              const testimonialData = testimonial as Record<string, unknown>;
              return (
                <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                  {testimonialData.rating && (
                    <div className="mb-2">{"⭐".repeat(testimonialData.rating as number)}</div>
                  )}
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonialData.text as string}"
                  </p>
                  <div className="flex items-center">
                    {testimonialData.avatar && (
                      <Image
                        src={getMediaUrl(testimonialData.avatar)}
                        alt={(testimonialData.author as string) || ""}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                        unoptimized
                      />
                    )}
                    <span className="font-semibold">{testimonialData.author as string}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

