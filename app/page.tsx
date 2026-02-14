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
  Leaf,
  Sun,
  Globe,
  Recycle,
  TreePine,
  Plus,
  Scroll,
} from "lucide-react";

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

const features = [
  {
    icon: Package,
    title: "Premium Quality",
    description: "Industrial-grade tapes and materials manufactured to the highest standards",
  },
  {
    icon: Shield,
    title: "Reliable Performance",
    description: "Consistent adhesive strength and durability for demanding applications",
  },
  {
    icon: Truck,
    title: "Bulk Supply",
    description: "Scalable production capacity to meet large volume requirements",
  },
  {
    icon: Factory,
    title: "Custom Solutions",
    description: "Tailored tape specifications for your unique manufacturing needs",
  },
];

const productCategories = [
  {
    title: "Packaging Tapes",
    description: "High-performance carton sealing and packaging solutions",
    href: "/products?category=packaging-tapes",
    image: "/product-kraft.png",
  },
  {
    title: "Specialty Tapes",
    description: "Masking, electrical, and industrial specialty adhesives",
    href: "/products?category=specialty-tapes",
    image: "/product-hotmelt.png",
  },
  {
    title: "Protective Films",
    description: "Surface protection for manufacturing and transportation",
    href: "/products?category=protective-films",
    image: "/product-stretch.png",
  },
  {
    title: "Custom Solutions",
    description: "Bespoke tape manufacturing for specific applications",
    href: "/products?category=custom-solutions",
    image: "/product-filament.png",
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
  "FDA Approved",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left - Main Headline */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="heading-display text-offwhite mb-8">
                Industrial{' '}
                <span className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-green-mint/50 mx-1">
                  <Scroll size={24} className="text-green-mint" />
                </span>{' '}
                packaging{' '}
                <span className="highlight-pill">solutions</span>{' '}
                are{' '}
                <span className="text-green-mint">designed</span>{' '}
                for maximum performance
              </h1>

              {/* Free Delivery Badge */}
              <div className="absolute -right-4 top-1/3 hidden lg:block">
                <div className="transform -rotate-12 bg-green-forest/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-mint/30">
                  <span className="text-xs font-medium text-green-pale uppercase tracking-wider">BULK ORDERS</span>
                </div>
                <ArrowRight className="absolute -right-8 top-8 text-green-mint" size={24} />
              </div>
            </motion.div>

            {/* Right - Stats Card & Nav Pills */}
            <motion.div 
              className="flex flex-col items-end gap-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Stats Card */}
              <div className="bg-offwhite rounded-3xl p-5 w-full max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-mint flex items-center justify-center">
                    <Factory size={20} className="text-dark" />
                  </div>
                  <div>
                    <span className="text-2xl font-display font-bold text-dark">25+</span>
                    <span className="text-xs text-dark/60 uppercase tracking-wider ml-2">Years of excellence.</span>
                  </div>
                </div>
                
                {/* Avatar Stack */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-offwhite bg-green-forest flex items-center justify-center text-offwhite text-xs font-bold">CT</div>
                    <div className="w-10 h-10 rounded-full border-2 border-offwhite bg-green-mint flex items-center justify-center text-dark text-xs font-bold">B2B</div>
                    <div className="w-10 h-10 rounded-full border-2 border-offwhite bg-green-sage flex items-center justify-center text-dark text-xs font-bold">ISO</div>
                    <div className="w-10 h-10 rounded-full border-2 border-offwhite bg-green-lime flex items-center justify-center text-dark text-xs font-bold">25+</div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark text-offwhite text-sm font-medium hover:bg-dark-lighter transition-colors">
                    Join <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Nav Pills */}
              <div className="flex flex-wrap gap-3 justify-end">
                <Link href="/industries" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-offwhite/10 hover:bg-offwhite/20 transition-colors">
                  <Factory size={16} className="text-green-mint" />
                  <span className="text-sm font-medium">Industries</span>
                </Link>
                <Link href="/about" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-offwhite/10 hover:bg-offwhite/20 transition-colors">
                  <span className="text-sm font-medium">About</span>
                </Link>
                <Link href="/products" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-offwhite/10 hover:bg-offwhite/20 transition-colors">
                  <span className="text-sm font-medium">Catalog</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Card Grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Card 1 - Brand Card */}
            <motion.div 
              className="card-rounded bg-green-forest relative overflow-hidden min-h-[280px] lg:min-h-[360px]"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <div className="w-12 h-12 bg-offwhite/20 rounded-xl flex items-center justify-center">
                  <Leaf size={24} className="text-offwhite" />
                </div>
                <div className="transform -rotate-90 origin-bottom-left absolute bottom-8 left-8">
                  <span className="text-offwhite/80 font-display font-medium text-sm tracking-wider">Crafter</span>
                </div>
              </div>
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-mint/30 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-lime/40 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </motion.div>

            {/* Card 2 - Forest Image */}
            <motion.div 
              className="card-rounded relative overflow-hidden min-h-[280px] lg:min-h-[360px] group"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
            >
              <Image 
                src="/warehouse-worker.jpg" 
                alt="Warehouse operations" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-offwhite text-sm font-medium leading-relaxed">
                  Industrial-grade/<br />certified materials.
                </p>
                {/* Progress bars */}
                <div className="flex gap-2 mt-4">
                  <div className="w-2 h-12 bg-offwhite/20 rounded-full overflow-hidden">
                    <div className="w-full h-3/4 bg-offwhite rounded-full"></div>
                  </div>
                  <div className="w-2 h-12 bg-offwhite/20 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-green-mint rounded-full"></div>
                  </div>
                  <div className="w-2 h-12 bg-offwhite/20 rounded-full overflow-hidden">
                    <div className="w-full h-1/2 bg-offwhite rounded-full"></div>
                  </div>
                  <div className="w-2 h-12 bg-offwhite/20 rounded-full overflow-hidden">
                    <div className="w-full h-2/3 bg-offwhite rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 - Mission Card */}
            <motion.div 
              className="card-rounded bg-green-sage/30 relative overflow-hidden min-h-[280px] lg:min-h-[360px] p-5"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
            >
              {/* Decorative wave lines */}
              <svg className="absolute top-0 right-0 w-32 h-32 opacity-30" viewBox="0 0 100 100">
                <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-forest"/>
                <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-forest"/>
                <path d="M0,70 Q25,50 50,70 T100,70" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-forest"/>
              </svg>
              
              <div className="flex gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-forest/20 flex items-center justify-center">
                  <Award size={18} className="text-green-forest" />
                </div>
                <div className="w-10 h-10 rounded-full bg-green-forest/20 flex items-center justify-center">
                  <Globe size={18} className="text-green-forest" />
                </div>
              </div>

              <ArrowRight className="text-green-forest mb-4" size={24} />

              <p className="text-dark font-medium leading-relaxed">
                Our mission is to provide industrial packaging solutions that exceed quality standards and environmental expectations.
              </p>
            </motion.div>

            {/* Card 4 - Palm Leaves */}
            <motion.div 
              className="card-rounded relative overflow-hidden min-h-[280px] lg:min-h-[360px] group"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
            >
              <Image 
                src="/stacked-boxes.jpg" 
                alt="Packaging materials" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"></div>
              {/* Recycle Icon */}
              <div className="absolute bottom-5 right-5 w-14 h-14 rounded-full bg-offwhite/10 backdrop-blur-sm flex items-center justify-center border border-offwhite/20">
                <Recycle size={24} className="text-offwhite" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-offwhite/10 bg-dark-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
              >
                <div className="text-3xl lg:text-4xl font-display font-bold text-green-mint">
                  {stat.value}
                </div>
                <div className="text-sm text-offwhite/60 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow mb-4 block">Why Choose Us</span>
            <h2 className="heading-section text-offwhite mb-4">
              Excellence in every <span className="text-green-mint">roll</span>
            </h2>
            <p className="body-text text-lg">
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
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card-rounded bg-dark-light p-6 hover:bg-dark-lighter transition-colors group"
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-green-mint/20 flex items-center justify-center mb-4 group-hover:bg-green-mint/30 transition-colors">
                  <feature.icon className="h-6 w-6 text-green-mint" />
                </div>
                <h3 className="font-display font-semibold text-offwhite text-lg mb-2">{feature.title}</h3>
                <p className="text-offwhite/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20 lg:py-32 px-4 lg:px-8 bg-dark-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="eyebrow mb-4 block">Our Products</span>
              <h2 className="heading-section text-offwhite">
                Comprehensive <span className="text-green-mint">solutions</span>
              </h2>
              <p className="body-text mt-2">
                Industrial-grade products for all your adhesive and packaging needs
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/products" className="btn-pill-outline">
                View All Products <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
          >
            {productCategories.map((category, index) => (
              <motion.div
                key={category.title}
                className="group cursor-pointer"
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="card-rounded bg-dark overflow-hidden mb-4">
                  <div className="h-64 flex items-center justify-center p-6 bg-gradient-to-br from-dark-lighter to-dark relative">
                    <Image 
                      src={category.image}
                      alt={category.title}
                      width={200}
                      height={200}
                      className="object-contain transition-transform duration-500 group-hover:scale-110 max-h-48"
                    />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-offwhite text-lg mb-1 group-hover:text-green-mint transition-colors">{category.title}</h3>
                <p className="text-offwhite/60 text-sm">{category.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 lg:py-32 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow mb-4 block">Industries We Serve</span>
            <h2 className="heading-section text-offwhite">
              Trusted by leaders across <span className="text-green-mint">sectors</span>
            </h2>
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
            ].map((industry, index) => (
              <motion.div
                key={industry}
                className="card-rounded bg-dark-light p-6 text-center hover:bg-dark-lighter transition-colors"
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <Factory className="h-8 w-8 mx-auto mb-3 text-green-mint" />
                <p className="font-medium text-sm text-offwhite">{industry}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-y border-offwhite/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={indicator}
                className="flex items-center text-sm text-offwhite/60"
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
              >
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-mint" />
                {indicator}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 lg:px-8 bg-dark-light">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="card-rounded-lg bg-green-forest p-8 lg:p-16 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-mint/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-lime/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="eyebrow mb-4 block text-green-pale">Get Started</span>
              <h2 className="heading-section text-offwhite mb-6">
                Ready to Partner With Us?
              </h2>
              <p className="text-lg text-offwhite/80 mb-8">
                Get in touch to discuss your requirements and receive a customized
                quote for your industrial tape and packaging material needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/contact" className="btn-pill bg-offwhite text-dark hover:bg-offwhite/90">
                    Request a Quote <ArrowRight size={18} />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href="/products" className="btn-pill-outline border-offwhite/30 hover:bg-offwhite/10">
                    Browse Products
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
