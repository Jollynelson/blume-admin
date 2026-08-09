"use client";

import { useState } from "react";
import { Shell } from "@/components/shell";
import { Header } from "@/components/header";

interface Report {
  id: string;
  reporterName: string;
  reportedName: string;
  reason: string;
  description: string;
  createdAt: string;
  status: "open" | "reviewing" | "resolved" | "dismissed";
  priority: "low" | "medium" | "high";
}

const MOCK_REPORTS: Report[] = [
  {
    id: "r1",
    reporterName: "Sarah M.",
    reportedName: "Unknown User",
    reason: "Fake profile",
    description: "This profile appears to use stock photos and has inconsistent information.",
    createdAt: "2026-08-09T10:00:00Z",
    status: "open",
    priority: "high",
  },
  {
    id: "r2",
    reporterName: "James K.",
    reportedName: "David R.",
    reason: "Harassment",
    description: "Sending aggressive messages after being declined.",
    createdAt: "2026-08-08T15:30:00Z",
    status: "reviewing",
    priority: "high",
  },
  {
    id: "r3",
    reporterName: "Lisa P.",
    reportedName: "Michael T.",
    reason: "Inappropriate content",
    description: "Profile bio contains explicit content that violates community guidelines.",
    createdAt: "2026-08-07T09:00:00Z",
    status: "open",
    priority: "medium",
  },
  {
    id: "r4",
    reporterName: "Amina L.",
    reportedName: "Spam Account",
    reason: "Spam",
    description: "Sending links to external websites to multiple users.",
    createdAt: "2026-08-06T14:00:00Z",
    status: "resolved",
    priority: "low",
  },
];

export default function ReportsPage() {
  const [reports] = useState(MOCK_REPORTS);
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "reviewing" | "resolved" | "dismissed">("all");

  const filtered = reports.filter(
    (r) => statusFilter === "all" || r.status === statusFilter
  );

  return (
    <Shell>
      <Header title="Reports" />
      <div className="p-6 space-y-4">
        {/* Filters */}
        <div className="flex gap-2">
          {(["all", "open", "reviewing", "resolved", "dismissed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs font-medium px-3 py-2 rounded-lg capitalize transition-colors ${
                statusFilter === s
                  ? "bg-[#E8175D] text-white"
                  : "bg-white border border-[#E5E5E5] text-[#6B7280] hover:bg-[#F3F4F6]"
              }`}
            >
              {s}
              {s === "open" && (
                <span className="ml-1">({reports.filter((r) => r.status === "open").length})</span>
              )}
            </button>
          ))}
        </div>

        {/* Reports list */}
        <div className="space-y-3">
          {filtered.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl border border-[#E5E5E5] p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      report.priority === "high"
                        ? "bg-[#EF4444]"
                        : report.priority === "medium"
                        ? "bg-[#F59E0B]"
                        : "bg-[#6B7280]"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-[#0A0A0A]">{report.reason}</p>
                    <p className="text-xs text-[#6B7280]">
                      {report.reporterName} reported {report.reportedName}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    report.status === "open"
                      ? "bg-[#EF4444]/10 text-[#EF4444]"
                      : report.status === "reviewing"
                      ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                      : report.status === "resolved"
                      ? "bg-[#10B981]/10 text-[#10B981]"
                      : "bg-[#6B7280]/10 text-[#6B7280]"
                  }`}
                >
                  {report.status}
                </span>
              </div>
              <p className="text-sm text-[#6B7280] mb-3">{report.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#6B7280]">
                  {new Date(report.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  {report.status !== "resolved" && report.status !== "dismissed" && (
                    <>
                      <button className="text-xs font-medium text-[#10B981] hover:text-[#059669]">
                        Resolve
                      </button>
                      <button className="text-xs font-medium text-[#6B7280] hover:text-[#0A0A0A]">
                        Dismiss
                      </button>
                      {report.priority === "high" && (
                        <button className="text-xs font-medium text-[#EF4444] hover:text-[#DC2626]">
                          Ban User
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}
