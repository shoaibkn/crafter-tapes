"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FileText,
  Factory,
  MessageSquare,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
  { href: "/admin/industries", label: "Industries", icon: Factory },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Header - Mobile Optimized */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">Admin Panel</h2>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                      return (
                        <Link
                          key={item.href}
                          href={item.href as any}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "hover:bg-muted",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="p-4 border-t space-y-1">
                    <p className="px-4 text-sm font-semibold text-muted-foreground mb-2">
                      Quick Actions
                    </p>
                    <Link
                      href={"/admin/products/new" as any}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Package className="h-5 w-5" />
                      <span>Add Product</span>
                    </Link>
                    <Link
                      href={"/admin/blog/new" as any}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <FileText className="h-5 w-5" />
                      <span>Add Blog Post</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <h1 className="text-lg sm:text-xl font-bold">Admin Panel</h1>
            <span className="text-muted-foreground hidden sm:inline">|</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Crafter Tapes CMS
            </span>
          </div>
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Site
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="sm:hidden">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Sidebar Navigation - Desktop Only */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <nav className="space-y-1 sticky top-24">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href as any}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 pt-8 border-t sticky top-[340px]">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-4">
                Quick Actions
              </h3>
              <Link
                href={"/admin/products/new" as any}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <Package className="h-5 w-5" />
                <span>Add Product</span>
              </Link>
              <Link
                href={"/admin/blog/new" as any}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <FileText className="h-5 w-5" />
                <span>Add Blog Post</span>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
