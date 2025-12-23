import type { CollectionConfig } from "payload";

export const FormSubmissions: CollectionConfig = {
  slug: "form-submissions",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "phone", "createdAt"],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Ім'я користувача",
      },
    },
    {
      name: "email",
      type: "email",
      required: true,
      admin: {
        description: "Email адреса",
      },
    },
    {
      name: "phone",
      type: "text",
      required: true,
      admin: {
        description: "Номер телефону",
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        console.log("FormSubmissions afterChange hook triggered:", {
          operation,
          docId: doc.id,
          name: doc.name,
        });
        
        // Send data to Google Sheets only when creating a new record
        if (operation === "create") {
          console.log("Creating new record, attempting to send to Google Sheets...");
          try {
            const { sendToGoogleSheets } = await import("../lib/googleSheets");
            await sendToGoogleSheets({
              name: doc.name,
              email: doc.email,
              phone: doc.phone,
              createdAt: doc.createdAt || new Date().toISOString(),
            });
            console.log("✅ Successfully sent to Google Sheets from hook");
          } catch (error) {
            console.error("❌ Error sending to Google Sheets from hook:", error);
            // Don't throw error to avoid blocking database save
          }
        } else {
          console.log("Operation is not 'create', skipping Google Sheets submission");
        }
      },
    ],
  },
};

