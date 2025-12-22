import type { GlobalConfig } from "payload";

export const Header: GlobalConfig = {
  slug: "header",
  label: "Хедер",
  admin: {
    description: "Налаштування хедера та навігаційного меню",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "menu",
      type: "array",
      label: "Меню навігації",
      admin: {
        description:
          "Додайте пункти меню. Якщо вказано посилання (url), воно матиме пріоритет. Якщо url відсутнє, використовується якір (anchor). Посилання може бути як внутрішнім (/blog, /about), так і зовнішнім (https://example.com).",
      },
      fields: [
        {
          name: "label",
          type: "text",
          label: "Назва пункту меню",
          required: true,
          admin: {
            description: "Текст, який відображається в меню",
          },
        },
        {
          name: "url",
          type: "text",
          label: "Посилання",
          admin: {
            description:
              "Посилання на сторінку (наприклад: /blog, /about) або зовнішнє посилання (https://example.com). Якщо вказано, матиме пріоритет над якірем.",
            condition: (_, siblingData) => !siblingData?.anchor,
          },
        },
        {
          name: "anchor",
          type: "select",
          label: "Якір (ID секції)",
          admin: {
            description:
              "Виберіть ID секції для якоря. Використовується, якщо не вказано посилання.",
            condition: (_, siblingData) => !siblingData?.url,
          },
          options: [
            {
              label: "Hero",
              value: "hero",
            },
            {
              label: "Про нас",
              value: "about",
            },
            {
              label: "Послуги",
              value: "services",
            },
            {
              label: "WOW-фішки",
              value: "advantages",
            },
            {
              label: "Next SPORTS + SKILLS",
              value: "information-camp",
            },
            {
              label: "Про ментора",
              value: "about-mentor",
            },
            {
              label: "Зіркові гості",
              value: "guests",
            },
            {
              label: "Футер",
              value: "footer",
            },
          ],
        },
      ],
    },
  ],
};
