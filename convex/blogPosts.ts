import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// BLOG POSTS

// Get all blog posts with optional filtering
export const getBlogPosts = query({
  args: {
    category: v.optional(v.string()),
    status: v.optional(v.string()),
    featured: v.optional(v.boolean()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let posts;
    const category = args.category;
    const status = args.status;
    const featured = args.featured;
    const limit = args.limit || 100;
    
    if (category) {
      posts = await ctx.db
        .query("blogPosts")
        .withIndex("by_category", (q) => q.eq("category", category))
        .filter((q) => status ? q.eq(q.field("status"), status) : true)
        .order("desc")
        .take(limit);
    } else if (featured) {
      posts = await ctx.db
        .query("blogPosts")
        .withIndex("by_featured", (q) => q.eq("featured", true))
        .filter((q) => status ? q.eq(q.field("status"), status) : true)
        .order("desc")
        .take(limit);
    } else {
      posts = await ctx.db
        .query("blogPosts")
        .filter((q) => status ? q.eq(q.field("status"), status) : true)
        .order("desc")
        .take(limit);
    }
    
    return posts;
  },
});

// Get single blog post by slug
export const getBlogPostBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    
    return post;
  },
});

// Get blog post by ID
export const getBlogPostById = query({
  args: {
    postId: v.id("blogPosts"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.postId);
  },
});

// Create blog post
export const createBlogPost = mutation({
  args: {
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
    status: v.string(),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const postId = await ctx.db.insert("blogPosts", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return postId;
  },
});

// Update blog post
export const updateBlogPost = mutation({
  args: {
    postId: v.id("blogPosts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    author: v.optional(v.string()),
    authorRole: v.optional(v.string()),
    date: v.optional(v.string()),
    readTime: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    imageUrl: v.optional(v.string()),
    status: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { postId, ...updates } = args;
    await ctx.db.patch(postId, {
      ...updates,
      updatedAt: Date.now(),
    });
    return postId;
  },
});

// Delete blog post
export const deleteBlogPost = mutation({
  args: {
    postId: v.id("blogPosts"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.postId);
    return true;
  },
});
