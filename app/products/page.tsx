"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { ArrowRight, Package, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/convex/_generated/api";

const categoryLabels: Record<string, string> = {
  "packaging-tapes": "Packaging Tapes",
  "specialty-tapes": "Specialty Adhesive Tapes",
  "protective-films": "Protective Films",
  "custom-solutions": "Custom Tape Solutions",
};

const categoryDescriptions: Record<string, string> = {
  "packaging-tapes": "High-performance carton sealing and packaging solutions for shipping and storage",
  "specialty-tapes": "Specialized tapes for industrial, electrical, and masking applications",
  "protective-films": "Surface protection films for manufacturing, transportation, and installation",
  "custom-solutions": "Bespoke tape manufacturing tailored to your specific requirements",
};

export default function ProductsPage() {
  const products = useQuery(api.products.getProducts, { status: "active" });

  if (products === undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-muted py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive range of industrial tapes and packaging materials designed 
              to meet the demanding requirements of modern manufacturing and logistics.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
              <div key={category} id={category}>
                <div className="mb-8">
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2">
                    {categoryLabels[category] || category}
                  </h2>
                  <p className="text-muted-foreground">
                    {categoryDescriptions[category] || ""}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => (
                    <Card key={product._id} className="flex flex-col">
                      <div className="aspect-video bg-muted relative overflow-hidden rounded-t-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary flex items-center justify-center">
                          <Package className="h-12 w-12 text-primary/40" />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{product.shortDescription}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Key Features:</p>
                            <div className="flex flex-wrap gap-2">
                              {product.features.slice(0, 3).map((feature) => (
                                <Badge key={feature} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-sm">
                            <p className="font-medium mb-1">Specifications:</p>
                            <ul className="text-muted-foreground space-y-1">
                              <li>Thickness: {product.specifications?.thickness || "N/A"}</li>
                              <li>Width: {product.specifications?.width || "N/A"}</li>
                              <li>Length: {product.specifications?.length || "N/A"}</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      <CardContent className="pt-0">
                        <Button className="w-full" variant="outline" asChild>
                          <Link href={`/products/${product.slug}`}>
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Need a Custom Solution?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Our R&D team can develop custom tape formulations and specifications 
              tailored to your unique application requirements.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Discuss Your Requirements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
