"use client";

import { Shell } from "@/components/shell";
import { Header } from "@/components/header";

const STATS = [
  { label: "Pending Verifications", value: "12", change: "+3 today", color: "#F59E0B" },
  { label: "Total Users", value: "1,847", change: "+24 this week", color: "#10B981" },
  { label: "Active Reports", value: "5", change: "2 urgent", color: "#EF4444" },
  { label: "Verified Today", value: "8", change: "avg 6/day", color: "#E8175D" },
];

const RECENT_ACTIVITY = [
  { action: "Approved", user: "sarah_m", time: "2 min ago", type: "verification" },
  { action: "Rejected", user: "fake_profile_23", time: "15 min ago", type: "verification" },
  { action: "Resolved", user: "Report #234", time: "1 hr ago", type: "report" },
  { action: "Approved", user: "james_k", time: "1 hr ago", type: "verification" },
  { action: "Suspended", user: "spam_user_1", time: "3 hr ago", type: "moderation" },
];

export default function DashboardPage() {
  return (
    <Shell>
      <Header title="Dashboard" />
      <div className="p-6 space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-[#E5E5E5] p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[#6B7280]">{stat.label}</span>
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: stat.color }}
                />
              </div>
              <p className="text-2xl font-bold text-[#0A0A0A]">{stat.value}</p>
              <p className="text-xs text-[#6B7280] mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent activity */}
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
            <h2 className="text-sm font-semibold text-[#0A0A0A] mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.action === "Approved"
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : item.action === "Rejected" || item.action === "Suspended"
                          ? "bg-[#EF4444]/10 text-[#EF4444]"
                          : "bg-[#6B7280]/10 text-[#6B7280]"
                      }`}
                    >
                      {item.action}
                    </span>
                    <span className="text-sm text-[#0A0A0A]">{item.user}</span>
                  </div>
                  <span className="text-xs text-[#6B7280]">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Queue summary */}
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
            <h2 className="text-sm font-semibold text-[#0A0A0A] mb-4">
              Verification Queue
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Waiting &gt; 24h</span>
                <span className="text-sm font-medium text-[#EF4444]">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Waiting 12-24h</span>
                <span className="text-sm font-medium text-[#F59E0B]">4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">Waiting &lt; 12h</span>
                <span className="text-sm font-medium text-[#10B981]">5</span>
              </div>
              <div className="pt-3 border-t border-[#F3F4F6]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#0A0A0A]">Total pending</span>
                  <span className="text-lg font-bold text-[#E8175D]">12</span>
                </div>
              </div>
              <a
                href="/verification"
                className="block w-full text-center py-2.5 bg-[#E8175D] text-white text-sm font-medium rounded-lg hover:bg-[#C71450] transition-colors"
              >
                Review Queue
              </a>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
