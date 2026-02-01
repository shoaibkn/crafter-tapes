import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Inquiries from contact form
  inquiries: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    message: v.string(),
    productInterest: v.optional(v.string()),
    quantity: v.optional(v.string()),
    status: v.string(), // 'new', 'contacted', 'qualified', 'closed'
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"])
    .index("by_created", ["createdAt"]),

  // Products
  products: defineTable({
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    shortDescription: v.string(),
    fullDescription: v.string(),
    features: v.array(v.string()),
    specifications: v.object({
      thickness: v.optional(v.string()),
      width: v.optional(v.string()),
      length: v.optional(v.string()),
      adhesive: v.optional(v.string()),
      material: v.optional(v.string()),
    }),
    applications: v.array(v.string()),
    certifications: v.array(v.string()),
    relatedProducts: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()), // Product image URL
    status: v.string(), // 'active', 'discontinued', 'coming-soon'
    featured: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_status", ["status"])
    .index("by_featured", ["featured"]),

  // Blog Posts
  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    author: v.string(),
    authorRole: v.optional(v.string()),
    date: v.string(),
    readTime: v.string(),
    tags: v.array(v.string()),
    imageUrl: v.optional(v.string()), // Blog post featured image URL
    status: v.string(), // 'draft', 'published', 'archived'
    featured: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_status", ["status"])
    .index("by_featured", ["featured"]),

  // Pages (About, Industries, Quality content)
  pages: defineTable({
    title: v.string(),
    slug: v.string(),
    type: v.string(), // 'about', 'industry', 'quality', 'custom'
    content: v.optional(v.string()),
    sections: v.optional(v.array(v.object({
      title: v.string(),
      content: v.optional(v.string()),
      layout: v.string(),
    }))),
    status: v.string(), // 'active', 'draft', 'archived'
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_type", ["type"])
    .index("by_status", ["status"]),

  // Industries
  industries: defineTable({
    id: v.string(),
    title: v.string(),
    shortDescription: v.string(),
    fullDescription: v.string(),
    applications: v.array(v.string()),
    products: v.array(v.string()),
    caseStudy: v.object({
      client: v.string(),
      challenge: v.string(),
      solution: v.string(),
      result: v.string(),
    }),
    order: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_industry_id", ["id"])
    .index("by_order", ["order"]),

  // Site Settings
  siteSettings: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
});
