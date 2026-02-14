"use client";

import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
import {
  Loader2,
  MessageSquare,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  User,
  Building2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

const statusOptions = [
  { value: "new", label: "New", color: "bg-blue-500" },
  { value: "contacted", label: "Contacted", color: "bg-yellow-500" },
  { value: "qualified", label: "Qualified", color: "bg-green-500" },
  { value: "closed", label: "Closed", color: "bg-gray-500" },
];

export default function InquiriesAdminPage() {
  const inquiries = useQuery(api.inquiries.getInquiries, {});
  const updateStatus = useMutation(api.inquiries.updateInquiryStatus);
  const [updatingId, setUpdatingId] = useState<Id<"inquiries"> | null>(null);
  const [expandedId, setExpandedId] = useState<Id<"inquiries"> | null>(null);

  if (inquiries === undefined) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const handleStatusChange = async (
    inquiryId: Id<"inquiries">,
    newStatus: string,
  ) => {
    setUpdatingId(inquiryId);
    try {
      await updateStatus({ inquiryId, status: newStatus });
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find((s) => s.value === status);
    return (
      <Badge className={statusOption?.color || "bg-gray-500"}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Inquiries</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
          Manage contact form submissions and leads
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statusOptions.map((status) => {
          const count = inquiries.filter(
            (i: { status: string }) => i.status === status.value,
          ).length;
          return (
            <Card key={status.value}>
              <CardContent className="p-4 sm:pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {status.label}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold">{count}</p>
                  </div>
                  <div className={`${status.color} p-2 rounded-lg flex-shrink-0`}>
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Inquiries List */}
      <div className="space-y-3 sm:space-y-4">
        {inquiries.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No inquiries yet</p>
            </CardContent>
          </Card>
        ) : (
          inquiries.map((inquiry) => {
            const isExpanded = expandedId === inquiry._id;
            return (
              <Card key={inquiry._id}>
                <CardHeader className="pb-3">
                  <div 
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : inquiry._id)}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                      <CardTitle className="text-base sm:text-lg truncate">{inquiry.name}</CardTitle>
                      <div className="hidden sm:block">
                        {getStatusBadge(inquiry.status)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="sm:hidden">
                        {getStatusBadge(inquiry.status)}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mt-2 sm:hidden">
                    <Clock className="h-3 w-3" />
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </div>
                </CardHeader>
                
                <CardContent className={isExpanded ? "block" : "hidden sm:block"}>
                  <div className="space-y-4">
                    {/* Contact Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-sm hover:underline truncate"
                        >
                          {inquiry.email}
                        </a>
                      </div>
                      {inquiry.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="text-sm hover:underline"
                          >
                            {inquiry.phone}
                          </a>
                        </div>
                      )}
                      {inquiry.company && (
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm">{inquiry.company}</span>
                        </div>
                      )}
                      {inquiry.productInterest && (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm truncate">
                            Interested in: {inquiry.productInterest}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Message */}
                    <div className="bg-muted rounded-lg p-3 sm:p-4">
                      <p className="text-sm font-medium mb-2">Message:</p>
                      <p className="text-sm text-muted-foreground">
                        {inquiry.message}
                      </p>
                    </div>

                    {/* Quantity */}
                    {inquiry.quantity && (
                      <p className="text-sm">
                        <span className="font-medium">Estimated Quantity:</span>{" "}
                        {inquiry.quantity}
                      </p>
                    )}

                    {/* Status Update */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          Update Status:
                        </span>
                        <Select
                          value={inquiry.status}
                          onValueChange={(value) =>
                            handleStatusChange(inquiry._id, value)
                          }
                          disabled={updatingId === inquiry._id}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {updatingId === inquiry._id && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
