"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Plus, Trash2, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ImageUpload } from "@/components/ui/ImageUpload";

const categories = [
  { value: "packaging-tapes", label: "Packaging Tapes" },
  { value: "specialty-tapes", label: "Specialty Adhesive Tapes" },
  { value: "protective-films", label: "Protective Films" },
  { value: "custom-solutions", label: "Custom Solutions" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as Id<"products">;

  const product = useQuery(api.products.getProductById, { productId });
  const updateProduct = useMutation(api.products.updateProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    features: [""],
    specifications: {
      thickness: "",
      width: "",
      length: "",
      adhesive: "",
      material: "",
    },
    applications: [""],
    certifications: [""],
    imageUrl: "",
    status: "active",
    featured: false,
  });

  useEffect(() => {
    if (product) {
      //@ts-no-check
      setFormData({
        name: product.name,
        slug: product.slug,
        category: product.category,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        features: product.features.length > 0 ? product.features : [""],
        specifications: {
          thickness: product.specifications?.thickness || "",
          width: product.specifications?.width || "",
          length: product.specifications?.length || "",
          adhesive: product.specifications?.adhesive || "",
          material: product.specifications?.material || "",
        },
        applications:
          product.applications.length > 0 ? product.applications : [""],
        certifications:
          product.certifications.length > 0 ? product.certifications : [""],
        imageUrl: product.imageUrl || "",
        status: product.status,
        featured: product.featured,
      });
      setIsLoading(false);
    }
  }, [product]);

  if (isLoading || !product) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateProduct({
        productId,
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        features: formData.features.filter((f) => f.trim() !== ""),
        specifications: formData.specifications,
        applications: formData.applications.filter((a) => a.trim() !== ""),
        certifications: formData.certifications.filter((c) => c.trim() !== ""),
        imageUrl: formData.imageUrl,
        status: formData.status,
        featured: formData.featured,
      });
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to update product:", error);
      setIsSubmitting(false);
    }
  };

  const addField = (field: "features" | "applications" | "certifications") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeField = (
    field: "features" | "applications" | "certifications",
    index: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const updateField = (
    field: "features" | "applications" | "certifications",
    index: number,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center space-x-4"
      >
        <Button
          variant="ghost"
          onClick={() => router.push("/admin/products")}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground mt-2">Update product information</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value }))
                    }
                    placeholder="product-name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      shortDescription: e.target.value,
                    }))
                  }
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description *</Label>
                <Textarea
                  id="fullDescription"
                  value={formData.fullDescription}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullDescription: e.target.value,
                    }))
                  }
                  rows={6}
                  required
                />
              </div>

              <ImageUpload
                value={formData.imageUrl}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, imageUrl: value }))
                }
                label="Product Image"
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="thickness">Thickness</Label>
                  <Input
                    id="thickness"
                    value={formData.specifications.thickness}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        specifications: {
                          ...prev.specifications,
                          thickness: e.target.value,
                        },
                      }))
                    }
                    placeholder="e.g., 40-50 micron"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    value={formData.specifications.width}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        specifications: {
                          ...prev.specifications,
                          width: e.target.value,
                        },
                      }))
                    }
                    placeholder="e.g., 24mm - 72mm"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length</Label>
                  <Input
                    id="length"
                    value={formData.specifications.length}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        specifications: {
                          ...prev.specifications,
                          length: e.target.value,
                        },
                      }))
                    }
                    placeholder="e.g., 50m - 1000m"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adhesive">Adhesive Type</Label>
                  <Input
                    id="adhesive"
                    value={formData.specifications.adhesive}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        specifications: {
                          ...prev.specifications,
                          adhesive: e.target.value,
                        },
                      }))
                    }
                    placeholder="e.g., Water-based Acrylic"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    value={formData.specifications.material}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        specifications: {
                          ...prev.specifications,
                          material: e.target.value,
                        },
                      }))
                    }
                    placeholder="e.g., BOPP Film"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={feature}
                    onChange={(e) =>
                      updateField("features", index, e.target.value)
                    }
                    placeholder={`Feature ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField("features", index)}
                    disabled={formData.features.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addField("features")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.applications.map((app, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={app}
                    onChange={(e) =>
                      updateField("applications", index, e.target.value)
                    }
                    placeholder={`Application ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField("applications", index)}
                    disabled={formData.applications.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addField("applications")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Application
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={cert}
                    onChange={(e) =>
                      updateField("certifications", index, e.target.value)
                    }
                    placeholder={`Certification ${index + 1}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeField("certifications", index)}
                    disabled={formData.certifications.length === 1}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => addField("certifications")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="discontinued">Discontinued</SelectItem>
                    <SelectItem value="coming-soon">Coming Soon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="featured">Featured Product</Label>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex items-center space-x-4"
        >
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/products")}
          >
            Cancel
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
}
