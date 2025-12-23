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
        // Send data to Google Sheets only when creating a new record
        if (operation === "create") {
          try {
            const { sendToGoogleSheets } = await import("../lib/googleSheets");
            await sendToGoogleSheets({
              name: doc.name,
              email: doc.email,
              phone: doc.phone,
              createdAt: doc.createdAt || new Date().toISOString(),
            });
          } catch (error) {
            console.error("Error sending to Google Sheets:", error);
            // Don't throw error to avoid blocking database save
          }
        }
      },
    ],
  },
};

