import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// INDUSTRIES

// Get all industries
export const getIndustries = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const industries = await ctx.db
      .query("industries")
      .withIndex("by_order", (q) => q)
      .order("asc")
      .take(args.limit || 100);
    
    return industries;
  },
});

// Get single industry by ID
export const getIndustryById = query({
  args: {
    industryId: v.id("industries"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.industryId);
  },
});

// Get industry by string ID
export const getIndustryByStringId = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const industry = await ctx.db
      .query("industries")
      .withIndex("by_industry_id", (q) => q.eq("id", args.id))
      .first();
    
    return industry;
  },
});

// Create industry
export const createIndustry = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const industryId = await ctx.db.insert("industries", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return industryId;
  },
});

// Update industry
export const updateIndustry = mutation({
  args: {
    industryId: v.id("industries"),
    title: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    fullDescription: v.optional(v.string()),
    applications: v.optional(v.array(v.string())),
    products: v.optional(v.array(v.string())),
    caseStudy: v.optional(v.object({
      client: v.string(),
      challenge: v.string(),
      solution: v.string(),
      result: v.string(),
    })),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { industryId, ...updates } = args;
    await ctx.db.patch(industryId, {
      ...updates,
      updatedAt: Date.now(),
    });
    return industryId;
  },
});

// Delete industry
export const deleteIndustry = mutation({
  args: {
    industryId: v.id("industries"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.industryId);
    return true;
  },
});
