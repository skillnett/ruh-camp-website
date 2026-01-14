// Server-only function to get header data using direct Payload instance
// This avoids REST API limitation of not returning empty/null fields
import config from "@payload-config";
import { getPayload } from "payload";

let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null;

async function getPayloadInstance() {
  if (cachedPayload) {
    return cachedPayload;
  }
  cachedPayload = await getPayload({ config });
  return cachedPayload;
}

export async function getHeader() {
  try {
    const payload = await getPayloadInstance();

    const headerData = await payload.findGlobal({
      slug: "header",
      depth: 2,
    });

    if (!headerData) {
      return null;
    }

    return {
      phone: (headerData as { phone?: string | null }).phone || null,
      menu: (headerData as {
        menu?: Array<{
          label: string;
          url?: string | null;
          anchor?: string | null;
          id?: string | null;
        }> | null;
      }).menu || null,
    };
  } catch (error) {
    console.error("Error fetching header:", error);
    return null;
  }
}
