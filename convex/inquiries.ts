import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const createInquiry = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    message: v.string(),
    productInterest: v.optional(v.string()),
    quantity: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const inquiryId = await ctx.db.insert("inquiries", {
      ...args,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });
    return inquiryId;
  },
});

export const getInquiries = query({
  args: {
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let inquiries;
    const status = args.status;
    const limit = args.limit || 100;
    
    if (status) {
      inquiries = await ctx.db
        .query("inquiries")
        .withIndex("by_status", (q) => q.eq("status", status))
        .order("desc")
        .take(limit);
    } else {
      inquiries = await ctx.db
        .query("inquiries")
        .order("desc")
        .take(limit);
    }
    return inquiries;
  },
});

export const updateInquiryStatus = mutation({
  args: {
    inquiryId: v.id("inquiries"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.inquiryId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});
