import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// PRODUCTS

// Get all products with optional filtering
export const getProducts = query({
  args: {
    category: v.optional(v.string()),
    status: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let products;
    const category = args.category;
    const status = args.status;
    const featured = args.featured;
    const limit = args.limit || 100;
    
    if (category) {
      products = await ctx.db
        .query("products")
        .withIndex("by_category", (q) => q.eq("category", category))
        .filter((q) => status ? q.eq(q.field("status"), status) : true)
        .order("desc")
        .take(limit);
    } else if (featured) {
      products = await ctx.db
        .query("products")
        .withIndex("by_featured", (q) => q.eq("featured", true))
        .filter((q) => status ? q.eq(q.field("status"), status) : true)
        .order("desc")
        .take(limit);
    } else {
      products = await ctx.db
        .query("products")
        .filter((q) => status ? q.eq(q.field("status"), status) : true)
        .order("desc")
        .take(limit);
    }
    
    return products;
  },
});

// Get single product by slug
export const getProductBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    return product;
  },
});

// Get product by ID
export const getProductById = query({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.productId);
  },
});

// Create product
export const createProduct = mutation({
  args: {
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
    status: v.string(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const productId = await ctx.db.insert("products", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return productId;
  },
});

// Update product
export const updateProduct = mutation({
  args: {
    productId: v.id("products"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    category: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    fullDescription: v.optional(v.string()),
    features: v.optional(v.array(v.string())),
    specifications: v.optional(v.object({
      thickness: v.optional(v.string()),
      width: v.optional(v.string()),
      length: v.optional(v.string()),
      adhesive: v.optional(v.string()),
      material: v.optional(v.string()),
    })),
    applications: v.optional(v.array(v.string())),
    certifications: v.optional(v.array(v.string())),
    relatedProducts: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
    status: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { productId, ...updates } = args;
    await ctx.db.patch(productId, {
      ...updates,
      updatedAt: Date.now(),
    });
    return productId;
  },
});

// Delete product
export const deleteProduct = mutation({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.productId);
    return true;
  },
});
