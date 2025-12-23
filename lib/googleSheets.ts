import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

interface FormData {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export async function sendToGoogleSheets(data: FormData): Promise<void> {
  if (
    !process.env.GOOGLE_SHEETS_ID ||
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY
  ) {
    console.warn(
      "Google Sheets credentials не налаштовані. Пропускаємо відправку."
    );
    return;
  }

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEETS_ID,
      serviceAccountAuth
    );

    await doc.loadInfo();

    const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Sheet1";
    let sheet = doc.sheetsByTitle[sheetName];

    if (!sheet) {
      sheet = await doc.addSheet({
        title: sheetName,
        headerValues: ["Ім'я", "Email", "Телефон", "Дата створення"],
      });
    } else {
      await sheet.loadHeaderRow();
    }

    await sheet.addRow({
      "Ім'я": data.name,
      Email: data.email,
      Телефон: data.phone,
      "Дата створення": new Date(data.createdAt).toLocaleString("uk-UA", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    });

    console.log("Дані успішно відправлені в Google Sheets");
  } catch (error) {
    console.error("Помилка відправки в Google Sheets:", error);
    throw error;
  }
}
