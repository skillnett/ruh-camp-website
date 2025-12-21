import {
  AboutMentorSection,
  AboutSection,
  AdvantagesSection,
  GuestsSection,
  HeroSection,
  InformationCampSection,
  ServicesSection,
} from "@/components/sections";

export function HomePage({
  heroSection,
  aboutSection,
  aboutMentorSection,
  guestsSection,
  servicesSection,
  advantagesSection,
  informationCampSection,
}: {
  heroSection?: Record<string, unknown>;
  aboutSection?: Record<string, unknown>;
  aboutMentorSection?: Record<string, unknown>;
  guestsSection?: Record<string, unknown>;
  servicesSection?: Record<string, unknown>;
  advantagesSection?: Record<string, unknown>;
  informationCampSection?: Record<string, unknown>;
}) {
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
      {/* About Mentor section */}
      {aboutMentorSection && (
        <AboutMentorSection section={aboutMentorSection} id="about-mentor" />
      )}
      {/* Guests section */}
      {guestsSection && <GuestsSection section={guestsSection} id="guests" />}
    </>
  );
}
