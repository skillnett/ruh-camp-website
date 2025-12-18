import type { CollectionConfig } from "payload";

export const HomePage: CollectionConfig = {
  slug: "home-page",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "Заголовок сторінки",
      },
    },
    {
      name: "metaDescription",
      type: "text",
      admin: {
        description: "Мета-опис для SEO",
      },
    },
    {
      name: "sections",
      type: "array",
      label: "Секції",
      minRows: 1,
      fields: [
        {
          name: "sectionType",
          type: "select",
          required: true,
          options: [
            { label: "Герой (Hero)", value: "hero" },
            { label: "Про нас", value: "about" },
            { label: "Послуги", value: "services" },
            { label: "Галерея", value: "gallery" },
            { label: "Відгуки", value: "testimonials" },
            { label: "Контакти", value: "contacts" },
            { label: "Кастомна секція", value: "custom" },
          ],
        },
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "Заголовок секції",
          },
        },
        {
          name: "subtitle",
          type: "text",
          admin: {
            description: "Підзаголовок секції",
          },
        },
        {
          name: "content",
          type: "richText",
          admin: {
            description: "Основний контент секції",
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Зображення для секції",
          },
        },
        {
          name: "images",
          type: "array",
          label: "Галерея зображень",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "caption",
              type: "text",
            },
          ],
          admin: {
            condition: (data) => data.sectionType === "gallery",
          },
        },
        {
          name: "services",
          type: "array",
          label: "Список послуг",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
            },
            {
              name: "icon",
              type: "upload",
              relationTo: "media",
            },
          ],
          admin: {
            condition: (data) => data.sectionType === "services",
          },
        },
        {
          name: "testimonials",
          type: "array",
          label: "Відгуки",
          fields: [
            {
              name: "author",
              type: "text",
              required: true,
            },
            {
              name: "text",
              type: "textarea",
              required: true,
            },
            {
              name: "rating",
              type: "number",
              min: 1,
              max: 5,
            },
            {
              name: "avatar",
              type: "upload",
              relationTo: "media",
            },
          ],
          admin: {
            condition: (data) => data.sectionType === "testimonials",
          },
        },
        {
          name: "buttonText",
          type: "text",
          admin: {
            description: "Текст кнопки (якщо потрібна)",
          },
        },
        {
          name: "buttonLink",
          type: "text",
          admin: {
            description: "Посилання кнопки",
          },
        },
        {
          name: "backgroundColor",
          type: "text",
          admin: {
            description: "Колір фону (hex код, наприклад #ffffff)",
          },
        },
        {
          name: "textColor",
          type: "text",
          admin: {
            description: "Колір тексту (hex код)",
          },
        },
        {
          name: "order",
          type: "number",
          admin: {
            description: "Порядок відображення секції",
          },
          defaultValue: 0,
        },
      ],
    },
  ],
};

