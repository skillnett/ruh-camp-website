import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Футер",
  admin: {
    description: "Налаштування футера та контактної інформації",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "contactInfo",
      type: "group",
      label: "Контактна інформація",
      fields: [
        {
          name: "phone",
          type: "text",
          label: "Номер телефону 1",
          admin: {
            description: "Перший номер телефону для контактів",
          },
        },
        {
          name: "phone2",
          type: "text",
          label: "Номер телефону 2",
          admin: {
            description: "Другий номер телефону (необовʼязково)",
          },
        },
        {
          name: "email",
          type: "email",
          label: "Електронна пошта",
          admin: {
            description: "Email адреса",
          },
        },
        {
          name: "telegram",
          type: "text",
          label: "Telegram",
          admin: {
            description:
              "Telegram username або посилання (наприклад: @username або https://t.me/username)",
          },
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram",
          admin: {
            description:
              "Instagram username або посилання (наприклад: @username або https://instagram.com/username)",
          },
        },
      ],
    },
    {
      name: "additionalLinks",
      type: "array",
      label: "Додаткові посилання",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
