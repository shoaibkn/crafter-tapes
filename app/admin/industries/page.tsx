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
  const [industryToDelete, setIndustryToDelete] = useState<{ _id: Id<"industries">; title: string } | null>(null);

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
      setIndustryToDelete(null);
    }
  };

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Industries</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Manage industry sectors and case studies
          </p>
        </div>
        <Link href={"/admin/industries/new" as any}>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Industry
          </Button>
        </Link>
      </motion.div>

      <motion.div variants={itemVariants} className="grid gap-4 sm:gap-6">
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
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="flex-shrink-0"
                      >
                        <Factory className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-lg sm:text-xl truncate">{industry.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Link href={`/admin/industries/${industry._id}/edit` as any}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                        onClick={() => setIndustryToDelete({ _id: industry._id, title: industry.title })}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <motion.p
                    className="text-muted-foreground text-sm sm:text-base"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {industry.fullDescription}
                  </motion.p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Applications</h4>
                      <ul className="space-y-2">
                        {industry.applications.slice(0, 4).map(
                          (app: string, idx: number) => (
                            <motion.li
                              key={idx}
                              className="flex items-start text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{app}</span>
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
                      <h4 className="font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Products</h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.products.slice(0, 6).map(
                          (product: string, idx: number) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + idx * 0.05 }}
                            >
                              <Badge variant="secondary" className="text-xs">{product}</Badge>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    className="bg-muted rounded-lg p-3 sm:p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <h4 className="font-semibold text-sm sm:text-base">Case Study</h4>
                    </div>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
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
            <Link href={"/admin/industries/new" as any}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add your first industry
              </Button>
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* Delete Dialog */}
      <AlertDialog open={!!industryToDelete} onOpenChange={() => setIndustryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Industry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{industryToDelete?.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => industryToDelete && handleDelete(industryToDelete._id)}
              disabled={deletingId === industryToDelete?._id}
              className="bg-red-500 hover:bg-red-600"
            >
              {deletingId === industryToDelete?._id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}
