import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "status", "updatedAt"],
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
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "About Page", value: "about" },
        { label: "Industries Page", value: "industry" },
        { label: "Quality Page", value: "quality" },
        { label: "Custom Page", value: "custom" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "heroSection",
      type: "group",
      label: "Hero Section",
      fields: [
        {
          name: "enabled",
          type: "checkbox",
          defaultValue: true,
          label: "Show Hero Section",
        },
        {
          name: "title",
          type: "text",
          label: "Hero Title",
        },
        {
          name: "subtitle",
          type: "textarea",
          label: "Hero Subtitle",
        },
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          label: "Background Image",
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      label: "Page Content",
    },
    {
      name: "sections",
      type: "array",
      label: "Content Sections",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          label: "Section Title",
        },
        {
          name: "content",
          type: "richText",
          label: "Section Content",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Section Image",
        },
        {
          name: "layout",
          type: "select",
          defaultValue: "content-left",
          options: [
            { label: "Content Left, Image Right", value: "content-left" },
            { label: "Image Left, Content Right", value: "image-left" },
            { label: "Full Width Content", value: "full-content" },
            { label: "Image Grid", value: "image-grid" },
          ],
        },
      ],
    },
    {
      name: "certifications",
      type: "array",
      label: "Certifications (for Quality page)",
      admin: {
        condition: (data) => data.type === "quality",
      },
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          label: "Certification Name",
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
        },
        {
          name: "logo",
          type: "upload",
          relationTo: "media",
          label: "Certification Logo",
        },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Draft", value: "draft" },
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
