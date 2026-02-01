import type { CollectionConfig } from "payload";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedDate", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 300,
      label: "Post Excerpt",
    },
    {
      name: "content",
      type: "richText",
      required: true,
      label: "Post Content",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Featured Image",
    },
    {
      name: "author",
      type: "text",
      required: true,
      defaultValue: "Crafter Tapes Team",
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Industry News", value: "industry-news" },
        { label: "Product Updates", value: "product-updates" },
        { label: "Technical Insights", value: "technical-insights" },
        { label: "Company News", value: "company-news" },
        { label: "Tips & Guides", value: "tips-guides" },
      ],
    },
    {
      name: "tags",
      type: "array",
      label: "Tags",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "meta",
      type: "group",
      label: "SEO Metadata",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Meta Title",
        },
        {
          name: "description",
          type: "textarea",
          label: "Meta Description",
        },
      ],
    },
  ],
};
