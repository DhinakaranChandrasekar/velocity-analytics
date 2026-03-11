"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MetricCard } from "@/components/MetricCard";
import { RevenueTrendChart } from "@/components/RevenueTrendChart";
import { MonthlyRevenueChart } from "@/components/MonthlyRevenueChart";
import { DonutCharts } from "@/components/DonutCharts";
import { RevenueForecastChart } from "@/components/RevenueForecastChart";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { formatCurrency, formatNumber } from "@/utils/formatters";

interface Summary {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  avgDailyRevenue: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-12-31");
  const [activeRange, setActiveRange] = useState<
    "week" | "month" | "quarter" | "year"
  >("year");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (!authToken) {
      router.push("/login");
      return;
    }

    setUserEmail(email || "");
    fetchSummary();
  }, [router, startDate, endDate]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ startDate, endDate });
      const response = await fetch(`/api/metrics?${params}`);
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  const handleDateRangeChange = (
    range: "week" | "month" | "quarter" | "year",
  ) => {
    const end = new Date("2026-12-31");
    const start = new Date();

    switch (range) {
      case "week":
        start.setTime(end.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        start.setTime(end.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "quarter":
        start.setTime(end.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        start.setFullYear(start.getFullYear() - 1);
        break;
    }

    setActiveRange(range);
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
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
        <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 mt-20">
          {/* Title & Filter Bar */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  Dashboard
                </h2>
                <p className="text-sm text-slate-400">
                  {startDate} → {endDate}
                </p>
              </div>

              {/* Time Period Selector */}
              <div className="inline-flex items-center gap-1 p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur">
                {(["week", "month", "quarter", "year"] as const).map(
                  (range) => (
                    <button
                      key={range}
                      onClick={() => handleDateRangeChange(range)}
                      className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 relative cursor-pointer ${
                        range === activeRange
                          ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/40"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {range === "week"
                        ? "1 Week"
                        : range === "month"
                          ? "1 Month"
                          : range === "quarter"
                            ? "3 Months"
                            : "1 Year"}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`backdrop-blur rounded-xl border p-6 animate-pulse bg-white/5 border-white/10`}
                  >
                    <div className="h-4 rounded w-24 mb-4 bg-white/10"></div>
                    <div className="h-8 rounded w-32 bg-white/10"></div>
                  </div>
                ))
              : summary && (
                  <>
                    <MetricCard
                      title="Total Revenue"
                      value={formatCurrency(summary.totalRevenue)}
                      change={12}
                      trend="up"
                      color="blue"
                      subtitle="All time"
                      icon={
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
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      }
                    />
                    <MetricCard
                      title="Total Orders"
                      value={formatNumber(summary.totalOrders)}
                      change={8}
                      trend="up"
                      color="green"
                      subtitle="Completed"
                      icon={
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
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      }
                    />
                    <MetricCard
                      title="Total Customers"
                      value={formatNumber(summary.totalCustomers)}
                      change={5}
                      trend="up"
                      color="purple"
                      subtitle="Active"
                      icon={
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
                            d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      }
                    />
                    <MetricCard
                      title="Avg Daily Revenue"
                      value={formatCurrency(summary.avgDailyRevenue)}
                      change={3}
                      trend="up"
                      color="orange"
                      subtitle="Per day"
                      icon={
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
                            d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12a1 1 0 100-2 1 1 0 000 2z"
                          />
                        </svg>
                      }
                    />
                  </>
                )}
          </div>

          {/* Revenue Trend Chart */}
          <div className="mb-6">
            <RevenueTrendChart />
          </div>

          {/* Monthly Revenue Comparison Chart */}
          <div className="mb-6">
            <MonthlyRevenueChart />
          </div>

          {/* Donut Charts */}
          <div className="mb-6">
            <DonutCharts />
          </div>

          {/* Revenue Forecast */}
          <div className="mb-6">
            <RevenueForecastChart />
          </div>

          {/* Performance Summary */}
          <div className="backdrop-blur-xl rounded-2xl border p-4 sm:p-5 lg:p-6 transition bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10">
            <h3 className="text-sm font-bold mb-6 text-white flex items-center gap-2">
              <svg
                className="w-5 h-5 text-blue-400"
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
              Key Performance Indicators
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Conversion Rate",
                  value: "3.2%",
                  trend: "+0.5%",
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  ),
                  gradient: "from-blue-600/20 to-blue-400/5",
                  border: "border-blue-500/30",
                  icon_bg: "bg-blue-600/20 text-blue-400",
                },
                {
                  label: "Avg Order Value",
                  value: formatCurrency(425),
                  trend: "+$12",
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
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  ),
                  gradient: "from-purple-600/20 to-purple-400/5",
                  border: "border-purple-500/30",
                  icon_bg: "bg-purple-600/20 text-purple-400",
                },
                {
                  label: "Growth Rate",
                  value: "12%",
                  trend: "+2.3%",
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  ),
                  gradient: "from-green-600/20 to-green-400/5",
                  border: "border-green-500/30",
                  icon_bg: "bg-green-600/20 text-green-400",
                },
                {
                  label: "Churn Rate",
                  value: "2.1%",
                  trend: "-0.3%",
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
                        d="M12 9v2m0 4v2m0 5v2M7 16a5 5 0 1110 0H7z"
                      />
                    </svg>
                  ),
                  gradient: "from-orange-600/20 to-orange-400/5",
                  border: "border-orange-500/30",
                  icon_bg: "bg-orange-600/20 text-orange-400",
                },
              ].map(
                ({ label, value, trend, icon, gradient, border, icon_bg }) => (
                  <div
                    key={label}
                    className={`group relative bg-gradient-to-br ${gradient} ${border} border rounded-xl p-4 transition-all duration-300 hover:border-white/20 hover:shadow-lg cursor-pointer overflow-hidden`}
                  >
                    {/* Animated background glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                          {label}
                        </p>
                        <div
                          className={`h-8 w-8 rounded-lg flex items-center justify-center ${icon_bg}`}
                        >
                          {icon}
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <p className="text-2xl sm:text-3xl font-bold text-white">
                          {value}
                        </p>
                        <p
                          className={`text-xs font-semibold ${trend.startsWith("-") ? "text-red-400" : "text-green-400"}`}
                        >
                          {trend}
                        </p>
                      </div>

                      {/* Mini progress bar */}
                      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${trend.startsWith("-") ? "bg-gradient-to-r from-red-500 to-red-400" : "bg-gradient-to-r from-green-500 to-green-400"}`}
                          style={{
                            width: `${Math.min(Math.abs(parseFloat(trend)) * 10, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Bottom Padding */}
          <div className="h-12"></div>
        </main>
      </div>
    </div>
  );
}
