import type { CollectionConfig } from "payload";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "publishedAt", "status"],
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
        description: "Заголовок статті",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-адреса статті (наприклад: my-article)",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            }
            return value;
          },
        ],
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        description: "Автор статті",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        description: "Дата публікації",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Чернетка", value: "draft" },
        { label: "Опубліковано", value: "published" },
        { label: "Архів", value: "archived" },
      ],
      admin: {
        description: "Статус статті",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Головне зображення статті",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: {
        description: "Короткий опис статті (для превью)",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      admin: {
        description: "Основний контент статті",
      },
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "blog-categories",
      hasMany: true,
      admin: {
        description: "Категорії статті",
      },
    },
    {
      name: "tags",
      type: "array",
      label: "Теги",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "Теги для статті",
      },
    },
    {
      name: "metaTitle",
      type: "text",
      admin: {
        description: "SEO заголовок (якщо відрізняється від основного)",
      },
    },
    {
      name: "metaDescription",
      type: "textarea",
      admin: {
        description: "SEO опис",
      },
    },
    {
      name: "readTime",
      type: "number",
      admin: {
        description: "Час читання в хвилинах (заповнюється автоматично або вручну)",
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" && !data.publishedAt && data.status === "published") {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
};

