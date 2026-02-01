import { NextRequest, NextResponse } from "next/server";

// Admin API route for content management
// In production, add authentication middleware here

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Admin API",
    endpoints: {
      products: "/api/admin/products",
      blogPosts: "/api/admin/blog-posts",
      industries: "/api/admin/industries",
      inquiries: "/api/admin/inquiries",
    },
  });
}
