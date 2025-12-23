interface FormData {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export async function sendToGoogleSheets(data: FormData): Promise<void> {
  console.log("Attempting to send data to Google Sheets:", {
    hasSheetsId: !!process.env.GOOGLE_SHEETS_ID,
    hasServiceEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
    data: { name: data.name, email: data.email, phone: data.phone },
  });

  if (
    !process.env.GOOGLE_SHEETS_ID ||
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_PRIVATE_KEY
  ) {
    console.warn(
      "Google Sheets credentials not configured. Skipping submission.",
      {
        GOOGLE_SHEETS_ID: !!process.env.GOOGLE_SHEETS_ID,
        GOOGLE_SERVICE_ACCOUNT_EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
      }
    );
    return;
  }

  try {
    console.log("Loading Google Sheets libraries...");
    // Dynamic imports to avoid webpack bundling issues
    const { GoogleSpreadsheet } = await import("google-spreadsheet");
    const { JWT } = await import("google-auth-library");

    console.log("Creating JWT authentication...");
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    console.log("Initializing Google Spreadsheet document...");
    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEETS_ID,
      serviceAccountAuth
    );

    console.log("Loading document info...");
    await doc.loadInfo();
    console.log("Document loaded:", doc.title);

    const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME || "Sheet1";
    console.log("Looking for sheet:", sheetName);
    let sheet = doc.sheetsByTitle[sheetName];

    if (!sheet) {
      console.log("Sheet not found, creating new sheet:", sheetName);
      sheet = await doc.addSheet({
        title: sheetName,
        headerValues: ["Ім'я", "Email", "Телефон", "Дата створення"],
      });
      console.log("New sheet created successfully");
    } else {
      console.log("Sheet found, checking if headers exist...");
      // Check if sheet is empty or has no headers
      await sheet.loadCells("A1:D1");
      const hasHeaders = sheet.getCell(0, 0).value || sheet.getCell(0, 1).value;
      
      if (!hasHeaders) {
        console.log("Sheet is empty, setting headers...");
        // Set headers manually
        sheet.setHeaderRow(["Ім'я", "Email", "Телефон", "Дата створення"]);
        await sheet.saveUpdatedCells();
        console.log("Headers set successfully");
      } else {
        console.log("Headers exist, loading header row...");
        try {
          await sheet.loadHeaderRow();
          console.log("Header row loaded");
        } catch (error) {
          console.log("Error loading header row, setting headers manually...");
          sheet.setHeaderRow(["Ім'я", "Email", "Телефон", "Дата створення"]);
          await sheet.saveUpdatedCells();
          console.log("Headers set manually");
        }
      }
    }

    console.log("Adding row to sheet...");
    await sheet.addRow({
      "Ім'я": data.name,
      Email: data.email,
      Телефон: data.phone,
      "Дата створення": new Date(data.createdAt).toLocaleString("uk-UA", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    });

    console.log("✅ Data successfully sent to Google Sheets");
  } catch (error) {
    console.error("❌ Error sending to Google Sheets:", error);
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
