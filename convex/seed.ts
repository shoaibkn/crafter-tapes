import { v } from "convex/values";
import { mutation } from "./_generated/server";

// DEMO DATA INITIALIZATION
// Run this mutation to populate the database with demo content

export const seedDemoData = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    
    // Check if data already exists
    const existingProducts = await ctx.db.query("products").take(1);
    if (existingProducts.length > 0) {
      return { success: false, message: "Demo data already exists" };
    }

    // PRODUCTS
    const products = [
      {
        name: "BOPP Packaging Tape",
        slug: "bopp-packaging-tape",
        category: "packaging-tapes",
        shortDescription: "General purpose clear packaging tape with strong acrylic adhesive",
        fullDescription: "Our BOPP (Biaxially Oriented Polypropylene) Packaging Tape is the industry standard for carton sealing and general packaging applications. Manufactured with high-quality polypropylene film and premium acrylic adhesive, this tape provides excellent clarity, strong adhesion, and reliable performance across various temperatures and conditions.",
        features: [
          "High clarity for barcode scanning and content visibility",
          "Strong acrylic adhesive for secure sealing",
          "Excellent tensile strength and durability",
          "Temperature resistant from -10°C to 60°C",
          "UV resistant for long-term storage",
          "Smooth unwinding and quiet application",
          "Compatible with manual and automatic dispensers",
        ],
        specifications: {
          thickness: "40-50 micron",
          width: "24mm - 72mm",
          length: "50m - 1000m",
          adhesive: "Water-based Acrylic",
          material: "Biaxially Oriented Polypropylene",
        },
        applications: [
          "Carton sealing and box closing",
          "General packaging and shipping",
          "Warehouse and distribution centers",
          "E-commerce fulfillment",
          "Light-duty bundling",
          "Label protection",
        ],
        certifications: ["ISO 9001:2015", "REACH Compliant", "RoHS Compliant"],
        status: "active",
        featured: true,
      },
      {
        name: "Heavy Duty Carton Sealing Tape",
        slug: "heavy-duty-carton-sealing-tape",
        category: "packaging-tapes",
        shortDescription: "Reinforced tape for heavy packages and export shipments",
        fullDescription: "Heavy-duty carton sealing tape designed for demanding applications. Features extra-strong adhesive and reinforced construction for secure sealing of heavy packages and export shipments.",
        features: [
          "Extra strength construction",
          "Tamper evident properties",
          "Export grade quality",
          "High tensile strength",
          "Excellent adhesion to recycled boxes",
        ],
        specifications: {
          thickness: "50-65 micron",
          width: "48mm - 72mm",
          length: "100m - 1000m",
          adhesive: "Hot Melt Synthetic Rubber",
          material: "BOPP Film",
        },
        applications: [
          "Heavy package sealing",
          "Export shipments",
          "Double-wall cartons",
          "Industrial packaging",
        ],
        certifications: ["ISO 9001:2015", "REACH Compliant"],
        status: "active",
        featured: true,
      },
      {
        name: "Masking Tape",
        slug: "masking-tape",
        category: "specialty-tapes",
        shortDescription: "General purpose masking tape for painting and surface protection",
        fullDescription: "Professional-grade masking tape designed for painting, labeling, and temporary holding applications. Features clean removal and sharp paint lines.",
        features: [
          "Clean removal without residue",
          "Heat resistant up to 80°C",
          "Sharp paint edges",
          "Conformable to irregular surfaces",
          "Easy tear by hand",
        ],
        specifications: {
          thickness: "120-150 micron",
          width: "12mm - 100mm",
          length: "20m - 50m",
          adhesive: "Natural Rubber",
          material: "Crepe Paper",
        },
        applications: [
          "Painting and decorating",
          "Surface protection",
          "Labeling and marking",
          "Temporary holding",
          "Automotive refinishing",
        ],
        certifications: ["ISO 9001:2015"],
        status: "active",
        featured: true,
      },
      {
        name: "Electrical Insulation Tape",
        slug: "electrical-insulation-tape",
        category: "specialty-tapes",
        shortDescription: "PVC electrical tape for wire insulation and bundling",
        fullDescription: "Professional-grade PVC electrical insulation tape designed for wire insulation, cable bundling, and electrical repairs. Features flame retardant properties and excellent dielectric strength.",
        features: [
          "Flame retardant properties",
          "High dielectric strength",
          "Weather and UV resistant",
          "Flexible and conformable",
          "Self-extinguishing",
        ],
        specifications: {
          thickness: "130-180 micron",
          width: "19mm - 25mm",
          length: "10m - 33m",
          adhesive: "Rubber-based",
          material: "PVC Film",
        },
        applications: [
          "Wire insulation",
          "Cable bundling",
          "Electrical repairs",
          "Color coding",
          "Moisture protection",
        ],
        certifications: ["UL Listed", "CSA Certified", "RoHS Compliant"],
        status: "active",
        featured: true,
      },
      {
        name: "Surface Protection Film",
        slug: "surface-protection-film",
        category: "protective-films",
        shortDescription: "Temporary protection for metal, glass, and plastic surfaces",
        fullDescription: "High-quality surface protection film designed to safeguard metal, glass, and plastic surfaces during manufacturing, transportation, and installation. Easy to apply and remove without residue.",
        features: [
          "Easy application and removal",
          "Clean removal without residue",
          "UV stable for outdoor use",
          "Anti-static properties",
          "Custom widths available",
        ],
        specifications: {
          thickness: "30-100 micron",
          width: "Up to 2000mm",
          length: "Custom lengths",
          adhesive: "Low-tack Acrylic",
          material: "Polyethylene",
        },
        applications: [
          "Metal surface protection",
          "Glass protection",
          "Plastic surface guarding",
          "Appliance manufacturing",
          "Construction protection",
        ],
        certifications: ["ISO 9001:2015"],
        status: "active",
        featured: false,
      },
      {
        name: "Custom Adhesive Solutions",
        slug: "custom-adhesive-solutions",
        category: "custom-solutions",
        shortDescription: "Bespoke tape manufacturing tailored to your specific requirements",
        fullDescription: "Our custom adhesive solutions service provides tailored tape products designed specifically for your unique application requirements. From custom formulations to specialized dimensions, we work with you to develop the perfect solution.",
        features: [
          "Custom adhesive formulations",
          "Specialized bonding solutions",
          "Full R&D support",
          "Prototype development",
          "Volume production capability",
        ],
        specifications: {
          thickness: "Custom",
          width: "Custom",
          length: "Custom",
          adhesive: "Custom formulation",
          material: "As required",
        },
        applications: [
          "Specialized industrial applications",
          "OEM manufacturing",
          "Unique bonding challenges",
          "Proprietary products",
        ],
        certifications: ["ISO 9001:2015", "ISO 14001:2015"],
        status: "active",
        featured: true,
      },
    ];

    for (const product of products) {
      await ctx.db.insert("products", {
        ...product,
        createdAt: now,
        updatedAt: now,
      });
    }

    // BLOG POSTS
    const blogPosts = [
      {
        title: "How to Choose the Right Packaging Tape for Your Business",
        slug: "choosing-right-packaging-tape",
        excerpt: "A comprehensive guide to selecting the best packaging tape based on your specific shipping requirements, box types, and environmental conditions.",
        content: `
          <p>Choosing the right packaging tape is crucial for ensuring your products arrive safely at their destination. With so many options available, it can be overwhelming to make the right choice.</p>
          <h2>Understanding Tape Types</h2>
          <p>The most common types include BOPP tape for general use, PVC tape for quiet applications, and hot melt tape for heavy-duty needs.</p>
          <h2>Consider Your Environment</h2>
          <p>Temperature, humidity, and storage conditions all affect tape performance. Choose tapes rated for your specific conditions.</p>
          <h2>Conclusion</h2>
          <p>The right tape balances cost, performance, and application requirements for optimal results.</p>
        `,
        category: "tips-guides",
        author: "Sarah Johnson",
        authorRole: "Product Specialist",
        date: "2024-01-15",
        readTime: "5 min read",
        tags: ["Packaging", "B2B", "Guide"],
        status: "published",
        featured: true,
      },
      {
        title: "Sustainable Packaging Trends in 2024",
        slug: "sustainable-packaging-trends-2024",
        excerpt: "Explore the latest eco-friendly packaging materials and practices that are shaping the future of the industry.",
        content: `
          <p>Sustainability is no longer optional in the packaging industry. Companies are increasingly seeking eco-friendly alternatives that don't compromise on performance.</p>
          <h2>Biodegradable Options</h2>
          <p>New adhesive formulations break down naturally without leaving harmful residues.</p>
          <h2>Recycled Materials</h2>
          <p>Using recycled content in tape backing materials reduces environmental impact.</p>
        `,
        category: "industry-news",
        author: "Michael Chen",
        authorRole: "Sustainability Director",
        date: "2024-01-10",
        readTime: "4 min read",
        tags: ["Sustainability", "Trends", "Eco-friendly"],
        status: "published",
        featured: true,
      },
      {
        title: "Introducing Our New High-Temperature Masking Tape",
        slug: "new-high-temperature-tape",
        excerpt: "We're excited to announce the launch of our latest innovation - a masking tape that withstands temperatures up to 200°C.",
        content: `
          <p>After extensive R&D, we're proud to introduce our high-temperature masking tape designed for demanding automotive and industrial painting applications.</p>
          <h2>Key Features</h2>
          <ul>
            <li>Withstands up to 200°C</li>
            <li>Clean removal even after baking</li>
            <li>Sharp paint lines guaranteed</li>
          </ul>
        `,
        category: "product-updates",
        author: "Crafter Tapes Team",
        authorRole: "Product Development",
        date: "2024-01-05",
        readTime: "3 min read",
        tags: ["New Product", "Innovation", "Automotive"],
        status: "published",
        featured: false,
      },
      {
        title: "Critical Tape Applications in Automotive Manufacturing",
        slug: "automotive-industry-tape-applications",
        excerpt: "Discover how industrial tapes play a vital role in every stage of automotive production, from painting to final assembly.",
        content: `
          <p>The automotive industry relies heavily on specialized adhesive products throughout the manufacturing process.</p>
          <h2>Paint Shop Applications</h2>
          <p>High-temperature masking tapes ensure perfect finishes while protecting sensitive areas.</p>
          <h2>Assembly Line Uses</h2>
          <p>From wire harnessing to temporary component mounting, tapes improve efficiency and quality.</p>
        `,
        category: "technical-insights",
        author: "Emily Rodriguez",
        authorRole: "Technical Director",
        date: "2023-12-28",
        readTime: "6 min read",
        tags: ["Automotive", "Technical", "Manufacturing"],
        status: "published",
        featured: true,
      },
      {
        title: "Crafter Tapes: 2023 Year in Review",
        slug: "year-in-review-2023",
        excerpt: "Reflecting on a year of growth, innovation, and strengthened partnerships with our valued clients.",
        content: `
          <p>2023 was a remarkable year for Crafter Tapes. We're excited to share our achievements and milestones.</p>
          <h2>Key Achievements</h2>
          <ul>
            <li>25% increase in production capacity</li>
            <li>New R&D facility opened</li>
            <li>ISO 14001 certification achieved</li>
            <li>50 new team members joined</li>
          </ul>
          <p>Thank you to all our partners and clients for making this possible!</p>
        `,
        category: "company-news",
        author: "John Smith",
        authorRole: "CEO",
        date: "2023-12-20",
        readTime: "4 min read",
        tags: ["Company News", "Year Review", "Milestones"],
        status: "published",
        featured: false,
      },
    ];

    for (const post of blogPosts) {
      await ctx.db.insert("blogPosts", {
        ...post,
        createdAt: now,
        updatedAt: now,
      });
    }

    // INDUSTRIES
    const industries = [
      {
        id: "manufacturing",
        title: "Manufacturing",
        shortDescription: "Comprehensive adhesive solutions for production lines and assembly processes",
        fullDescription: "From assembly line masking to protective films for finished goods, our tapes support every stage of the manufacturing process. We understand the critical role of reliable adhesives in maintaining production efficiency and product quality.",
        applications: [
          "Assembly line masking and protection",
          "Surface protection during manufacturing",
          "Component bundling and securing",
          "Quality control marking",
          "Temporary holding and positioning",
        ],
        products: ["Masking Tape", "Protective Films", "Double-Sided Tape", "Custom Solutions"],
        caseStudy: {
          client: "Major Electronics Manufacturer",
          challenge: "Needed residue-free masking for sensitive electronic components",
          solution: "Custom low-tack masking tape with clean removal",
          result: "Zero defects, 30% reduction in rework",
        },
        order: 1,
      },
      {
        id: "logistics",
        title: "Logistics & Warehousing",
        shortDescription: "High-performance packaging and sealing solutions for shipping and storage",
        fullDescription: "In the fast-paced logistics industry, reliable packaging is essential. Our packaging tapes and materials ensure your shipments arrive safely, whether across town or across the globe.",
        applications: [
          "Carton sealing and box closing",
          "Pallet wrapping and stabilization",
          "Label protection and reinforcement",
          "Tamper-evident sealing",
          "Export packaging compliance",
        ],
        products: ["BOPP Packaging Tape", "Heavy Duty Carton Sealing", "Printed Packaging Tape", "Strapping Tape"],
        caseStudy: {
          client: "National Distribution Center",
          challenge: "High-volume operation needed faster, more reliable sealing",
          solution: "High-tack packaging tape with automated dispenser compatibility",
          result: "25% increase in packaging speed, reduced tape breakage",
        },
        order: 2,
      },
      {
        id: "automotive",
        title: "Automotive",
        shortDescription: "Specialized tapes for automotive manufacturing and aftermarket applications",
        fullDescription: "The automotive industry demands precision and durability. Our tapes meet stringent requirements for temperature resistance, chemical compatibility, and long-term performance in harsh environments.",
        applications: [
          "Paint masking and trim protection",
          "Wire harnessing and bundling",
          "Interior and exterior protection",
          "Temporary component mounting",
          "Anti-squeak and rattle solutions",
        ],
        products: ["High-Temperature Masking", "Electrical Tape", "Foam Tapes", "Protective Films"],
        caseStudy: {
          client: "Automotive OEM",
          challenge: "Required high-temperature masking for paint shop operations",
          solution: "Custom silicone adhesive masking tape rated to 180°C",
          result: "Perfect paint lines, zero bleed-through, reduced masking time",
        },
        order: 3,
      },
      {
        id: "electronics",
        title: "Electronics",
        shortDescription: "Precision tapes for sensitive electronic component manufacturing",
        fullDescription: "Electronics manufacturing requires clean, reliable, and often conductive or insulating adhesive solutions. Our tapes are designed to meet the exacting standards of the electronics industry.",
        applications: [
          "PCB masking and protection",
          "Component mounting and bonding",
          "Cable management and bundling",
          "ESD protection",
          "Insulation and shielding",
        ],
        products: ["ESD Tape", "Kapton Tape", "Copper Foil Tape", "Double-Sided Tape"],
        caseStudy: {
          client: "Semiconductor Manufacturer",
          challenge: "Needed ESD-safe tape for cleanroom environment",
          solution: "Anti-static polyimide tape with low outgassing",
          result: "Met cleanroom Class 1000 requirements, zero ESD incidents",
        },
        order: 4,
      },
      {
        id: "food-beverage",
        title: "Food & Beverage",
        shortDescription: "FDA-compliant tapes for food packaging and processing applications",
        fullDescription: "Food safety is paramount. Our FDA-compliant tapes are safe for direct and indirect food contact, making them ideal for packaging, labeling, and processing applications in the food industry.",
        applications: [
          "Food packaging and sealing",
          "Label adhesion and protection",
          "Processing equipment protection",
          "Cold storage applications",
          "Tamper-evident packaging",
        ],
        products: ["FDA-Approved Packaging Tape", "Freezer Grade Tape", "Label Protection Tape"],
        caseStudy: {
          client: "Frozen Food Processor",
          challenge: "Standard tape failed in -20°C freezer conditions",
          solution: "Special low-temperature adhesive formulation",
          result: "Reliable adhesion from -30°C to +60°C, reduced packaging failures",
        },
        order: 5,
      },
      {
        id: "pharmaceutical",
        title: "Pharmaceutical",
        shortDescription: "Compliant tapes for pharmaceutical packaging and manufacturing",
        fullDescription: "Pharmaceutical applications require the highest standards of quality and compliance. Our tapes meet regulatory requirements and provide reliable performance in critical healthcare applications.",
        applications: [
          "Pharmaceutical packaging",
          "Tamper-evident sealing",
          "Label protection and reinforcement",
          "Cleanroom applications",
          "Sterile packaging support",
        ],
        products: ["Pharma-Grade Tape", "Tamper-Evident Tape", "Cleanroom Tape", "Label Protection"],
        caseStudy: {
          client: "Pharmaceutical Packaging Company",
          challenge: "Required tamper-evident tape with batch tracking capability",
          solution: "Custom printed tamper-evident tape with serial numbers",
          result: "Full traceability, regulatory compliance achieved",
        },
        order: 6,
      },
    ];

    for (const industry of industries) {
      await ctx.db.insert("industries", {
        ...industry,
        createdAt: now,
        updatedAt: now,
      });
    }

    // SITE SETTINGS
    const siteSettings = [
      {
        key: "companyName",
        value: "Crafter Tapes",
      },
      {
        key: "tagline",
        value: "Premium Adhesive Solutions for Industry",
      },
      {
        key: "stats",
        value: {
          years: "25+",
          clients: "500+",
          units: "50M+",
          quality: "99.8%",
        },
      },
      {
        key: "contact",
        value: {
          phone: "+1 (234) 567-890",
          email: "info@craftertapes.com",
          address: "123 Industrial Ave, Manufacturing District, City, State 12345",
        },
      },
    ];

    for (const setting of siteSettings) {
      await ctx.db.insert("siteSettings", {
        ...setting,
        updatedAt: now,
      });
    }

    return { 
      success: true, 
      message: "Demo data seeded successfully",
      stats: {
        products: products.length,
        blogPosts: blogPosts.length,
        industries: industries.length,
        siteSettings: siteSettings.length,
      }
    };
  },
});

// Clear all data (use with caution)
export const clearAllData = mutation({
  args: {},
  handler: async (ctx) => {
    // Delete all products
    const products = await ctx.db.query("products").collect();
    for (const product of products) {
      await ctx.db.delete(product._id);
    }

    // Delete all blog posts
    const blogPosts = await ctx.db.query("blogPosts").collect();
    for (const post of blogPosts) {
      await ctx.db.delete(post._id);
    }

    // Delete all industries
    const industries = await ctx.db.query("industries").collect();
    for (const industry of industries) {
      await ctx.db.delete(industry._id);
    }

    // Delete all pages
    const pages = await ctx.db.query("pages").collect();
    for (const page of pages) {
      await ctx.db.delete(page._id);
    }

    // Delete all site settings
    const settings = await ctx.db.query("siteSettings").collect();
    for (const setting of settings) {
      await ctx.db.delete(setting._id);
    }

    return { success: true, message: "All data cleared" };
  },
});
