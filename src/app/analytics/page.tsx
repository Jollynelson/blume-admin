"use client";

import { Shell } from "@/components/shell";
import { Header } from "@/components/header";

const METRICS = [
  { label: "New Users (7d)", value: "142", change: "+18%", positive: true },
  { label: "Verifications (7d)", value: "89", change: "+12%", positive: true },
  { label: "Matches Made (7d)", value: "234", change: "+5%", positive: true },
  { label: "Reports (7d)", value: "7", change: "-22%", positive: true },
  { label: "Avg Verification Time", value: "4.2h", change: "-15%", positive: true },
  { label: "Rejection Rate", value: "8%", change: "+2%", positive: false },
];

const CONDITION_BREAKDOWN = [
  { condition: "HIV", count: 842, pct: 45.5 },
  { condition: "Hepatitis B/C", count: 312, pct: 16.9 },
  { condition: "Type 1 Diabetes", count: 198, pct: 10.7 },
  { condition: "Lupus", count: 124, pct: 6.7 },
  { condition: "Crohn's/Colitis", count: 98, pct: 5.3 },
  { condition: "Other", count: 273, pct: 14.8 },
];

const TIER_BREAKDOWN = [
  { tier: "Free", count: 1203, pct: 65.1 },
  { tier: "Plus", count: 412, pct: 22.3 },
  { tier: "Premium", count: 232, pct: 12.6 },
];

export default function AnalyticsPage() {
  return (
    <Shell>
      <Header title="Analytics" />
      <div className="p-6 space-y-6">
        {/* Key metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-white rounded-xl border border-[#E5E5E5] p-5">
              <p className="text-sm text-[#6B7280] mb-1">{m.label}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-[#0A0A0A]">{m.value}</span>
                <span
                  className={`text-xs font-medium ${
                    m.positive ? "text-[#10B981]" : "text-[#EF4444]"
                  }`}
                >
                  {m.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Condition breakdown */}
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
            <h2 className="text-sm font-semibold text-[#0A0A0A] mb-4">
              Users by Condition
            </h2>
            <div className="space-y-3">
              {CONDITION_BREAKDOWN.map((item) => (
                <div key={item.condition} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#0A0A0A]">{item.condition}</span>
                    <span className="text-xs text-[#6B7280]">
                      {item.count} ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#E8175D] rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier breakdown */}
          <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
            <h2 className="text-sm font-semibold text-[#0A0A0A] mb-4">
              Subscription Distribution
            </h2>
            <div className="space-y-4">
              {TIER_BREAKDOWN.map((item) => (
                <div key={item.tier} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#0A0A0A]">{item.tier}</span>
                    <span className="text-xs text-[#6B7280]">
                      {item.count} ({item.pct}%)
                    </span>
                  </div>
                  <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${item.pct}%`,
                        background:
                          item.tier === "Premium"
                            ? "#E8175D"
                            : item.tier === "Plus"
                            ? "#6366F1"
                            : "#6B7280",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#F3F4F6]">
              <h3 className="text-xs font-medium text-[#6B7280] mb-3">Revenue (Monthly)</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Plus ($14.99 x 412)</span>
                  <span className="font-medium">$6,176</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B7280]">Premium ($29.99 x 232)</span>
                  <span className="font-medium">$6,958</span>
                </div>
                <div className="flex justify-between text-sm pt-2 border-t border-[#F3F4F6]">
                  <span className="font-medium">Total MRR</span>
                  <span className="font-bold text-[#E8175D]">$13,134</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
