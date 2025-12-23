import { NextRequest, NextResponse } from "next/server";
import { createFormSubmission } from "@/lib/createFormSubmission";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Validate data
    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: "Всі поля обов'язкові для заповнення" },
        { status: 400 }
      );
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Невірний формат email" },
        { status: 400 }
      );
    }

    // Use direct Payload API call
    try {
      const data = await createFormSubmission({ name, email, phone });

      return NextResponse.json(
        { message: "Дані успішно збережено", data },
        { status: 200 }
      );
    } catch (payloadError) {
      console.error("Payload API error:", payloadError);
      
      // If direct call failed, try HTTP fallback
      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
        "http://localhost:3000";
      
      const payloadApiUrl = `${baseUrl}/api/form-submissions`;
      
      console.log("Attempting HTTP fallback:", payloadApiUrl);
      
      const response = await fetch(payloadApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Помилка збереження даних";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.errors?.[0]?.message || errorMessage;
          console.error("Payload API HTTP error:", errorData);
        } catch {
          const errorText = await response.text();
          console.error("Payload API HTTP error (text):", errorText);
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const httpData = await response.json();

      return NextResponse.json(
        { message: "Дані успішно збережено", data: httpData },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Form processing error:", error);
    
    // Detailed logging for diagnostics
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
      });
    }
    
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Сталася помилка при обробці форми",
      },
      { status: 500 }
    );
  }
}

