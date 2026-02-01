"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit,
  Loader2,
  Factory,
  CheckCircle2,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

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

export default function IndustriesAdminPage() {
  const industries = useQuery(api.industries.getIndustries, {});
  const deleteIndustry = useMutation(api.industries.deleteIndustry);
  const [deletingId, setDeletingId] = useState<Id<"industries"> | null>(null);

  if (industries === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleDelete = async (id: Id<"industries">) => {
    setDeletingId(id);
    try {
      await deleteIndustry({ industryId: id });
    } catch (error) {
      console.error("Failed to delete industry:", error);
    } finally {
      setDeletingId(null);
    }
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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Industries</h1>
          <p className="text-muted-foreground mt-2">
            Manage industry sectors and case studies
          </p>
        </div>
        <Link href="/admin/industries/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Industry
          </Button>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {industries.map((industry, index) => (
            <motion.div
              key={industry._id}
              variants={itemVariants}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Factory className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle>{industry.title}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link href={`/admin/industries/${industry._id}/edit`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Industry</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete &quot;
                              {industry.title}&quot;? This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(industry._id)}
                              disabled={deletingId === industry._id}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              {deletingId === industry._id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Delete"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {industry.fullDescription}
                  </motion.p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="font-semibold mb-3">Applications</h4>
                      <ul className="space-y-2">
                        {industry.applications.map(
                          (app: string, idx: number) => (
                            <motion.li
                              key={idx}
                              className="flex items-start text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              {app}
                            </motion.li>
                          ),
                        )}
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="font-semibold mb-3">Products</h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.products.map(
                          (product: string, idx: number) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                            >
                              <Badge variant="secondary">{product}</Badge>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="bg-muted rounded-lg p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Case Study</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Client:</span>{" "}
                        {industry.caseStudy.client}
                      </p>
                      <p>
                        <span className="font-medium">Challenge:</span>{" "}
                        {industry.caseStudy.challenge}
                      </p>
                      <p>
                        <span className="font-medium">Solution:</span>{" "}
                        {industry.caseStudy.solution}
                      </p>
                      <p className="text-primary font-medium">
                        Result: {industry.caseStudy.result}
                      </p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {industries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Factory className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No industries found</p>
            <Link href="/admin/industries/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add your first industry
              </Button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
