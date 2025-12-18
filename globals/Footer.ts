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
          label: "Номер телефону",
          admin: {
            description: "Номер телефону для контактів",
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
            description: "Telegram username або посилання (наприклад: @username або https://t.me/username)",
          },
        },
        {
          name: "instagram",
          type: "text",
          label: "Instagram",
          admin: {
            description: "Instagram username або посилання (наприклад: @username або https://instagram.com/username)",
          },
        },
      ],
    },
    {
      name: "copyright",
      type: "text",
      label: "Copyright текст",
      admin: {
        description: "Текст copyright (наприклад: © 2024 RUH Camp. Всі права захищені.)",
      },
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
    {
      name: "description",
      type: "textarea",
      label: "Опис",
      admin: {
        description: "Короткий опис проєкту для футера",
      },
    },
  ],
};

