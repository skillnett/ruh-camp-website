import config from "@payload-config";
import { getPayload } from "payload";

let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null;

async function getPayloadInstance() {
  if (cachedPayload) return cachedPayload;
  cachedPayload = await getPayload({ config });
  return cachedPayload;
}

export async function getHomePage() {
  try {
    const payload = await getPayloadInstance();
    const data = await payload.findGlobal({ slug: "home", depth: 3 });
    if (!data) return null;

    const raw = data as {
      title?: string;
      metaDescription?: string | null;
      heroSection?: Record<string, unknown> | null;
      aboutSection?: Record<string, unknown> | null;
      aboutMentorSection?: Record<string, unknown> | null;
      guestsSection?: Record<string, unknown> | null;
      servicesSection?: {
        title?: string;
        titleColor?: string | null;
        number?: string | null;
        serviceCards?: Array<{
          variant?: string;
          title?: string;
          subtitle?: string | null;
          content?: Array<{ item: string }> | null;
          firstButtonText?: string | null;
          firstButtonLink?: string | null;
          secondButtonText?: string | null;
          disabled?: boolean | null;
        }> | null;
      } | null;
      advantagesSection?: Record<string, unknown> | null;
      informationCampSection?: Record<string, unknown> | null;
    };

    const servicesSection = raw.servicesSection;
    let normalizedServicesSection: Record<string, unknown> | undefined;

    if (servicesSection) {
      const cards = servicesSection.serviceCards;
      normalizedServicesSection = {
        ...servicesSection,
        serviceCards: Array.isArray(cards)
          ? cards.map((item) => ({
              ...item,
              disabled: item.disabled === true,
            }))
          : [],
      };
    }

    return {
      title: raw.title ?? "",
      metaDescription: raw.metaDescription ?? undefined,
      heroSection: raw.heroSection ?? undefined,
      aboutSection: raw.aboutSection ?? undefined,
      aboutMentorSection: raw.aboutMentorSection ?? undefined,
      guestsSection: raw.guestsSection ?? undefined,
      servicesSection: normalizedServicesSection ?? raw.servicesSection ?? undefined,
      advantagesSection: raw.advantagesSection ?? undefined,
      informationCampSection: raw.informationCampSection ?? undefined,
    };
  } catch (e) {
    console.error("Error fetching home page:", e);
    return null;
  }
}
