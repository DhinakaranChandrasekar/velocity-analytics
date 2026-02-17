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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
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
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-32 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
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
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Dashboard
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {(["week", "month", "quarter", "year"] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => handleDateRangeChange(range)}
                  className={`px-4 py-2 text-xs sm:text-sm rounded-lg font-medium transition ${
                    range === activeRange
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {range === "week"
                    ? "1W"
                    : range === "month"
                      ? "1M"
                      : range === "quarter"
                        ? "3M"
                        : "1Y"}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white/5 backdrop-blur rounded-xl border border-white/10 p-6 animate-pulse"
                  >
                    <div className="h-4 bg-white/10 rounded w-24 mb-4"></div>
                    <div className="h-8 bg-white/10 rounded w-32"></div>
                  </div>
                ))
              : summary && (
                  <>
                    <MetricCard
                      title="Total Revenue"
                      value={formatCurrency(summary.totalRevenue)}
                      change={12}
                      trend="up"
                    />
                    <MetricCard
                      title="Total Orders"
                      value={formatNumber(summary.totalOrders)}
                      change={8}
                      trend="up"
                    />
                    <MetricCard
                      title="Total Customers"
                      value={formatNumber(summary.totalCustomers)}
                      change={5}
                      trend="up"
                    />
                    <MetricCard
                      title="Avg Daily Revenue"
                      value={formatCurrency(summary.avgDailyRevenue)}
                      change={3}
                      trend="up"
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
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-5 lg:p-6 hover:border-white/20 transition">
            <h3 className="text-xs sm:text-sm font-bold text-white mb-4 sm:mb-5 flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              Performance Summary
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                {
                  label: "Conversion Rate",
                  value: "3.2%",
                  color: "text-blue-400",
                },
                {
                  label: "Avg Order Value",
                  value: formatCurrency(425),
                  color: "text-purple-400",
                },
                {
                  label: "Growth Rate",
                  value: "↑ 12%",
                  color: "text-green-400",
                },
                {
                  label: "Churn Rate",
                  value: "2.1%",
                  color: "text-orange-400",
                },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="p-3 sm:p-4 bg-white/5 border border-white/5 rounded-lg"
                >
                  <p className="text-slate-400 text-xs mb-1.5">{label}</p>
                  <p className={`text-xl sm:text-2xl font-bold ${color}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Padding */}
          <div className="h-12"></div>
        </main>
      </div>
    </div>
  );
}
