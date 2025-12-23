import { ContactForm } from "@/components/ui/ContactForm";
import { TitleH2 } from "@/components/ui/TitleH2";

interface ContactFormSectionProps {
  section?: {
    title?: string;
    description?: string;
  };
  id?: string;
}

export function ContactFormSection({ section, id }: ContactFormSectionProps) {
  return (
    <section id={id} className="py-12 lg:py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {section?.title && (
            <TitleH2 className="text-center mb-4 text-white">
              {section.title}
            </TitleH2>
          )}
          {section?.description && (
            <p className="text-center text-white/80 mb-8 lg:mb-12 text-lg lg:text-xl">
              {section.description}
            </p>
          )}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-6 lg:p-10 border border-white/10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

