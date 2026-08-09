"use client";

import { useState } from "react";
import { Shell } from "@/components/shell";
import { Header } from "@/components/header";

interface VerificationItem {
  id: string;
  userId: string;
  displayName: string;
  age: number;
  submittedAt: string;
  waitTime: string;
  imageUrls: string[];
  status: "pending" | "approved" | "rejected";
  condition: string;
  notes: string;
}

const MOCK_QUEUE: VerificationItem[] = [
  {
    id: "v1",
    userId: "u1",
    displayName: "Sarah M.",
    age: 28,
    submittedAt: "2026-08-09T14:30:00Z",
    waitTime: "18h",
    imageUrls: ["/placeholder-med.jpg", "/placeholder-card.jpg"],
    status: "pending",
    condition: "HIV",
    notes: "",
  },
  {
    id: "v2",
    userId: "u2",
    displayName: "James K.",
    age: 34,
    submittedAt: "2026-08-09T08:15:00Z",
    waitTime: "24h",
    imageUrls: ["/placeholder-med.jpg"],
    status: "pending",
    condition: "Hepatitis B",
    notes: "",
  },
  {
    id: "v3",
    userId: "u3",
    displayName: "Amina L.",
    age: 26,
    submittedAt: "2026-08-10T02:00:00Z",
    waitTime: "6h",
    imageUrls: ["/placeholder-card.jpg", "/placeholder-med.jpg"],
    status: "pending",
    condition: "Type 1 Diabetes",
    notes: "",
  },
  {
    id: "v4",
    userId: "u4",
    displayName: "David R.",
    age: 31,
    submittedAt: "2026-08-09T20:45:00Z",
    waitTime: "12h",
    imageUrls: ["/placeholder-med.jpg"],
    status: "pending",
    condition: "HIV",
    notes: "",
  },
  {
    id: "v5",
    userId: "u5",
    displayName: "Lisa P.",
    age: 29,
    submittedAt: "2026-08-10T04:00:00Z",
    waitTime: "4h",
    imageUrls: ["/placeholder-card.jpg"],
    status: "pending",
    condition: "Lupus",
    notes: "",
  },
];

type Filter = "all" | "pending" | "approved" | "rejected";
type Sort = "oldest" | "newest";

export default function VerificationPage() {
  const [queue, setQueue] = useState(MOCK_QUEUE);
  const [filter, setFilter] = useState<Filter>("pending");
  const [sort, setSort] = useState<Sort>("oldest");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);

  const filtered = queue
    .filter((item) => filter === "all" || item.status === filter)
    .sort((a, b) =>
      sort === "oldest"
        ? new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime()
        : new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

  const selected = queue.find((item) => item.id === selectedId);

  function handleApprove(id: string) {
    setQueue((q) =>
      q.map((item) => (item.id === id ? { ...item, status: "approved" as const } : item))
    );
    setSelectedId(null);
  }

  function handleReject(id: string) {
    setQueue((q) =>
      q.map((item) =>
        item.id === id ? { ...item, status: "rejected" as const, notes: rejectReason } : item
      )
    );
    setRejectReason("");
    setShowRejectModal(false);
    setSelectedId(null);
  }

  return (
    <Shell>
      <Header title="Verification Queue" />
      <div className="flex-1 flex overflow-hidden">
        {/* Queue list */}
        <div className="w-full lg:w-[400px] border-r border-[#E5E5E5] flex flex-col bg-white">
          {/* Filters */}
          <div className="p-4 border-b border-[#E5E5E5] space-y-3">
            <div className="flex gap-2">
              {(["pending", "approved", "rejected", "all"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize transition-colors ${
                    filter === f
                      ? "bg-[#E8175D] text-white"
                      : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E5E5]"
                  }`}
                >
                  {f}
                  {f === "pending" && (
                    <span className="ml-1">({queue.filter((q) => q.status === "pending").length})</span>
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#6B7280]">{filtered.length} items</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="text-xs border border-[#E5E5E5] rounded-md px-2 py-1"
              >
                <option value="oldest">Oldest first</option>
                <option value="newest">Newest first</option>
              </select>
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left p-4 border-b border-[#F3F4F6] hover:bg-[#FAFAFA] transition-colors ${
                  selectedId === item.id ? "bg-[#E8175D]/5 border-l-2 border-l-[#E8175D]" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#0A0A0A]">
                      {item.displayName}, {item.age}
                    </p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{item.condition}</p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.status === "pending"
                          ? "bg-[#F59E0B]/10 text-[#F59E0B]"
                          : item.status === "approved"
                          ? "bg-[#10B981]/10 text-[#10B981]"
                          : "bg-[#EF4444]/10 text-[#EF4444]"
                      }`}
                    >
                      {item.status}
                    </span>
                    <p className="text-xs text-[#6B7280] mt-1">Wait: {item.waitTime}</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {item.imageUrls.map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-[#F3F4F6] rounded border border-[#E5E5E5]" />
                  ))}
                  <span className="text-xs text-[#6B7280] ml-1 self-center">
                    {item.imageUrls.length} image{item.imageUrls.length > 1 ? "s" : ""}
                  </span>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="p-8 text-center text-sm text-[#6B7280]">
                No items in this category
              </div>
            )}
          </div>
        </div>

        {/* Detail panel */}
        <div className="hidden lg:flex flex-1 flex-col bg-[#FAFAFA]">
          {selected ? (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-2xl mx-auto space-y-6">
                {/* User info */}
                <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-[#0A0A0A]">
                        {selected.displayName}, {selected.age}
                      </h2>
                      <p className="text-sm text-[#6B7280]">
                        Submitted {selected.waitTime} ago
                      </p>
                    </div>
                    <span className="text-xs font-medium bg-[#F3F4F6] text-[#6B7280] px-3 py-1 rounded-full">
                      {selected.condition}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B7280] space-y-1">
                    <p>User ID: {selected.userId}</p>
                    <p>Submitted: {new Date(selected.submittedAt).toLocaleString()}</p>
                  </div>
                </div>

                {/* Verification images */}
                <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                  <h3 className="text-sm font-semibold text-[#0A0A0A] mb-4">
                    Verification Images
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selected.imageUrls.map((_, i) => (
                      <div
                        key={i}
                        className="aspect-[4/3] bg-[#F3F4F6] rounded-lg border border-[#E5E5E5] flex items-center justify-center"
                      >
                        <div className="text-center">
                          <svg className="w-8 h-8 text-[#6B7280] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs text-[#6B7280]">
                            {i === 0 ? "Medication photo" : "Clinic card photo"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#6B7280] mt-3">
                    Images taken via camera only (no gallery uploads). Will be permanently deleted after decision.
                  </p>
                </div>

                {/* Review checklist */}
                <div className="bg-white rounded-xl border border-[#E5E5E5] p-5">
                  <h3 className="text-sm font-semibold text-[#0A0A0A] mb-4">
                    Review Checklist
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Image is clear and readable",
                      "Medication/card matches claimed condition",
                      "Image appears to be a live camera capture",
                      "No signs of photo manipulation",
                      "Personal info (name/ID) is visible on document",
                    ].map((check, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#E5E5E5] text-[#E8175D] focus:ring-[#E8175D]"
                        />
                        <span className="text-sm text-[#0A0A0A]">{check}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {selected.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleApprove(selected.id)}
                      className="flex-1 py-3 bg-[#10B981] text-white text-sm font-semibold rounded-xl hover:bg-[#059669] transition-colors"
                    >
                      Approve & Delete Images
                    </button>
                    <button
                      onClick={() => setShowRejectModal(true)}
                      className="flex-1 py-3 bg-[#EF4444] text-white text-sm font-semibold rounded-xl hover:bg-[#DC2626] transition-colors"
                    >
                      Reject & Delete Images
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#6B7280]">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3 text-[#E5E5E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">Select an item to review</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reject modal */}
      {showRejectModal && selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#0A0A0A]">Reject Verification</h3>
            <p className="text-sm text-[#6B7280]">
              Provide a reason for rejection. The user will be notified and can re-submit.
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0A0A0A]">Reason</label>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select reason...</option>
                <option value="blurry">Image too blurry / unreadable</option>
                <option value="mismatch">Document doesn't match claimed condition</option>
                <option value="manipulated">Image appears manipulated</option>
                <option value="wrong_doc">Wrong type of document submitted</option>
                <option value="incomplete">Not enough information visible</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2.5 border border-[#E5E5E5] text-sm font-medium rounded-lg hover:bg-[#F3F4F6] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(selected.id)}
                disabled={!rejectReason}
                className="flex-1 py-2.5 bg-[#EF4444] text-white text-sm font-medium rounded-lg hover:bg-[#DC2626] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}
