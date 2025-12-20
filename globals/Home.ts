import type { GlobalConfig } from "payload";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Домашня сторінка",
  admin: {
    description: "Налаштування домашньої сторінки та її секцій",
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
      name: "heroSection",
      type: "group",
      label: "Секція 'Hero'",
      admin: {
        description: "Налаштування головної секції",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "Заголовок hero секції",
          },
        },
        {
          name: "subtitle",
          type: "text",
          admin: {
            description: "Підзаголовок hero секції",
          },
        },
        {
          name: "buttonText",
          type: "text",
          admin: {
            description: "Текст першої кнопки",
          },
        },
        {
          name: "buttonLink",
          type: "text",
          admin: {
            description: "Посилання першої кнопки",
          },
        },
        {
          name: "button2Text",
          type: "text",
          admin: {
            description: "Текст другої кнопки",
          },
        },
        {
          name: "button2Link",
          type: "text",
          admin: {
            description: "Посилання другої кнопки",
          },
        },
      ],
    },
    {
      name: "aboutSection",
      type: "group",
      label: "Секція 'Про нас'",
      admin: {
        description: "Налаштування секції 'Про нас'",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "Заголовок секції 'Про нас'",
          },
        },
        {
          name: "aboutCards",
          type: "array",
          label: "Карточки про нас",
          minRows: 0,
          maxRows: 4,
          fields: [
            {
              name: "text",
              type: "text",
              required: true,
              admin: {
                description: "Текст карточки",
              },
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              admin: {
                description: "Зображення для карточки",
              },
            },
          ],
          admin: {
            description: "Додайте до 4 карточок для секції 'Про нас'",
          },
        },
      ],
    },
    {
      name: "servicesSection",
      type: "group",
      label: "Секція 'Послуги'",
      admin: {
        description: "Налаштування секції 'Послуги'",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "Заголовок секції 'Послуги'",
          },
        },
        {
          name: "number",
          type: "text",
          admin: {
            description: "Число для відображення (наприклад, '4')",
          },
        },
        {
          name: "serviceCards",
          type: "array",
          label: "Карточки послуг",
          minRows: 0,
          maxRows: 4,
          fields: [
            {
              name: "variant",
              type: "select",
              required: true,
              options: [
                { label: "Зелений", value: "green" },
                { label: "Жовтий", value: "yellow" },
                { label: "Помаранчевий", value: "orange" },
                { label: "Синій", value: "blue" },
              ],
              admin: {
                description: "Варіант кольору карточки",
              },
            },
            {
              name: "title",
              type: "text",
              required: true,
              admin: {
                description: "Назва табору (наприклад, 'Next Camp')",
              },
            },
            {
              name: "subtitle",
              type: "text",
              admin: {
                description: "Підзаголовок (наприклад, 'Весна')",
              },
            },
            {
              name: "content",
              type: "array",
              label: "Список пунктів",
              minRows: 0,
              fields: [
                {
                  name: "item",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Текст пункту списку",
                  },
                },
              ],
              admin: {
                description: "Додайте пункти списку для карточки",
              },
            },
            {
              name: "firstButtonText",
              type: "text",
              admin: {
                description: "Текст першої кнопки",
              },
            },
            {
              name: "firstButtonLink",
              type: "text",
              admin: {
                description: "Посилання першої кнопки",
              },
            },
            {
              name: "secondButtonText",
              type: "text",
              admin: {
                description: "Текст другої кнопки",
              },
            },
            {
              name: "secondButtonLink",
              type: "text",
              admin: {
                description: "Посилання другої кнопки",
              },
            },
          ],
          admin: {
            description: "Додайте до 4 карточок для секції 'Послуги'",
          },
        },
      ],
    },
    {
      name: "advantagesSection",
      type: "group",
      label: "Секція 'WOW-фішки'",
      admin: {
        description: "Налаштування секції 'WOW-фішки'",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "Заголовок секції 'WOW-фішки'",
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
          admin: {
            description: "Зображення для секції",
          },
        },
      ],
    },

    {
      name: "informationCampSection",
      type: "group",
      label: "Секція 'Next SPORTS + SKILLS'",
      admin: {
        description: "Налаштування секції 'Next SPORTS + SKILLS'",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description: "Заголовок секції",
          },
        },
        {
          name: "description",
          type: "textarea",
          admin: {
            description: "Опис секції",
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
          name: "sportsCard",
          type: "group",
          label: "Карточка 'NEXT SPORTS'",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              admin: {
                description:
                  "Заголовок карточки (наприклад, 'NEXT SPORTS' або 'SPORTS')",
              },
            },
            {
              name: "items",
              type: "array",
              label: "Список спортивних активностей",
              minRows: 0,
              fields: [
                {
                  name: "item",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Назва активності",
                  },
                },
              ],
              admin: {
                description: "Додайте спортивні активності",
              },
            },
          ],
        },
        {
          name: "skillsCard",
          type: "group",
          label: "Карточка 'NEXT SKILLS'",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              admin: {
                description: "Заголовок карточки (наприклад, 'NEXT SKILLS')",
              },
            },
            {
              name: "items",
              type: "array",
              label: "Список навичок",
              minRows: 0,
              fields: [
                {
                  name: "item",
                  type: "text",
                  required: true,
                  admin: {
                    description: "Назва навички",
                  },
                },
              ],
              admin: {
                description: "Додайте навички",
              },
            },
          ],
        },
      ],
    },
    {
      name: "aboutMentorSection",
      type: "group",
      label: "Секція 'Про ментора'",
      admin: {
        description: "Налаштування секції 'Про ментора'",
      },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: {
            description:
              "Заголовок секції (наприклад, 'Хто такий ментор на NEXT CAMP?')",
          },
        },
        {
          name: "titleHighlight",
          type: "text",
          admin: {
            description: "Виділена частина заголовка (наприклад, 'ментор')",
          },
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          admin: {
            description: "Основний текст опису ментора",
          },
        },
        {
          name: "descriptionHighlights",
          type: "text",
          admin: {
            description:
              "Слова/вирази для виділення в описі (через кому, наприклад: 'Це твоя людина в таборі, він надихає, універсальний друг-наставник')",
          },
        },
        {
          name: "highlightText",
          type: "textarea",
          admin: {
            description: "Виділений текст внизу секції",
          },
        },
        {
          name: "highlightTextHighlights",
          type: "text",
          admin: {
            description:
              "Слова/вирази для виділення в виділеному тексті (через кому, наприклад: 'NEXT CAMP = спорт + навички + ментори, що підтримують, Вони вчаться бути собою')",
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
      ],
    },
    {
      name: "sections",
      type: "array",
      label: "Інші секції",
      minRows: 0,
      admin: {
        description: "Додайте інші секції для домашньої сторінки",
      },
      fields: [
        {
          name: "sectionType",
          type: "select",
          required: true,
          options: [
            { label: "Галерея", value: "gallery" },
            { label: "Відгуки", value: "testimonials" },
            { label: "Контакти", value: "contacts" },
            { label: "Кастомна секція", value: "custom" },
          ],
          admin: {
            description: "Виберіть тип секції",
          },
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
            description: "Додайте зображення для галереї",
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
            description: "Додайте відгуки",
          },
        },
      ],
    },
  ],
};
