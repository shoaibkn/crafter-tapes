"use client";

import { useQuery, useMutation } from "convex/react";
import Link from "next/link";
import {
  Package,
  FileText,
  Factory,
  MessageSquare,
  Database,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useState } from "react";

export default function AdminDashboard() {
  const products = useQuery(api.products.getProducts, {});
  const blogPosts = useQuery(api.blogPosts.getBlogPosts, {});
  const industries = useQuery(api.industries.getIndustries, {});
  const inquiries = useQuery(api.inquiries.getInquiries, {});

  const seedData = useMutation(api.seed.seedDemoData);
  const clearData = useMutation(api.seed.clearAllData);

  const [seedStatus, setSeedStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [clearStatus, setClearStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSeedData = async () => {
    setSeedStatus("loading");
    try {
      const result = await seedData();
      if (result.success) {
        setSeedStatus("success");
        setTimeout(() => setSeedStatus("idle"), 3000);
      } else {
        setSeedStatus("error");
        setTimeout(() => setSeedStatus("idle"), 3000);
      }
    } catch (error) {
      setSeedStatus("error");
      setTimeout(() => setSeedStatus("idle"), 3000);
    }
  };

  const handleClearData = async () => {
    if (
      !confirm(
        "Are you sure you want to clear all data? This cannot be undone.",
      )
    ) {
      return;
    }
    setClearStatus("loading");
    try {
      await clearData();
      setClearStatus("success");
      setTimeout(() => setClearStatus("idle"), 3000);
    } catch (error) {
      setClearStatus("error");
      setTimeout(() => setClearStatus("idle"), 3000);
    }
  };

  const isLoading =
    products === undefined ||
    blogPosts === undefined ||
    industries === undefined ||
    inquiries === undefined;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = [
    {
      title: "Products",
      count: products?.length || 0,
      icon: Package,
      href: "/admin/products",
      color: "bg-blue-500",
    },
    {
      title: "Blog Posts",
      count: blogPosts?.length || 0,
      icon: FileText,
      href: "/admin/blog",
      color: "bg-green-500",
    },
    {
      title: "Industries",
      count: industries?.length || 0,
      icon: Factory,
      href: "/admin/industries",
      color: "bg-orange-500",
    },
    {
      title: "Inquiries",
      count: inquiries?.length || 0,
      icon: MessageSquare,
      href: "/admin/inquiries",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website content and view statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold mt-2">{stat.count}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Link href="/admin/products/new">
                <Button className="w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </Link>
              <Link href="/admin/blog/new">
                <Button className="w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Blog Post
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Seed or clear demo data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleSeedData}
                disabled={seedStatus === "loading"}
                variant="outline"
                className="w-full"
              >
                {seedStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : seedStatus === "success" ? (
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                ) : seedStatus === "error" ? (
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                ) : (
                  <Database className="h-4 w-4 mr-2" />
                )}
                Seed Demo Data
              </Button>
              <Button
                onClick={handleClearData}
                disabled={clearStatus === "loading"}
                variant="outline"
                className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                {clearStatus === "loading" ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : clearStatus === "success" ? (
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                ) : clearStatus === "error" ? (
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 mr-2" />
                )}
                Clear All Data
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Note: Seed Demo Data will only work if the database is empty.
              Clear All Data will remove everything.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Content Overview</CardTitle>
          <CardDescription>Summary of your website content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-medium">Total Products</span>
              <span className="text-muted-foreground">
                {products?.length || 0} items
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-medium">Published Blog Posts</span>
              <span className="text-muted-foreground">
                {blogPosts?.filter(
                  (p: { status: string }) => p.status === "published",
                ).length || 0}{" "}
                items
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="font-medium">Industries</span>
              <span className="text-muted-foreground">
                {industries?.length || 0} items
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="font-medium">New Inquiries</span>
              <span className="text-muted-foreground">
                {inquiries?.filter(
                  (i: { status: string }) => i.status === "new",
                ).length || 0}{" "}
                unread
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
