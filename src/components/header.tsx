"use client";

import { useAdminStore } from "@/stores/admin-store";

export function Header({ title }: { title: string }) {
  const { toggleSidebar } = useAdminStore();

  return (
    <header className="h-16 border-b border-[#E5E5E5] bg-white flex items-center px-6 gap-4">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[#F3F4F6]"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 className="text-lg font-semibold text-[#0A0A0A]">{title}</h1>
    </header>
  );
}
