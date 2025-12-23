import { NextResponse } from "next/server";
import { sendToGoogleSheets } from "@/lib/googleSheets";

export async function GET() {
  try {
    // Check if environment variables are set
    const envCheck = {
      GOOGLE_SHEETS_ID: !!process.env.GOOGLE_SHEETS_ID,
      GOOGLE_SERVICE_ACCOUNT_EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY,
      GOOGLE_SHEETS_SHEET_NAME: process.env.GOOGLE_SHEETS_SHEET_NAME || "Sheet1 (default)",
    };

    // Try to send test data
    const testData = {
      name: "Test User",
      email: "test@example.com",
      phone: "+380123456789",
      createdAt: new Date().toISOString(),
    };

    try {
      await sendToGoogleSheets(testData);
      return NextResponse.json({
        success: true,
        message: "Test data sent successfully to Google Sheets",
        envCheck,
        testData,
      });
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Failed to send test data",
        error: error instanceof Error ? error.message : String(error),
        envCheck,
        testData,
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error in test endpoint",
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
}

