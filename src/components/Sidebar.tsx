"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  userEmail: string;
}

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-3m0 0l8-4 8 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 4h4"
        />
      </svg>
    ),
  },
  {
    label: "Products",
    href: "/products",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
  },
];

export function Sidebar({ userEmail }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white/3 backdrop-blur-2xl border-r border-white/10 transition-[width] duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-14"
        } z-40 overflow-y-auto scrollbar-hide`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 mt-20">
          {isOpen && (
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Velocity
                </h2>
                <p className="text-xs text-slate-400">Analytics</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-white/10 rounded-lg transition-all duration-300"
            title={isOpen ? "Collapse" : "Expand"}
          >
            <svg
              className="w-5 h-5 text-slate-400 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{
                transform: isOpen ? "scaleX(1)" : "scaleX(-1)",
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="px-3 py-4 space-y-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center ${isOpen ? "justify-start gap-3" : "justify-center"} px-3 py-2.5 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600/30 to-purple-600/20 border border-blue-400/40 text-blue-300 shadow-lg shadow-blue-500/10"
                    : "text-slate-400 hover:bg-white/5 border border-transparent hover:text-slate-200"
                }`}
                title={!isOpen ? item.label : ""}
              >
                <div className="flex-shrink-0 text-slate-300">{item.icon}</div>
                {isOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Sidebar Spacer */}
      <div
        className={`transition-[width] duration-300 ease-in-out ${isOpen ? "w-64" : "w-14"}`}
      />
    </>
  );
}
