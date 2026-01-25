import config from "@payload-config";
import { getPayload } from "payload";

let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null;

async function getPayloadInstance() {
  if (cachedPayload) return cachedPayload;
  cachedPayload = await getPayload({ config });
  return cachedPayload;
}

export async function getFooter() {
  try {
    const payload = await getPayloadInstance();
    const data = await payload.findGlobal({ slug: "footer", depth: 2 });
    if (!data) return null;

    const raw = data as {
      contactInfo?: {
        phone?: string | null;
        phone2?: string | null;
        email?: string | null;
        telegram?: string | null;
        instagram?: string | null;
        tiktok?: string | null;
      } | null;
      additionalLinks?: Array<{ label: string; url: string }> | null;
    };

    return {
      contactInfo: raw.contactInfo
        ? {
            phone: raw.contactInfo.phone ?? undefined,
            phone2: raw.contactInfo.phone2 ?? undefined,
            email: raw.contactInfo.email ?? undefined,
            telegram: raw.contactInfo.telegram ?? undefined,
            instagram: raw.contactInfo.instagram ?? undefined,
            tiktok: raw.contactInfo.tiktok ?? undefined,
          }
        : null,
      additionalLinks: raw.additionalLinks ?? null,
    };
  } catch (e) {
    console.error("Error fetching footer:", e);
    return null;
  }
}
