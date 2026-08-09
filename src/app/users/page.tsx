"use client";

import { useState } from "react";
import { Shell } from "@/components/shell";
import { Header } from "@/components/header";

interface User {
  id: string;
  displayName: string;
  email: string;
  age: number;
  condition: string;
  verified: boolean;
  subscriptionTier: "free" | "plus" | "premium";
  createdAt: string;
  lastActive: string;
  status: "active" | "suspended" | "banned";
}

const MOCK_USERS: User[] = [
  { id: "u1", displayName: "Sarah M.", email: "sarah@example.com", age: 28, condition: "HIV", verified: true, subscriptionTier: "premium", createdAt: "2026-06-15", lastActive: "2 hours ago", status: "active" },
  { id: "u2", displayName: "James K.", email: "james@example.com", age: 34, condition: "Hepatitis B", verified: true, subscriptionTier: "plus", createdAt: "2026-07-01", lastActive: "1 day ago", status: "active" },
  { id: "u3", displayName: "Amina L.", email: "amina@example.com", age: 26, condition: "Type 1 Diabetes", verified: true, subscriptionTier: "free", createdAt: "2026-07-20", lastActive: "5 hours ago", status: "active" },
  { id: "u4", displayName: "David R.", email: "david@example.com", age: 31, condition: "HIV", verified: false, subscriptionTier: "free", createdAt: "2026-08-01", lastActive: "3 days ago", status: "suspended" },
  { id: "u5", displayName: "Lisa P.", email: "lisa@example.com", age: 29, condition: "Lupus", verified: true, subscriptionTier: "free", createdAt: "2026-08-05", lastActive: "12 hours ago", status: "active" },
  { id: "u6", displayName: "Michael T.", email: "michael@example.com", age: 42, condition: "Crohn's Disease", verified: true, subscriptionTier: "plus", createdAt: "2026-05-10", lastActive: "30 min ago", status: "active" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended" | "banned">("all");

  const filtered = MOCK_USERS.filter((u) => {
    const matchesSearch =
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Shell>
      <Header title="Users" />
      <div className="p-6 space-y-4">
        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#E8175D]"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "active", "suspended", "banned"] as const).map((s) => (
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
              </button>
            ))}
          </div>
        </div>

        {/* Users table */}
        <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
                  <th className="text-left text-xs font-medium text-[#6B7280] px-4 py-3">User</th>
                  <th className="text-left text-xs font-medium text-[#6B7280] px-4 py-3">Condition</th>
                  <th className="text-left text-xs font-medium text-[#6B7280] px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-[#6B7280] px-4 py-3">Tier</th>
                  <th className="text-left text-xs font-medium text-[#6B7280] px-4 py-3">Last Active</th>
                  <th className="text-left text-xs font-medium text-[#6B7280] px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-b border-[#F3F4F6] hover:bg-[#FAFAFA]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                          <span className="text-xs font-medium text-[#6B7280]">
                            {user.displayName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#0A0A0A]">{user.displayName}</p>
                          <p className="text-xs text-[#6B7280]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-[#F3F4F6] text-[#6B7280] px-2 py-1 rounded-full">
                        {user.condition}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          user.status === "active"
                            ? "bg-[#10B981]/10 text-[#10B981]"
                            : user.status === "suspended"
                            ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                            : "bg-[#EF4444]/10 text-[#EF4444]"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium capitalize ${
                          user.subscriptionTier === "premium"
                            ? "text-[#E8175D]"
                            : user.subscriptionTier === "plus"
                            ? "text-[#6366F1]"
                            : "text-[#6B7280]"
                        }`}
                      >
                        {user.subscriptionTier}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#6B7280]">{user.lastActive}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-[#6B7280] hover:text-[#0A0A0A] font-medium">
                          View
                        </button>
                        {user.status === "active" ? (
                          <button className="text-xs text-[#F59E0B] hover:text-[#D97706] font-medium">
                            Suspend
                          </button>
                        ) : (
                          <button className="text-xs text-[#10B981] hover:text-[#059669] font-medium">
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Shell>
  );
}
