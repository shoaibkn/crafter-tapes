"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Package,
  Shield,
  Truck,
  Factory,
  Award,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UrlObject } from "url";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.02 },
};

const features = [
  {
    icon: Package,
    title: "Premium Quality",
    description:
      "Industrial-grade tapes and materials manufactured to the highest standards",
  },
  {
    icon: Shield,
    title: "Reliable Performance",
    description:
      "Consistent adhesive strength and durability for demanding applications",
  },
  {
    icon: Truck,
    title: "Bulk Supply",
    description:
      "Scalable production capacity to meet large volume requirements",
  },
  {
    icon: Factory,
    title: "Custom Solutions",
    description:
      "Tailored tape specifications for your unique manufacturing needs",
  },
];

const productCategories = [
  {
    title: "Packaging Tapes",
    description: "High-performance carton sealing and packaging solutions",
    href: "/products?category=packaging-tapes",
    image: "/images/packaging-tapes.jpg",
  },
  {
    title: "Specialty Tapes",
    description: "Masking, electrical, and industrial specialty adhesives",
    href: "/products?category=specialty-tapes",
    image: "/images/specialty-tapes.jpg",
  },
  {
    title: "Protective Films",
    description: "Surface protection for manufacturing and transportation",
    href: "/products?category=protective-films",
    image: "/images/protective-films.jpg",
  },
  {
    title: "Custom Solutions",
    description: "Bespoke tape manufacturing for specific applications",
    href: "/products?category=custom-solutions",
    image: "/images/custom-solutions.jpg",
  },
];

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "500+", label: "B2B Clients" },
  { value: "50M+", label: "Units Produced" },
  { value: "99.8%", label: "Quality Rate" },
];

const trustIndicators = [
  "ISO 9001:2015 Certified",
  "REACH Compliant",
  "RoHS Compliant",
  "FDA Approved (Food Grade)",
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-muted py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="text-sm">
                Industrial Tape Manufacturing
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Premium Adhesive Solutions for Industry
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Leading manufacturer of industrial tapes and packaging
                materials. Serving B2B clients with high-quality, reliable
                adhesive products for manufacturing, logistics, and
                distribution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="lg" asChild>
                    <Link href="/products">
                      Explore Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/contact">Request a Quote</Link>
                  </Button>
                </motion.div>
              </div>
              <motion.div
                className="flex flex-wrap gap-4 pt-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {trustIndicators.map((indicator) => (
                  <motion.div
                    key={indicator}
                    className="flex items-center text-sm text-muted-foreground"
                    variants={fadeInUp}
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle2 className="mr-1 h-4 w-4 text-primary" />
                    {indicator}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              className="relative lg:h-[500px] bg-gradient-to-br from-primary/10 to-secondary rounded-lg flex items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center p-8">
                <Package className="mx-auto h-24 w-24 text-primary/60" />
                <p className="mt-4 text-muted-foreground">Product Hero Image</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Why Choose Crafter Tapes?
            </h2>
            <p className="text-muted-foreground text-lg">
              We combine decades of manufacturing expertise with cutting-edge
              technology to deliver adhesive solutions that exceed industry
              standards.
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="border-0 shadow-none bg-muted/50 h-full">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Our Product Range
              </h2>
              <p className="text-muted-foreground">
                Comprehensive solutions for all your adhesive and packaging
                needs
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" asChild>
                <Link href="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {productCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="group overflow-hidden h-full">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                      <Package className="h-12 w-12 text-primary/40" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="p-0 h-auto" asChild>
                      <Link href={category.href as unknown as UrlObject}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Industries We Serve
            </h2>
            <p className="text-muted-foreground text-lg">
              Trusted by leading companies across diverse sectors
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              "Manufacturing",
              "Logistics",
              "Automotive",
              "Electronics",
              "Food & Beverage",
              "Pharmaceutical",
            ].map((industry) => (
              <motion.div
                key={industry}
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <Card className="border-0 shadow-none bg-muted/30 text-center p-6 h-full">
                  <Factory className="h-8 w-8 mx-auto mb-3 text-primary/60" />
                  <p className="font-medium text-sm">{industry}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
              Ready to Partner With Us?
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Get in touch to discuss your requirements and receive a customized
              quote for your industrial tape and packaging material needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/contact">
                    Request a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  // className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/products">
                    <span className="text-primary">Browse Products</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
