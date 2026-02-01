import { Metadata } from "next";
import Image from "next/image";
import { Award, Users, Factory, Globe, CheckCircle2, Target, TrendingUp, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About Us | Crafter Tapes",
  description: "Learn about Crafter Tapes - a leading manufacturer of industrial tapes and packaging materials with over 25 years of experience serving B2B clients worldwide.",
};

const milestones = [
  { year: "1999", title: "Company Founded", description: "Started as a small tape manufacturing unit" },
  { year: "2005", title: "ISO Certification", description: "Achieved ISO 9001:2000 certification" },
  { year: "2010", title: "Expansion", description: "Opened second manufacturing facility" },
  { year: "2015", title: "Global Reach", description: "Started exporting to 20+ countries" },
  { year: "2020", title: "Innovation Center", description: "Launched R&D facility for custom solutions" },
  { year: "2024", title: "Industry Leader", description: "Recognized as top industrial tape manufacturer" },
];

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "We never compromise on product quality. Every tape undergoes rigorous testing to meet industry standards.",
  },
  {
    icon: Users,
    title: "Customer Partnership",
    description: "We view our clients as partners, working collaboratively to solve their adhesive challenges.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    description: "Our R&D team constantly explores new materials and technologies to improve our products.",
  },
  {
    icon: Shield,
    title: "Reliability",
    description: "Consistent supply, on-time delivery, and dependable performance you can count on.",
  },
];

const leadership = [
  {
    name: "John Smith",
    role: "Chief Executive Officer",
    description: "30+ years in manufacturing industry",
  },
  {
    name: "Sarah Johnson",
    role: "Chief Operations Officer",
    description: "Expert in supply chain optimization",
  },
  {
    name: "Michael Chen",
    role: "Head of R&D",
    description: "PhD in Materials Science",
  },
  {
    name: "Emily Rodriguez",
    role: "Quality Director",
    description: "ISO certification specialist",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-muted py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              About Crafter Tapes
            </h1>
            <p className="text-lg text-muted-foreground">
              For over 25 years, we have been at the forefront of industrial tape manufacturing, 
              delivering innovative adhesive solutions that power industries worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
              <p className="text-muted-foreground text-lg">
                To be the most trusted partner for industrial adhesive solutions by delivering 
                exceptional quality, innovative products, and unparalleled customer service to 
                businesses worldwide.
              </p>
              <h2 className="text-3xl font-bold tracking-tight pt-4">Our Vision</h2>
              <p className="text-muted-foreground text-lg">
                To lead the global industrial tape industry through sustainable manufacturing 
                practices, cutting-edge technology, and a relentless commitment to customer success.
              </p>
            </div>
            <div className="relative h-[400px] bg-gradient-to-br from-primary/10 to-secondary rounded-lg flex items-center justify-center">
              <Factory className="h-24 w-24 text-primary/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "25+", label: "Years of Excellence" },
              { value: "500+", label: "Global Clients" },
              { value: "200+", label: "Team Members" },
              { value: "50M+", label: "Units Annually" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Journey</h2>
            <p className="text-muted-foreground">
              From humble beginnings to industry leadership
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone, index) => (
              <Card key={milestone.year} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                  <CardTitle className="text-lg">{milestone.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="border-0 shadow-none bg-background">
                <CardHeader>
                  <value.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Certifications & Standards</h2>
            <p className="text-muted-foreground">
              Our commitment to quality is validated by international standards
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "ISO 9001:2015",
              "ISO 14001:2015",
              "REACH Compliant",
              "RoHS Compliant",
              "FDA Approved",
              "BRC Certified",
              "OEKO-TEX®",
              "UL Listed",
            ].map((cert) => (
              <div key={cert} className="flex items-center justify-center p-6 bg-muted rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="font-medium text-sm">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Leadership Team</h2>
            <p className="text-muted-foreground">
              Experienced professionals driving our success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader) => (
              <Card key={leader.name} className="text-center">
                <div className="h-32 bg-gradient-to-br from-primary/10 to-secondary rounded-t-lg flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary/40" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{leader.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{leader.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{leader.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] bg-gradient-to-br from-primary/10 to-secondary rounded-lg flex items-center justify-center">
              <Globe className="h-24 w-24 text-primary/40" />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Global Presence</h2>
              <p className="text-muted-foreground text-lg">
                With manufacturing facilities and distribution centers across multiple continents, 
                we serve clients in over 50 countries. Our global network ensures reliable supply 
                chain and localized support.
              </p>
              <ul className="space-y-3">
                {[
                  "3 Manufacturing Facilities",
                  "5 Distribution Centers",
                  "50+ Countries Served",
                  "24/7 Customer Support",
                ].map((item) => (
                  <li key={item} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
