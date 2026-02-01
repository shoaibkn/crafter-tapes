import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "status", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Product Name",
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
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Packaging Tapes", value: "packaging-tapes" },
        { label: "Specialty Adhesive Tapes", value: "specialty-tapes" },
        { label: "Protective Films", value: "protective-films" },
        { label: "Custom Solutions", value: "custom-solutions" },
        { label: "Other Packaging Materials", value: "other-materials" },
      ],
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
      maxLength: 200,
      label: "Short Description",
    },
    {
      name: "fullDescription",
      type: "richText",
      label: "Full Description",
    },
    {
      name: "features",
      type: "array",
      label: "Product Features",
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "specifications",
      type: "group",
      label: "Technical Specifications",
      fields: [
        {
          name: "thickness",
          type: "text",
          label: "Thickness",
        },
        {
          name: "width",
          type: "text",
          label: "Width Options",
        },
        {
          name: "length",
          type: "text",
          label: "Length Options",
        },
        {
          name: "adhesive",
          type: "text",
          label: "Adhesive Type",
        },
        {
          name: "material",
          type: "text",
          label: "Backing Material",
        },
      ],
    },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      label: "Product Images",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
      label: "Featured Image",
    },
    {
      name: "applications",
      type: "array",
      label: "Applications / Use Cases",
      fields: [
        {
          name: "application",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "industries",
      type: "relationship",
      relationTo: "pages",
      hasMany: true,
      filterOptions: {
        type: {
          equals: "industry",
        },
      },
      label: "Related Industries",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Discontinued", value: "discontinued" },
        { label: "Coming Soon", value: "coming-soon" },
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
