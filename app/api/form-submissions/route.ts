import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Валідація даних
    if (!name || !email || !phone) {
      return NextResponse.json(
        { message: "Всі поля обов'язкові для заповнення" },
        { status: 400 }
      );
    }

    // Валідація email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Невірний формат email" },
        { status: 400 }
      );
    }

    // Відправляємо дані в Payload CMS
    // Використовуємо внутрішній API Payload
    const payloadUrl =
      process.env.NEXT_PUBLIC_PAYLOAD_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";
    
    const response = await fetch(`${payloadUrl}/api/form-submissions`, {
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
      const errorData = await response.json();
      throw new Error(errorData.message || "Помилка збереження даних");
    }

    const data = await response.json();

    return NextResponse.json(
      { message: "Дані успішно збережено", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Помилка обробки форми:", error);
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

