import config from "@payload-config";
import { getPayload } from "payload";
import type { Payload } from "payload";

let cachedPayload: Payload | null = null;

async function getPayloadInstance(): Promise<Payload> {
  if (cachedPayload) {
    return cachedPayload;
  }

  try {
    cachedPayload = await getPayload({ config });
    return cachedPayload;
  } catch (error) {
    console.error("Payload initialization error:", error);
    throw error;
  }
}

export async function createFormSubmission(data: {
  name: string;
  email: string;
  phone: string;
}) {
  try {
    const payload = await getPayloadInstance();
    
    const result = await payload.create({
      collection: "form-submissions",
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });

    return result;
  } catch (error) {
    console.error("Error creating record via Payload:", error);
    
    // Detailed logging
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    }
    
    throw error;
  }
}

