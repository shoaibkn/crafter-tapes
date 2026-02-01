import Link from "next/link";
import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  products: [
    { label: "Packaging Tapes", href: "/products?category=packaging-tapes" },
    { label: "Specialty Tapes", href: "/products?category=specialty-tapes" },
    { label: "Protective Films", href: "/products?category=protective-films" },
    { label: "Custom Solutions", href: "/products?category=custom-solutions" },
    { label: "View All Products", href: "/products" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Quality Standards", href: "/quality" },
    { label: "Industries Served", href: "/industries" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/about#careers" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Request a Quote", href: "/contact" },
    { label: "Technical Support", href: "/contact" },
    { label: "FAQs", href: "/about#faq" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Crafter Tapes</h3>
            <p className="text-sm text-muted-foreground">
              Leading manufacturer of industrial tapes and packaging materials.
              Delivering quality adhesive solutions for B2B clients worldwide.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+1234567890"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <Phone className="mr-2 h-4 w-4" />
                +1 (234) 567-890
              </a>
              <a
                href="mailto:info@craftertapes.com"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <Mail className="mr-2 h-4 w-4" />
                info@craftertapes.com
              </a>
              <div className="flex items-start text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4 mt-0.5" />
                <span>
                  123 Industrial Ave
                  <br />
                  Manufacturing District
                  <br />
                  City, State 12345
                </span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Crafter Tapes. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
