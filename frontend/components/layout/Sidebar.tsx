"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FileText,
  Upload,
  Settings,
  LogOut,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Claims",
    href: "/dashboard/claims",
    icon: FileText,
  },
  {
    name: "Upload Receipt",
    href: "/dashboard/upload",
    icon: Upload,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

async function handleLogout() {
  try {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_URL is not configured"
      );
    }

    const response = await fetch(
  "/api/auth/logout",
  {
    method: "POST",
  }
);

    const result = await response.json();

    console.log(
      "Logout response:",
      result
    );

    if (!response.ok) {
      throw new Error(
        result.message ||
          "Logout failed"
      );
    }

    console.log(
      "Logout successful:",
      result
    );

    /**
     * Force a full browser navigation.
     *
     * This ensures the browser requests
     * /login again and Next.js middleware
     * runs with the updated cookie state.
     */
    window.location.href = "/login";

  } catch (error) {
    console.error(
      "Logout error:",
      error
    );
  }
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">

      {/* SIDEBAR HEADER */}

      <div className="border-b border-base-300 px-6 py-5">
        <h2 className="text-lg font-bold">
          ExpenseAI
        </h2>

        <p className="mt-1 text-xs text-base-content/50">
          Expense Management
        </p>
      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 overflow-y-auto p-4">

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-base-content/40">
          Workspace
        </p>

        <div className="space-y-1">

          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive =
  item.href === "/dashboard"
    ? pathname === "/dashboard"
    : pathname === item.href ||
      pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3
                  rounded-xl px-3 py-3
                  text-sm font-medium
                  transition-all
                  ${
                    isActive
                      ? "bg-primary text-primary-content shadow-sm"
                      : "text-base-content/60 hover:bg-base-200 hover:text-base-content"
                  }
                `}
              >
                <Icon size={19} />

                <span>
                  {item.name}
                </span>
              </Link>
            );
          })}

        </div>

      </nav>

      {/* SIDEBAR FOOTER */}

      <div className="border-t border-base-300 p-4">

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-error transition-colors hover:bg-error/10"
        >
          <LogOut size={19} />

          <span>
            Logout
          </span>
        </button>

      </div>

    </div>
  );
}