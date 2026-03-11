"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import ActivityMetrics from "@/components/ActivityMetrics";
import ActivityTimeline from "@/components/ActivityTimeline";
import TopPages from "@/components/TopPages";
import ActivityBySource from "@/components/ActivityBySource";
import DeviceActivity from "@/components/DeviceActivity";
import GeographicAnalytics from "@/components/GeographicAnalytics";

export default function ActivityPage() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState("7days");
  const [startDate, setStartDate] = useState("2026-03-04");
  const [endDate, setEndDate] = useState("2026-03-11");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (!authToken) {
      router.push("/login");
      return;
    }

    setUserEmail(email || "");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-float bg-blue-600 opacity-10"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-float bg-cyan-600 opacity-10"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-32 left-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl animate-float bg-indigo-600 opacity-10"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Sidebar */}
      <Sidebar userEmail={userEmail} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          startDate={startDate}
          endDate={endDate}
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 mt-20">
          {/* Title & Filter Bar */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/20 border border-blue-400/30">
                    <svg
                      className="w-6 h-6 text-blue-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                    User Activity
                  </h2>
                </div>
                <p className="text-sm text-slate-400 ml-11">
                  Track and analyze user engagement and behavior patterns
                </p>
              </div>

              {/* Date Range Selector */}
              <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md">
                {["24h", "7days", "30days", "90days"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all duration-500 ${
                      dateRange === range
                        ? "bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/30 scale-105"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {range === "24h"
                      ? "Last 24h"
                      : range === "7days"
                        ? "Last 7 Days"
                        : range === "30days"
                          ? "Last 30 Days"
                          : "Last 90 Days"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">
              Key Metrics
            </h3>
            <ActivityMetrics />
          </div>

          {/* Activity Timeline */}
          <div className="mt-12 mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">
              Analytics
            </h3>
            <ActivityTimeline />
          </div>

          {/* Top Pages */}
          <div className="mt-8 mb-2">
            <TopPages />
          </div>

          {/* Traffic Sources and Device Activity */}
          <div className="mt-12 mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">
              Traffic Intelligence
            </h3>
            <ActivityBySource />
          </div>

          {/* Device Activity */}
          <div className="mt-12 mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">
              Device Performance
            </h3>
            <DeviceActivity />
          </div>

          {/* Geographic Analytics */}
          <div className="mt-12 mb-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">
              Geographic Insights
            </h3>
            <GeographicAnalytics />
          </div>

          {/* Footer Stats */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 px-1">
              Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-blue-400/5 backdrop-blur-xl rounded-2xl border border-blue-400/30 p-6 transition-all duration-500 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                    Total Page Views
                  </p>
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-300 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-3">
                  187,430
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/30">
                  <svg
                    className="w-3 h-3 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-bold text-green-300">
                    +12% from last period
                  </span>
                </div>
              </div>

              <div className="group bg-gradient-to-br from-purple-600/20 via-purple-500/10 to-purple-400/5 backdrop-blur-xl rounded-2xl border border-purple-400/30 p-6 transition-all duration-500 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                    Returning Users
                  </p>
                  <div className="p-2 rounded-lg bg-purple-600/20 text-purple-300 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3.001M3 5.5h15"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-3">
                  8,234
                </p>
                <p className="text-xs text-purple-300 font-semibold">
                  {((8234 / 12847) * 100).toFixed(1)}% of active users
                </p>
              </div>

              <div className="group bg-gradient-to-br from-orange-600/20 via-orange-500/10 to-orange-400/5 backdrop-blur-xl rounded-2xl border border-orange-400/30 p-6 transition-all duration-500 hover:border-orange-400/60 hover:shadow-xl hover:shadow-orange-500/20">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                    Conversion Rate
                  </p>
                  <div className="p-2 rounded-lg bg-orange-600/20 text-orange-300 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200 mb-3">
                  6.8%
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30">
                  <svg
                    className="w-3 h-3 text-orange-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs font-bold text-orange-300">
                    Up 0.5%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
