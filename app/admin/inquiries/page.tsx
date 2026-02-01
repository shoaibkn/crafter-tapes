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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
        <p className="text-muted-foreground mt-2">
          Manage contact form submissions and leads
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statusOptions.map((status) => {
          const count = inquiries.filter(
            (i: { status: string }) => i.status === status.value,
          ).length;
          return (
            <Card key={status.value}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {status.label}
                    </p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                  <div className={`${status.color} p-2 rounded-lg`}>
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No inquiries yet</p>
            </CardContent>
          </Card>
        ) : (
          inquiries.map((inquiry) => (
              <Card key={inquiry._id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{inquiry.name}</CardTitle>
                      {getStatusBadge(inquiry.status)}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {new Date(inquiry.createdAt).toLocaleString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="text-sm hover:underline"
                      >
                        {inquiry.email}
                      </a>
                    </div>
                    {inquiry.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="text-sm hover:underline"
                        >
                          {inquiry.phone}
                        </a>
                      </div>
                    )}
                    {inquiry.company && (
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{inquiry.company}</span>
                      </div>
                    )}
                    {inquiry.productInterest && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Interested in: {inquiry.productInterest}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm font-medium mb-2">Message:</p>
                    <p className="text-sm text-muted-foreground">
                      {inquiry.message}
                    </p>
                  </div>

                  {inquiry.quantity && (
                    <p className="text-sm">
                      <span className="font-medium">Estimated Quantity:</span>{" "}
                      {inquiry.quantity}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
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
                </CardContent>
              </Card>
            ),
          )
        )}
      </div>
    </div>
  );
}
