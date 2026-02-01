# Crafter Tapes - Backend System

## Overview

This project uses **Convex** as the backend system for managing all website content including:
- Products
- Blog Posts
- Industries
- Inquiries (contact form submissions)
- Site Settings

## Backend Architecture

### Database Schema (convex/schema.ts)

1. **Products** - Industrial tape products with specs, features, and applications
2. **Blog Posts** - Articles with categories, tags, and authors
3. **Industries** - Industry sectors with case studies
4. **Pages** - CMS pages (About, Quality, etc.)
5. **Inquiries** - Contact form submissions
6. **Site Settings** - Global configuration

### Convex Functions

#### Products (convex/products.ts)
- `getProducts()` - List all products with filtering
- `getProductBySlug()` - Get single product by slug
- `getProductById()` - Get product by ID
- `createProduct()` - Create new product
- `updateProduct()` - Update existing product
- `deleteProduct()` - Delete product

#### Blog Posts (convex/blogPosts.ts)
- `getBlogPosts()` - List all posts with filtering
- `getBlogPostBySlug()` - Get single post
- `getBlogPostById()` - Get post by ID
- `createBlogPost()` - Create new post
- `updateBlogPost()` - Update post
- `deleteBlogPost()` - Delete post

#### Industries (convex/industries.ts)
- `getIndustries()` - List all industries
- `getIndustryById()` - Get industry by ID
- `createIndustry()` - Create industry
- `updateIndustry()` - Update industry
- `deleteIndustry()` - Delete industry

#### Inquiries (convex/inquiries.ts)
- `getInquiries()` - List all inquiries
- `createInquiry()` - Create inquiry from contact form
- `updateInquiryStatus()` - Update inquiry status

#### Seed Data (convex/seed.ts)
- `seedDemoData()` - Populate database with demo content
- `clearAllData()` - Clear all data (use with caution)

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file:

```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Convex
NEXT_PUBLIC_CONVEX_URL=your-convex-url-here

# Contact Information
CONTACT_EMAIL=info@craftertapes.com
CONTACT_PHONE=+1234567890
```

### 2. Seed Demo Data

After connecting to Convex, seed the demo data by running this mutation in the Convex dashboard:

```javascript
// In Convex dashboard, run:
api.seed.seedDemoData()
```

Or create a simple admin page to trigger it.

### 3. Generated Types

Once you run the dev server, Convex will generate types at:
- `convex/_generated/api.d.ts`
- `convex/_generated/api.js`
- `convex/_generated/dataModel.d.ts`
- `convex/_generated/server.d.ts`

## Content Management

### Adding Content

You can add content in three ways:

1. **Convex Dashboard** - Use the built-in UI to create/edit documents
2. **API Calls** - Use the Convex client in your components
3. **Admin Interface** - Build a custom admin panel (recommended for production)

### Example: Adding a Product

```typescript
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function AddProductForm() {
  const createProduct = useMutation(api.products.createProduct);
  
  const handleSubmit = async (data) => {
    await createProduct({
      name: data.name,
      slug: data.slug,
      category: data.category,
      shortDescription: data.shortDescription,
      fullDescription: data.fullDescription,
      features: data.features,
      specifications: data.specifications,
      applications: data.applications,
      certifications: data.certifications,
      status: "active",
      featured: false,
    });
  };
}
```

### Example: Fetching Data

```typescript
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function ProductsPage() {
  // Get all active products
  const products = useQuery(api.products.getProducts, { 
    status: "active" 
  });
  
  // Get featured products only
  const featuredProducts = useQuery(api.products.getProducts, { 
    featured: true 
  });
  
  // Get single product
  const product = useQuery(api.products.getProductBySlug, { 
    slug: "bopp-packaging-tape" 
  });
}
```

## Demo Data Included

The seed function creates:

### 6 Products
- BOPP Packaging Tape
- Heavy Duty Carton Sealing Tape
- Masking Tape
- Electrical Insulation Tape
- Surface Protection Film
- Custom Adhesive Solutions

### 5 Blog Posts
- How to Choose the Right Packaging Tape
- Sustainable Packaging Trends in 2024
- Introducing High-Temperature Masking Tape
- Automotive Industry Tape Applications
- 2023 Year in Review

### 6 Industries
- Manufacturing
- Logistics & Warehousing
- Automotive
- Electronics
- Food & Beverage
- Pharmaceutical

Each with full descriptions, applications, products, and case studies.

## Admin Interface (Future Enhancement)

For production, consider building an admin interface at `/admin` with:
- Authentication (Clerk/Auth0)
- Dashboard with stats
- Content editors for each type
- Media upload functionality
- Preview functionality

## API Security

All Convex functions are secured by default:
- Queries are read-only
- Mutations require explicit authorization
- Add authentication checks for admin operations

Example auth check:
```typescript
export const createProduct = mutation({
  args: { ... },
  handler: async (ctx, args) => {
    // Check if user is admin
    const user = await ctx.auth.getUserIdentity();
    if (!user || !user.tokenIdentifier.includes("admin")) {
      throw new Error("Unauthorized");
    }
    // ... create product
  },
});
```

## Next Steps

1. ✅ Run `npm run dev` to start the development server
2. ✅ Open Convex dashboard to verify data
3. ✅ Seed demo data using the mutation
4. ✅ Test all pages are loading data correctly
5. 🔄 Build admin interface (optional)
6. 🔄 Add authentication (optional)
7. 🔄 Add image upload functionality

## Troubleshooting

### Type Errors
If you see type errors, Convex types haven't been generated yet. Run:
```bash
npx convex dev
```

### Missing Data
If pages show "Loading..." indefinitely:
1. Check Convex dashboard for data
2. Run seed mutation if empty
3. Check browser console for errors

### Build Errors
If build fails with Convex errors:
1. Ensure `convex/_generated` exists
2. Run `npx convex dev` to regenerate
3. Check all imports use `@/convex/_generated/api`
