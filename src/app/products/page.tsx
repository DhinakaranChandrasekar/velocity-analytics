"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Product {
  id: string;
  name: string;
  category: string;
  revenue: number;
  unitsSold: number;
  aov: number;
  growth: number;
  status: "active" | "inactive";
  margin: number;
}

export default function ProductsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"revenue" | "sales" | "growth">(
    "revenue",
  );
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Pro Subscription",
      category: "Subscription",
      revenue: 45200,
      unitsSold: 156,
      aov: 289,
      growth: 12.5,
      status: "active",
      margin: 78,
    },
    {
      id: "2",
      name: "Enterprise Plan",
      category: "Subscription",
      revenue: 38900,
      unitsSold: 42,
      aov: 926,
      growth: 8.3,
      status: "active",
      margin: 82,
    },
    {
      id: "3",
      name: "Starter Bundle",
      category: "Bundle",
      revenue: 28450,
      unitsSold: 234,
      aov: 121,
      growth: 15.2,
      status: "active",
      margin: 65,
    },
    {
      id: "4",
      name: "Premium Add-on",
      category: "Add-on",
      revenue: 19800,
      unitsSold: 89,
      aov: 222,
      growth: 5.8,
      status: "active",
      margin: 71,
    },
    {
      id: "5",
      name: "Analytics Module",
      category: "Add-on",
      revenue: 15600,
      unitsSold: 52,
      aov: 300,
      growth: 22.1,
      status: "active",
      margin: 75,
    },
    {
      id: "6",
      name: "Email Support",
      category: "Support",
      revenue: 8900,
      unitsSold: 178,
      aov: 50,
      growth: 3.2,
      status: "active",
      margin: 88,
    },
  ]);

  const [trendData] = useState([
    { month: "Jan", revenue: 32000, growth: 4 },
    { month: "Feb", revenue: 38000, growth: 6 },
    { month: "Mar", revenue: 42000, growth: 8 },
    { month: "Apr", revenue: 45000, growth: 9 },
    { month: "May", revenue: 52000, growth: 12 },
    { month: "Jun", revenue: 58000, growth: 14 },
  ]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (!authToken) {
      router.push("/login");
      return;
    }

    setUserEmail(email || "");
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "revenue") return b.revenue - a.revenue;
      if (sortBy === "sales") return b.unitsSold - a.unitsSold;
      if (sortBy === "growth") return b.growth - a.growth;
      return 0;
    });

  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalSales = products.reduce((sum, p) => sum + p.unitsSold, 0);
  const avgGrowth = (
    products.reduce((sum, p) => sum + p.growth, 0) / products.length
  ).toFixed(1);

  const topProductsData = products
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((p) => ({ name: p.name, revenue: p.revenue }));

  const categoryRevenu = categories
    .filter((c) => c !== "all")
    .map((cat) => ({
      name: cat,
      value: products
        .filter((p) => p.category === cat)
        .reduce((sum, p) => sum + p.revenue, 0),
    }));

  const COLORS = [
    "#3b82f6",
    "#a855f7",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
  ];

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
          startDate="2026-01-01"
          endDate="2026-12-31"
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 mt-20">
          {/* Title with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 text-slate-300 hover:text-white flex-shrink-0"
              title="Go back"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Products</h1>
              <p className="text-slate-400">
                Analyze revenue and performance by product
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="group relative bg-gradient-to-br from-blue-600/20 to-blue-400/5 border-blue-500/30 border rounded-xl p-4 transition-all duration-300 hover:border-white/20 hover:shadow-lg cursor-pointer overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Total Revenue
                  </p>
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-blue-600/20 text-blue-400">
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
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    ${(totalRevenue / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs font-semibold text-green-400">+12.5%</p>
                </div>
                <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">vs last month</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-purple-600/20 to-purple-400/5 border-purple-500/30 border rounded-xl p-4 transition-all duration-300 hover:border-white/20 hover:shadow-lg cursor-pointer overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Total Sales
                  </p>
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-purple-600/20 text-purple-400">
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
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {totalSales}
                  </p>
                  <p className="text-xs font-semibold text-green-400">+8.3%</p>
                </div>
                <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"
                    style={{ width: "72%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">units sold</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-green-600/20 to-green-400/5 border-green-500/30 border rounded-xl p-4 transition-all duration-300 hover:border-white/20 hover:shadow-lg cursor-pointer overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    Avg Growth
                  </p>
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-green-600/20 text-green-400">
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
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {avgGrowth}%
                  </p>
                  <p className="text-xs font-semibold text-green-400">
                    Trending
                  </p>
                </div>
                <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">all products</p>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Revenue Trend */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-blue-600/20 text-blue-400">
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
                </div>
                <h2 className="text-lg font-bold text-white">Revenue Trend</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis stroke="rgba(148,163,184,0.5)" />
                  <YAxis stroke="rgba(148,163,184,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Top Products */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-purple-600/20 text-purple-400">
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
                </div>
                <h2 className="text-lg font-bold text-white">Top 5 Products</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topProductsData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis type="number" stroke="rgba(148,163,184,0.5)" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    stroke="rgba(148,163,184,0.5)"
                    width={80}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="revenue" fill="#a855f7" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue by Category */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-green-600/20 text-green-400">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-white">
                  Revenue by Category
                </h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryRevenu}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) =>
                      `${name}: $${(value / 1000).toFixed(0)}K`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryRevenu.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Product Performance */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-orange-600/20 text-orange-400">
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
                </div>
                <h2 className="text-lg font-bold text-white">
                  Growth by Product
                </h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={products.slice(0, 5).map((p) => ({
                    name: p.name.substring(0, 10),
                    growth: p.growth,
                  }))}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis stroke="rgba(148,163,184,0.5)" />
                  <YAxis stroke="rgba(148,163,184,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="growth" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
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
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                All Products
              </h2>

              {/* Filters */}
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-all duration-300"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                      title="Clear search"
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Category and Sort Filters */}
                <div className="flex gap-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-all duration-300 cursor-pointer appearance-none [&>option]:bg-slate-800 [&>option]:text-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value as "revenue" | "sales" | "growth",
                      )
                    }
                    className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-all duration-300 cursor-pointer appearance-none [&>option]:bg-slate-800 [&>option]:text-white"
                  >
                    <option value="revenue">Sort by Revenue</option>
                    <option value="sales">Sort by Sales</option>
                    <option value="growth">Sort by Growth</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">
                      Product Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-300">
                      Category
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300">
                      Revenue
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300">
                      Units Sold
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300">
                      AOV
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300">
                      Growth
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-300">
                      Margin
                    </th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-slate-300">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-white/5 hover:bg-gradient-to-r hover:from-blue-600/10 hover:to-white/5 transition-all duration-300 group"
                    >
                      <td className="px-4 py-4 text-sm text-white font-semibold group-hover:text-blue-300 transition">
                        {product.name}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-400">
                        <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-white text-right font-semibold">
                        ${product.revenue.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-300 text-right">
                        {product.unitsSold}
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-300 text-right">
                        ${product.aov}
                      </td>
                      <td className="px-4 py-4 text-sm text-right">
                        <span className="bg-green-600/20 text-green-300 px-2.5 py-1.5 rounded-lg font-semibold text-xs inline-flex items-center gap-1 border border-green-500/30">
                          <svg
                            className="w-3 h-3"
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
                          {product.growth}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-right">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                              style={{ width: `${product.margin}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-400 w-8 text-right">
                            {product.margin}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-center">
                        <span
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 ${
                            product.status === "active"
                              ? "bg-green-600/20 text-green-300 border border-green-500/30"
                              : "bg-slate-600/20 text-slate-300 border border-slate-500/30"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${product.status === "active" ? "bg-green-400" : "bg-slate-400"}`}
                          ></span>
                          {product.status === "active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400 mb-2">
                  No products found matching your criteria
                </p>
                <p className="text-slate-500 text-sm">
                  Try adjusting your filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
