"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AdminUser {
  id: string;
  email: string;
  role: "reviewer" | "admin" | "super_admin";
}

interface AdminStore {
  user: AdminUser | null;
  sidebarOpen: boolean;
  setUser: (user: AdminUser | null) => void;
  toggleSidebar: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      user: null,
      sidebarOpen: true,
      setUser: (user) => set({ user }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }),
    { name: "blume-admin" }
  )
);
