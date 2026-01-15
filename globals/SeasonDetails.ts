import type { Field, GlobalConfig } from "payload";

function createSeasonFields(): Field[] {
  return [
    {
      name: "dateRange",
      type: "text",
      label: "Діапазон дат",
      admin: {
        description: "Діапазон дат (наприклад: 14.03 — 21.03)",
      },
    },
    {
      name: "announcements",
      type: "group",
      label: "Анонси",
      fields: [
        {
          name: "photoAnnouncement",
          type: "upload",
          relationTo: "media",
          label: "Фото анонс",
          admin: {
            description: "Фото анонс",
          },
        },
        {
          name: "videoAnnouncement",
          type: "upload",
          relationTo: "media",
          label: "Відео анонс",
          admin: {
            description: "Відео анонс",
          },
        },
      ],
    },
    {
      name: "packages",
      type: "group",
      label: "Пакети",
      fields: [
        {
          name: "silverPackage",
          type: "group",
          label: "Пакет Silver",
          fields: [
            {
              name: "price",
              type: "number",
              label: "Ціна пакету",
              admin: {
                description: "Ціна пакету",
              },
            },
            {
              name: "features",
              type: "array",
              label: "Особливості пакету",
              fields: [
                {
                  name: "feature",
                  type: "text",
                  required: true,
                  label: "Особливість",
                },
                {
                  name: "isBold",
                  type: "checkbox",
                  label: "Жирний текст",
                  defaultValue: false,
                  admin: {
                    description: "Відмітьте, щоб зробити текст жирним",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "goldPackage",
          type: "group",
          label: "Пакет Gold",
          fields: [
            {
              name: "price",
              type: "number",
              label: "Ціна пакету",
              admin: {
                description: "Ціна пакету",
              },
            },
            {
              name: "features",
              type: "array",
              label: "Особливості пакету",
              fields: [
                {
                  name: "feature",
                  type: "text",
                  required: true,
                  label: "Особливість",
                },
                {
                  name: "isBold",
                  type: "checkbox",
                  label: "Жирний текст",
                  defaultValue: false,
                  admin: {
                    description: "Відмітьте, щоб зробити текст жирним",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}

export const SeasonDetails: GlobalConfig = {
  slug: "season-details",
  label: "Деталі сезонів",
  admin: {
    description: "Редагування деталей для всіх сезонів табору",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "common",
      type: "group",
      label: "Спільні дані",
      admin: {
        description: "Дані, які використовуються для всіх сезонів",
      },
      fields: [
        {
          name: "buttons",
          type: "group",
          label: "Кнопки",
          fields: [
            {
              name: "aboutButtonText",
              type: "text",
              label: "Текст кнопки 'Про табір'",
              admin: {
                description: "Текст кнопки 'Про табір'",
              },
            },
            {
              name: "programButtonText",
              type: "text",
              label: "Текст кнопки 'Програма табору'",
              admin: {
                description: "Текст кнопки 'Програма табору'",
              },
            },
            {
              name: "registerButtonText",
              type: "text",
              label: "Текст кнопки реєстрації",
              admin: {
                description: "Текст кнопки реєстрації",
              },
            },
          ],
        },
        {
          name: "packages",
          type: "group",
          label: "Спільні дані пакетів",
          fields: [
            {
              name: "silverPackage",
              type: "group",
              label: "Пакет Silver",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Назва пакету",
                  admin: {
                    description: "Назва пакету",
                  },
                },
                {
                  name: "buttonText",
                  type: "text",
                  label: "Текст кнопки",
                  admin: {
                    description: "Текст кнопки",
                  },
                },
              ],
            },
            {
              name: "goldPackage",
              type: "group",
              label: "Пакет Gold",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Назва пакету",
                  admin: {
                    description: "Назва пакету",
                  },
                },
                {
                  name: "buttonText",
                  type: "text",
                  label: "Текст кнопки",
                  admin: {
                    description: "Текст кнопки",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "content",
          type: "group",
          label: "Контент",
          fields: [
            {
              name: "bookingConditionsTitle",
              type: "text",
              label: "Заголовок умов бронювання",
              admin: {
                description: "Заголовок умов бронювання",
              },
            },
            {
              name: "bookingConditionsParagraphs",
              type: "array",
              label: "Параграфи умов бронювання",
              admin: {
                description: "Додайте параграфи для умов бронювання",
              },
              fields: [
                {
                  name: "text",
                  type: "textarea",
                  required: true,
                  label: "Текст параграфа",
                },
              ],
            },
            {
              name: "additionalServicesTitle",
              type: "text",
              label: "Заголовок додаткових послуг",
              admin: {
                description: "Заголовок додаткових послуг",
              },
            },
            {
              name: "additionalServices",
              type: "array",
              label: "Додаткові послуги",
              fields: [
                {
                  name: "serviceName",
                  type: "text",
                  required: true,
                  label: "Назва послуги",
                  admin: {
                    description: "Назва послуги",
                  },
                },
                {
                  name: "servicePrice",
                  type: "number",
                  required: false,
                  label: "Ціна послуги",
                  admin: {
                    description: "Ціна послуги (необов'язкове поле)",
                  },
                },
              ],
            },
            {
              name: "contactTitle",
              type: "text",
              label: "Заголовок контактів",
              admin: {
                description: "Заголовок контактів",
              },
            },
            {
              name: "managers",
              type: "array",
              label: "Менеджери",
              fields: [
                {
                  name: "name",
                  type: "text",
                  required: true,
                  label: "Ім'я менеджера",
                  admin: {
                    description: "Ім'я менеджера",
                  },
                },
                {
                  name: "phone",
                  type: "text",
                  required: true,
                  label: "Телефон менеджера",
                  admin: {
                    description: "Телефон менеджера",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "весна",
      type: "group",
      label: "Весна",
      admin: {
        description: "Унікальні дані для весняного сезону",
      },
      fields: createSeasonFields(),
    },
    {
      name: "літо",
      type: "group",
      label: "Літо",
      admin: {
        description: "Унікальні дані для літнього сезону",
      },
      fields: createSeasonFields(),
    },
    {
      name: "осінь",
      type: "group",
      label: "Осінь",
      admin: {
        description: "Унікальні дані для осіннього сезону",
      },
      fields: createSeasonFields(),
    },
    {
      name: "зима",
      type: "group",
      label: "Зима",
      admin: {
        description: "Унікальні дані для зимового сезону",
      },
      fields: createSeasonFields(),
    },
  ],
};
