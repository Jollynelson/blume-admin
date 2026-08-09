"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminStore } from "@/stores/admin-store";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAdminStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === "admin@blume.app" && password === "admin123") {
      setUser({ id: "admin-1", email, role: "super_admin" });
      router.push("/");
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-[#FAFAFA] p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#E8175D] mb-1">Blume Admin</h1>
          <p className="text-sm text-[#6B7280]">Verification & Moderation Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl border border-[#E5E5E5] p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0A0A0A]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@blume.app"
              className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#E8175D]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#0A0A0A]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2.5 border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:border-[#E8175D]"
            />
          </div>

          {error && (
            <p className="text-xs text-[#EF4444]">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-[#E8175D] text-white text-sm font-semibold rounded-lg hover:bg-[#C71450] transition-colors"
          >
            Sign In
          </button>

          <p className="text-xs text-[#6B7280] text-center">
            Demo: admin@blume.app / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
