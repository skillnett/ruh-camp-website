import {
  AboutSection,
  AdvantagesSection,
  CustomSection,
  GallerySection,
  HeroSection,
  InformationCampSection,
  ServicesSection,
  TestimonialsSection,
} from "@/components/sections";

interface Section {
  id?: string;
  order?: number;
  sectionType?: string;
  [key: string]: unknown;
}

export function HomePage({
  heroSection,
  aboutSection,
  servicesSection,
  advantagesSection,
  informationCampSection,
  sections,
}: {
  heroSection?: Record<string, unknown>;
  aboutSection?: Record<string, unknown>;
  servicesSection?: Record<string, unknown>;
  advantagesSection?: Record<string, unknown>;
  informationCampSection?: Record<string, unknown>;
  sections: Section[];
}) {
  console.log("heroSection---", heroSection);
  console.log("aboutSection---", aboutSection);
  console.log("servicesSection---", servicesSection);
  console.log("advantagesSection---", advantagesSection);
  console.log("informationCampSection---", informationCampSection);
  console.log("sections---", sections);

  // Map sectionType to sectionId for navigation
  const getSectionId = (section: Section): string => {
    if (section.id) return section.id;
    const typeToId: Record<string, string> = {
      gallery: "gallery",
      testimonials: "testimonials",
      contacts: "contacts",
    };
    return (
      typeToId[section.sectionType || ""] || `section-${section.order || 0}`
    );
  };

  // Sort sections by order
  const sortedSections = [...sections].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <>
      {/* Hero section is always first */}
      {heroSection && <HeroSection section={heroSection} id="hero" />}
      {/* About section */}
      {aboutSection && <AboutSection section={aboutSection} id="about" />}
      {/* Services section */}
      {servicesSection && (
        <ServicesSection section={servicesSection} id="services" />
      )}
      {/* Advantages section */}
      {advantagesSection && (
        <AdvantagesSection section={advantagesSection} id="advantages" />
      )}
      {/* Information Camp section */}
      {informationCampSection && (
        <InformationCampSection
          section={informationCampSection}
          id="information-camp"
        />
      )}
      {/* Other sections */}
      {sortedSections.map((section, index) => {
        const key = section.id || `section-${index}`;
        const sectionId = getSectionId(section);

        switch (section.sectionType || "custom") {
          case "gallery":
            return (
              <GallerySection key={key} section={section} id={sectionId} />
            );
          case "testimonials":
            return (
              <TestimonialsSection key={key} section={section} id={sectionId} />
            );
          case "contacts":
            return <CustomSection key={key} section={section} id={sectionId} />;
          case "custom":
          default:
            return <CustomSection key={key} section={section} id={sectionId} />;
        }
      })}
    </>
  );
}
