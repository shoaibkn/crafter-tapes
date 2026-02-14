"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Leaf } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Industries", href: "/industries" },
  { label: "Quality", href: "/quality" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="mx-4 lg:mx-8">
        <div
          className={`flex items-center justify-between px-4 lg:px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled ? "bg-dark-light/90 backdrop-blur-xl shadow-card" : ""
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-mint rounded-lg flex items-center justify-center">
              <Leaf size={18} className="text-dark" />
            </div>
            <span className="font-display font-bold text-lg text-offwhite">
              Crafter Tapes
            </span>
          </Link>

          {/* Center - Tagline */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-offwhite/50">
            <span className="uppercase tracking-wider">Industrial</span>
            <span className="uppercase tracking-wider">Excellence</span>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Menu Pill */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-offwhite/10">
              {navItems.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-green-mint text-dark"
                      : "text-offwhite hover:bg-offwhite/20"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="btn-pill-primary text-sm"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden w-10 h-10 rounded-full bg-offwhite/10 flex items-center justify-center hover:bg-offwhite/20 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 p-6 rounded-3xl bg-dark-light/95 backdrop-blur-xl">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as any}
                  className={`text-offwhite text-lg font-medium transition-colors ${
                    pathname === item.href ? "text-green-mint" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="btn-pill-primary text-center mt-4"
                onClick={() => setIsOpen(false)}
              >
                Get a Quote <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
