import {
  AboutSection,
  CustomSection,
  GallerySection,
  HeroSection,
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
  sections,
}: {
  heroSection?: Record<string, unknown>;
  aboutSection?: Record<string, unknown>;
  sections: Section[];
}) {
  console.log("heroSection---", heroSection);
  console.log("aboutSection---", aboutSection);
  console.log("sections---", sections);

  // Map sectionType to sectionId for navigation
  const getSectionId = (section: Section): string => {
    if (section.id) return section.id;
    const typeToId: Record<string, string> = {
      services: "services",
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
      {/* Other sections */}
      {sortedSections.map((section, index) => {
        const key = section.id || `section-${index}`;
        const sectionId = getSectionId(section);

        switch (section.sectionType || "custom") {
          case "services":
            return (
              <ServicesSection key={key} section={section} id={sectionId} />
            );
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
