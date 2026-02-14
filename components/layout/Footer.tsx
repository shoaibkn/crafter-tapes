import Link from "next/link";
import { Phone, Mail, MapPin, Linkedin, Facebook, Twitter, Leaf, ArrowUpRight } from "lucide-react";

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
    <footer className="py-12 px-4 lg:px-8 border-t border-offwhite/10 bg-dark-light">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-mint rounded-lg flex items-center justify-center">
                <Leaf size={18} className="text-dark" />
              </div>
              <span className="font-display font-bold text-lg text-offwhite">
                Crafter Tapes
              </span>
            </div>
            <p className="text-sm text-offwhite/60">
              Leading manufacturer of industrial tapes and packaging materials.
              Delivering quality adhesive solutions for B2B clients worldwide.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+1234567890"
                className="flex items-center text-sm text-offwhite/60 hover:text-offwhite transition-colors"
              >
                <Phone className="mr-2 h-4 w-4 text-green-mint" />
                +1 (234) 567-890
              </a>
              <a
                href="mailto:info@craftertapes.com"
                className="flex items-center text-sm text-offwhite/60 hover:text-offwhite transition-colors"
              >
                <Mail className="mr-2 h-4 w-4 text-green-mint" />
                info@craftertapes.com
              </a>
              <div className="flex items-start text-sm text-offwhite/60">
                <MapPin className="mr-2 h-4 w-4 mt-0.5 text-green-mint" />
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
            <h3 className="text-lg font-semibold mb-4 text-offwhite">Products</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-offwhite/60 hover:text-offwhite hover:text-green-mint transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-offwhite">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-offwhite/60 hover:text-offwhite hover:text-green-mint transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-offwhite">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as any}
                    className="text-sm text-offwhite/60 hover:text-offwhite hover:text-green-mint transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-offwhite/10">
          <p className="text-sm text-offwhite/40">
            © {new Date().getFullYear()} Crafter Tapes. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-offwhite/10 flex items-center justify-center text-offwhite/60 hover:bg-offwhite/20 hover:text-offwhite transition-all"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-offwhite/10 flex items-center justify-center text-offwhite/60 hover:bg-offwhite/20 hover:text-offwhite transition-all"
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-offwhite/10 flex items-center justify-center text-offwhite/60 hover:bg-offwhite/20 hover:text-offwhite transition-all"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
