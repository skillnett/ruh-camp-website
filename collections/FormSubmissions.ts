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
        // Відправляємо дані в Google Sheets тільки при створенні нового запису
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
            console.error("Помилка відправки в Google Sheets:", error);
            // Не викидаємо помилку, щоб не блокувати збереження в базу
          }
        }
      },
    ],
  },
};

