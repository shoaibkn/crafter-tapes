"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { ArrowRight, Factory, Package, Car, Cpu, Utensils, Pill, Briefcase, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/convex/_generated/api";

const iconMap: Record<string, React.ElementType> = {
  manufacturing: Factory,
  logistics: Package,
  automotive: Car,
  electronics: Cpu,
  "food-beverage": Utensils,
  pharmaceutical: Pill,
};

export default function IndustriesPage() {
  const industries = useQuery(api.industries.getIndustries, {});

  if (industries === undefined) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading industries...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-muted py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Industries We Serve
            </h1>
            <p className="text-lg text-muted-foreground">
              Trusted by leading companies across diverse sectors. Our specialized 
              adhesive solutions are tailored to meet the unique challenges of each industry.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => {
              const Icon = iconMap[industry.id] || Factory;
              return (
                <Card key={industry._id} className="group">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <CardTitle className="text-xl">{industry.title}</CardTitle>
                    <CardDescription>{industry.shortDescription}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Key Applications:</p>
                        <ul className="space-y-1">
                          {industry.applications.slice(0, 3).map((app: string) => (
                            <li key={app} className="text-sm text-muted-foreground flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {industry.products.slice(0, 3).map((product: string) => (
                          <Badge key={product} variant="secondary" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Industry Sections */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {industries.map((industry, index) => {
              const Icon = iconMap[industry.id] || Factory;
              return (
                <div key={industry._id} id={industry.id} className="scroll-mt-24">
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "" : ""}`}>
                    <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="flex items-center space-x-3">
                        <Icon className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight">{industry.title}</h2>
                      </div>
                      <p className="text-lg text-muted-foreground">{industry.fullDescription}</p>
                      
                      <div>
                        <h3 className="font-semibold mb-3">Applications</h3>
                        <ul className="space-y-2">
                          {industry.applications.map((app: string) => (
                            <li key={app} className="flex items-start">
                              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">Recommended Products</h3>
                        <div className="flex flex-wrap gap-2">
                          {industry.products.map((product: string) => (
                            <Badge key={product} variant="outline">
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Card className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center">
                          <Briefcase className="h-5 w-5 mr-2" />
                          Success Story
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium">Client</p>
                          <p className="text-sm text-muted-foreground">{industry.caseStudy.client}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Challenge</p>
                          <p className="text-sm text-muted-foreground">{industry.caseStudy.challenge}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Solution</p>
                          <p className="text-sm text-muted-foreground">{industry.caseStudy.solution}</p>
                        </div>
                        <div className="bg-primary/10 rounded-lg p-4">
                          <p className="text-sm font-medium text-primary">Result</p>
                          <p className="text-sm text-muted-foreground">{industry.caseStudy.result}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Don&apos;t See Your Industry?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              We serve many more sectors. Contact us to discuss how our adhesive 
              solutions can meet your specific industry requirements.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Contact Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
