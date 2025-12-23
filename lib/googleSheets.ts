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
      "Google Sheets credentials not configured. Skipping submission."
    );
    return;
  }

  try {
    // Dynamic imports to avoid webpack bundling issues
    const { GoogleSpreadsheet } = await import("google-spreadsheet");
    const { JWT } = await import("google-auth-library");

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

    console.log("Data successfully sent to Google Sheets");
  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    throw error;
  }
}
