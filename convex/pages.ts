import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// PAGES

// Get all pages with optional filtering
export const getPages = query({
  args: {
    type: v.optional(v.string()),
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let pages;
    const type = args.type;
    const status = args.status;
    const limit = args.limit || 100;
    
    if (type) {
      pages = await ctx.db
        .query("pages")
        .withIndex("by_type", (q) => q.eq("type", type))
        .filter((q) => status ? q.eq(q.field("status"), status) : true)
        .order("desc")
        .take(limit);
    } else {
      pages = await ctx.db
        .query("pages")
        .filter((q) => status ? q.eq(q.field("status"), status) : true)
        .order("desc")
        .take(limit);
    }
    
    return pages;
  },
});

// Get single page by slug
export const getPageBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query("pages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    return page;
  },
});

// Get page by ID
export const getPageById = query({
  args: {
    pageId: v.id("pages"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.pageId);
  },
});

// Create page
export const createPage = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    type: v.string(),
    content: v.optional(v.string()),
    sections: v.optional(v.array(v.object({
      title: v.string(),
      content: v.optional(v.string()),
      layout: v.string(),
    }))),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const pageId = await ctx.db.insert("pages", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return pageId;
  },
});

// Update page
export const updatePage = mutation({
  args: {
    pageId: v.id("pages"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    type: v.optional(v.string()),
    content: v.optional(v.string()),
    sections: v.optional(v.array(v.object({
      title: v.string(),
      content: v.optional(v.string()),
      layout: v.string(),
    }))),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { pageId, ...updates } = args;
    await ctx.db.patch(pageId, {
      ...updates,
      updatedAt: Date.now(),
    });
    return pageId;
  },
});

// Delete page
export const deletePage = mutation({
  args: {
    pageId: v.id("pages"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.pageId);
    return true;
  },
});
