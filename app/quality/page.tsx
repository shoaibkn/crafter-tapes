import { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Shield,
  FileCheck,
  Microscope,
  Factory,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Quality Standards | Crafter Tapes",
  description:
    "Learn about our rigorous quality control processes, certifications, and commitment to delivering industrial tapes that meet the highest international standards.",
};

const certifications = [
  {
    name: "ISO 9001:2015",
    description:
      "Quality Management System certification ensuring consistent product quality and continuous improvement.",
    icon: FileCheck,
  },
  {
    name: "ISO 14001:2015",
    description:
      "Environmental Management System certification demonstrating our commitment to sustainable manufacturing.",
    icon: Shield,
  },
  {
    name: "REACH Compliant",
    description:
      "All products comply with EU REACH regulations for chemical safety and environmental protection.",
    icon: CheckCircle2,
  },
  {
    name: "RoHS Compliant",
    description:
      "Restriction of Hazardous Substances compliance for electronics and electrical applications.",
    icon: Microscope,
  },
  {
    name: "FDA Approved",
    description:
      "Food-grade tapes approved for direct and indirect food contact applications.",
    icon: Award,
  },
  {
    name: "BRC Certified",
    description:
      "Global standard for food safety, ensuring products meet strict hygiene requirements.",
    icon: Factory,
  },
];

const qualityProcesses = [
  {
    title: "Raw Material Inspection",
    description:
      "All incoming raw materials undergo rigorous testing for quality, consistency, and compliance with specifications.",
    checks: [
      "Adhesive viscosity testing",
      "Film thickness measurement",
      "Tensile strength verification",
      "Chemical composition analysis",
    ],
  },
  {
    title: "In-Process Quality Control",
    description:
      "Continuous monitoring during manufacturing ensures consistent product quality throughout production.",
    checks: [
      "Coating weight verification",
      "Adhesion strength testing",
      "Width and length accuracy",
      "Visual defect inspection",
    ],
  },
  {
    title: "Finished Product Testing",
    description:
      "Every batch undergoes comprehensive testing before release to ensure it meets all specifications.",
    checks: [
      "Peel adhesion testing",
      "Shear strength measurement",
      "Temperature resistance",
      "Aging and stability tests",
    ],
  },
  {
    title: "Documentation & Traceability",
    description:
      "Complete batch records ensure full traceability from raw materials to finished products.",
    checks: [
      "Batch number tracking",
      "Certificate of analysis",
      "Test report documentation",
      "Retention sample storage",
    ],
  },
];

const testingEquipment = [
  "Universal Testing Machine",
  "Adhesion Tester",
  "Thickness Gauge",
  "Temperature Chamber",
  "Humidity Chamber",
  "Spectrophotometer",
  "Viscosity Meter",
  "Microscope Analysis",
];

export default function QualityPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-muted py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4">Quality Assurance</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Our Commitment to Quality
            </h1>
            <p className="text-lg text-muted-foreground">
              Quality is not just a standard we meet—it&apos;s a culture we
              live. Every tape we produce undergoes rigorous testing and
              inspection to ensure it meets the highest international standards.
            </p>
          </div>
        </div>
      </section>

      {/* Quality Stats */}
      <section className="py-12 border-y bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.8%", label: "Quality Rate" },
              { value: "100%", label: "Batch Testing" },
              { value: "25+", label: "Test Parameters" },
              { value: "0", label: "Major Recalls" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-muted-foreground">
              Our products meet stringent international standards and regulatory
              requirements
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <Card key={cert.name} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <cert.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-lg">{cert.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Our Quality Process
            </h2>
            <p className="text-muted-foreground">
              A comprehensive quality management system ensures consistent
              excellence
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {qualityProcesses.map((process, index) => (
              <Card key={process.title}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{process.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{process.description}</p>
                  <div>
                    <p className="text-sm font-medium mb-2">Quality Checks:</p>
                    <ul className="space-y-1">
                      {process.checks.map((check) => (
                        <li
                          key={check}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Laboratory */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">
                State-of-the-Art Testing Laboratory
              </h2>
              <p className="text-muted-foreground text-lg">
                Our in-house quality control laboratory is equipped with
                advanced testing equipment to perform comprehensive analysis of
                all products. This ensures that every batch meets our stringent
                quality standards before leaving our facility.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {testingEquipment.map((equipment) => (
                  <div key={equipment} className="flex items-center space-x-2">
                    <Microscope className="h-4 w-4 text-primary" />
                    <span className="text-sm">{equipment}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] bg-gradient-to-br from-primary/10 to-secondary rounded-lg flex items-center justify-center">
              <Microscope className="h-24 w-24 text-primary/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quality Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground text-center text-lg leading-relaxed">
                At Crafter Tapes, we are committed to manufacturing and
                delivering industrial adhesive products that consistently meet
                or exceed customer expectations and regulatory requirements. We
                achieve this through continuous improvement of our processes,
                investment in technology, and development of our people.
              </p>
              <Separator />
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold mb-2">Customer Focus</h3>
                  <p className="text-sm text-muted-foreground">
                    Understanding and meeting customer requirements is our top
                    priority
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Continuous Improvement</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular review and enhancement of our quality management
                    system
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Employee Engagement</h3>
                  <p className="text-sm text-muted-foreground">
                    Training and empowering our team to maintain quality
                    standards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Request Quality Documentation
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Need certificates of analysis, material safety data sheets, or
              other quality documentation? Our team is ready to assist.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">
                Contact Quality Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
