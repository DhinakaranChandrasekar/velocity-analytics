"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import GoalCard from "@/components/GoalCard";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Goal {
  id: string;
  title: string;
  category: string;
  target: number;
  current: number;
  unit: string;
  progress: number;
  status: "on-track" | "at-risk" | "behind" | "completed";
  daysRemaining: number;
  trend: Array<{ day: number; value: number }>;
  icon: string;
}

// Initial mock goal data
const initialGoals: Goal[] = [
  {
    id: "1",
    title: "Monthly Active Users",
    category: "Growth",
    target: 50000,
    current: 38000,
    unit: "users",
    progress: 76,
    status: "on-track",
    daysRemaining: 18,
    icon: "📊",
    trend: [
      { day: 1, value: 28000 },
      { day: 5, value: 31000 },
      { day: 10, value: 34000 },
      { day: 15, value: 36500 },
      { day: 20, value: 38000 },
    ],
  },
  {
    id: "2",
    title: "Revenue Target",
    category: "Revenue",
    target: 250000,
    current: 180000,
    unit: "$",
    progress: 72,
    status: "on-track",
    daysRemaining: 18,
    icon: "💵",
    trend: [
      { day: 1, value: 80000 },
      { day: 5, value: 110000 },
      { day: 10, value: 135000 },
      { day: 15, value: 160000 },
      { day: 20, value: 180000 },
    ],
  },
  {
    id: "3",
    title: "Customer Retention Rate",
    category: "Engagement",
    target: 85,
    current: 71,
    unit: "%",
    progress: 84,
    status: "at-risk",
    daysRemaining: 18,
    icon: "👥",
    trend: [
      { day: 1, value: 65 },
      { day: 5, value: 67 },
      { day: 10, value: 69 },
      { day: 15, value: 70 },
      { day: 20, value: 71 },
    ],
  },
  {
    id: "4",
    title: "Support Tickets Resolved",
    category: "Operations",
    target: 1200,
    current: 1256,
    unit: "tickets",
    progress: 105,
    status: "completed",
    daysRemaining: 18,
    icon: "✓",
    trend: [
      { day: 1, value: 200 },
      { day: 5, value: 400 },
      { day: 10, value: 700 },
      { day: 15, value: 950 },
      { day: 20, value: 1256 },
    ],
  },
  {
    id: "5",
    title: "Product Feature Adoption",
    category: "Product",
    target: 60,
    current: 35,
    unit: "%",
    progress: 58,
    status: "behind",
    daysRemaining: 18,
    icon: "→",
    trend: [
      { day: 1, value: 20 },
      { day: 5, value: 24 },
      { day: 10, value: 28 },
      { day: 15, value: 31 },
      { day: 20, value: 35 },
    ],
  },
  {
    id: "6",
    title: "API Response Time",
    category: "Performance",
    target: 200,
    current: 145,
    unit: "ms",
    progress: 73,
    status: "on-track",
    daysRemaining: 18,
    icon: "⚡",
    trend: [
      { day: 1, value: 250 },
      { day: 5, value: 220 },
      { day: 10, value: 190 },
      { day: 15, value: 165 },
      { day: 20, value: 145 },
    ],
  },
];

// Icon mapping by category
const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ReactNode> = {
    Growth: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
        <polyline points="3 13 7 9 11 13 17 7" />
      </svg>
    ),
    Revenue: <span className="text-2xl font-bold">$</span>,
    Engagement: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    Operations: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
      </svg>
    ),
    Product: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
      </svg>
    ),
    Performance: (
      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
        <path d="M9 14l2-2 3 3 5-5" />
      </svg>
    ),
  };
  return icons[category] || icons["Growth"];
};

const statusChartData = [
  { name: "On Track", value: 3, color: "#10b981" },
  { name: "At Risk", value: 1, color: "#f59e0b" },
  { name: "Behind", value: 1, color: "#ef4444" },
  { name: "Completed", value: 1, color: "#3b82f6" },
];

const categoryData = [
  { category: "Growth", goals: 1, achieved: 1 },
  { category: "Revenue", goals: 1, achieved: 1 },
  { category: "Engagement", goals: 1, achieved: 0 },
  { category: "Operations", goals: 1, achieved: 1 },
  { category: "Product", goals: 1, achieved: 0 },
  { category: "Performance", goals: 1, achieved: 1 },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [userEmail] = useState("user@example.com");
  const [newGoal, setNewGoal] = useState({
    title: "",
    category: "Growth",
    target: "",
    unit: "users",
  });

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.target) {
      if (editingId) {
        // Update existing goal
        setGoals(
          goals.map((g) =>
            g.id === editingId
              ? {
                  ...g,
                  title: newGoal.title,
                  category: newGoal.category,
                  target: parseInt(newGoal.target),
                  unit: newGoal.unit,
                }
              : g,
          ),
        );
        setEditingId(null);
      } else {
        // Create new goal
        const goal: Goal = {
          id: Date.now().toString(),
          title: newGoal.title,
          category: newGoal.category,
          target: parseInt(newGoal.target),
          current: 0,
          unit: newGoal.unit,
          progress: 0,
          status: "on-track",
          daysRemaining: 31,
          icon: "→",
          trend: [
            { day: 1, value: 0 },
            { day: 10, value: 0 },
            { day: 20, value: 0 },
          ],
        };
        setGoals([...goals, goal]);
      }
      setShowAddGoal(false);
      setNewGoal({ title: "", category: "Growth", target: "", unit: "users" });
    }
  };

  const handleEditGoal = (id: string) => {
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      setNewGoal({
        title: goal.title,
        category: goal.category,
        target: goal.target.toString(),
        unit: goal.unit,
      });
      setEditingId(id);
      setShowAddGoal(true);
    }
  };

  const handleRemoveGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const onTrackCount = goals.filter((g) => g.status === "on-track").length;
  const completedCount = goals.filter((g) => g.status === "completed").length;
  const avgProgress = Math.round(
    goals.reduce((sum, g) => sum + g.progress, 0) / goals.length,
  );

  return (
    <div className="min-h-screen flex bg-slate-900">
      {/* Sidebar */}
      <Sidebar userEmail={userEmail} />

      <div className="flex-1 flex flex-col">
        <Header startDate="2026-03-01" endDate="2026-03-31" />

        <main className="flex-1 p-8 relative z-10 w-full mt-16">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Goals & KPIs</h1>
            <p className="text-slate-400">Set and track your monthly targets</p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-white/10 p-6">
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">
                Total Goals
              </p>
              <p className="text-white text-3xl font-bold">{goals.length}</p>
              <p className="text-slate-500 text-xs mt-2">for this month</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-white/10 p-6">
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">
                On Track
              </p>
              <p className="text-emerald-400 text-3xl font-bold">
                {onTrackCount}
              </p>
              <p className="text-slate-500 text-xs mt-2">progressing well</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-white/10 p-6">
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">
                Completed
              </p>
              <p className="text-blue-400 text-3xl font-bold">
                {completedCount}
              </p>
              <p className="text-slate-500 text-xs mt-2">achieved</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-white/10 p-6">
              <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">
                Avg Progress
              </p>
              <p className="text-white text-3xl font-bold">{avgProgress}%</p>
              <p className="text-slate-500 text-xs mt-2">across all goals</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Status Distribution */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-white/10 p-6">
              <h2 className="text-white font-semibold mb-4">
                Goal Status Distribution
              </h2>
              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {statusChartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-300 text-sm">
                      {item.name}:{" "}
                      <span className="text-white font-semibold">
                        {item.value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-white/10 p-6">
              <h2 className="text-white font-semibold mb-4">
                Category Performance
              </h2>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.95)",
                        border: "1px solid rgba(148, 163, 184, 0.2)",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#e2e8f0" }}
                    />
                    <Bar dataKey="achieved" fill="#10b981" name="Achieved" />
                    <Bar dataKey="goals" fill="#0284c7" name="Total Goals" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Goals Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Goals</h2>
              <button
                onClick={() => setShowAddGoal(!showAddGoal)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                + Add Goal
              </button>
            </div>

            {/* Add Goal Form - Modal Popup */}
            {showAddGoal && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 transition-opacity"
                  onClick={() => setShowAddGoal(false)}
                />

                {/* Modal */}
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                  <div className="bg-gradient-to-br from-slate-800 via-slate-800/95 to-slate-900 rounded-3xl border border-white/10 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-600/10 to-pink-600/10 rounded-full blur-3xl -z-10" />

                    {/* Modal Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-blue-600/20 via-slate-800 to-cyan-600/20 backdrop-blur border-b border-white/10 px-8 py-8 flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl">
                            <svg
                              className="w-6 h-6"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <path
                                d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6m-1.78 7.78l-4.24-4.24m-5.08 0l-4.24 4.24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                              />
                            </svg>
                          </div>
                          <div>
                            <h2 className="text-3xl font-bold text-white">
                              Create New Goal
                            </h2>
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm ml-0">
                          Build momentum and track your success
                        </p>
                      </div>
                      <button
                        onClick={() => setShowAddGoal(false)}
                        className="text-slate-400 hover:text-white transition-all p-2 hover:bg-white/10 rounded-lg hover:scale-110"
                      >
                        <svg
                          className="w-6 h-6"
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
                    </div>

                    {/* Modal Content */}
                    <div className="p-8 space-y-8">
                      {/* Goal Title */}
                      <div className="space-y-3">
                        <label className="flex items-center gap-2 text-white font-bold text-lg">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M11 17H7v2h4v-2zm6-5H1v2h16v-2zm0-4H1v2h16V8zM1 4h16V2H1v2z" />
                          </svg>
                          What's your goal?
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Increase Monthly Active Users"
                          value={newGoal.title}
                          onChange={(e) =>
                            setNewGoal({ ...newGoal, title: e.target.value })
                          }
                          className="w-full bg-gradient-to-r from-slate-700/50 to-slate-700/30 border border-white/15 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-lg"
                        />
                      </div>

                      {/* Category Selection */}
                      <div className="space-y-4">
                        <label className="flex items-center gap-2 text-white font-bold text-lg">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.16-2.66c-.19-.23-.53-.23-.73-.02l-3.05 3.71c-.11.14-.15.33-.1.5.05.16.17.29.32.34.14.05.32.02.44-.08l2.84-3.45 2.16 2.66c.19.23.53.23.73.02l3.68-4.53c.11-.14.15-.33.1-.5-.05-.16-.17-.29-.32-.34-.14-.05-.32-.02-.44.08z" />
                          </svg>
                          Choose a category
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            {
                              name: "Growth",
                              icon: getCategoryIcon("Growth"),
                              color:
                                "from-emerald-500/20 to-emerald-600/20 border-emerald-500/50 hover:border-emerald-500",
                            },
                            {
                              name: "Revenue",
                              icon: getCategoryIcon("Revenue"),
                              color:
                                "from-yellow-500/20 to-orange-600/20 border-yellow-500/50 hover:border-yellow-500",
                            },
                            {
                              name: "Engagement",
                              icon: getCategoryIcon("Engagement"),
                              color:
                                "from-pink-500/20 to-red-600/20 border-pink-500/50 hover:border-pink-500",
                            },
                            {
                              name: "Operations",
                              icon: getCategoryIcon("Operations"),
                              color:
                                "from-slate-500/20 to-slate-600/20 border-slate-500/50 hover:border-slate-500",
                            },
                            {
                              name: "Product",
                              icon: getCategoryIcon("Product"),
                              color:
                                "from-purple-500/20 to-purple-600/20 border-purple-500/50 hover:border-purple-500",
                            },
                            {
                              name: "Performance",
                              icon: getCategoryIcon("Performance"),
                              color:
                                "from-blue-500/20 to-cyan-600/20 border-blue-500/50 hover:border-blue-500",
                            },
                          ].map((cat) => (
                            <button
                              key={cat.name}
                              onClick={() =>
                                setNewGoal({ ...newGoal, category: cat.name })
                              }
                              className={`bg-gradient-to-br ${cat.color} border-2 rounded-xl p-4 transition-all duration-200 ${
                                newGoal.category === cat.name
                                  ? "ring-2 ring-white/50 scale-105 shadow-lg shadow-white/10"
                                  : "hover:scale-102"
                              }`}
                            >
                              <div className="w-8 h-8 mb-2 text-white">
                                {cat.icon}
                              </div>
                              <div className="text-white font-semibold text-sm">
                                {cat.name}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Target & Unit */}
                      <div className="grid grid-cols-2 gap-6">
                        {/* Target Value */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-white font-bold text-lg">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="9"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            Target
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              placeholder="Enter amount"
                              value={newGoal.target}
                              onChange={(e) =>
                                setNewGoal({
                                  ...newGoal,
                                  target: e.target.value,
                                })
                              }
                              className="w-full bg-gradient-to-r from-slate-700/50 to-slate-700/30 border border-white/15 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-lg"
                            />
                          </div>
                        </div>

                        {/* Unit Selection */}
                        <div className="space-y-3">
                          <label className="flex items-center gap-2 text-white font-bold text-lg">
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                            </svg>
                            Unit
                          </label>
                          <select
                            value={newGoal.unit}
                            onChange={(e) =>
                              setNewGoal({ ...newGoal, unit: e.target.value })
                            }
                            className="w-full bg-gradient-to-r from-slate-700/50 to-slate-700/30 border border-white/15 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all text-lg"
                          >
                            <option value="users">Users</option>
                            <option value="$">Dollars ($)</option>
                            <option value="%">Percentage (%)</option>
                            <option value="tickets">Tickets</option>
                            <option value="ms">Milliseconds (ms)</option>
                            <option value="events">Events</option>
                          </select>
                        </div>
                      </div>

                      {/* Summary Preview */}
                      {newGoal.title && newGoal.target && (
                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
                          <p className="text-slate-300 text-sm mb-2 flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                            </svg>
                            Your Goal Preview
                          </p>
                          <p className="text-white font-semibold text-lg">
                            Achieve{" "}
                            <span className="text-blue-400">
                              {parseInt(newGoal.target).toLocaleString() ||
                                "___"}
                            </span>{" "}
                            <span className="text-cyan-400">
                              {newGoal.unit}
                            </span>{" "}
                            in{" "}
                            <span className="text-emerald-400">
                              {newGoal.category}
                            </span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Modal Footer */}
                    <div className="border-t border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur px-8 py-6 flex gap-3 justify-end">
                      <button
                        onClick={() => {
                          setShowAddGoal(false);
                          setEditingId(null);
                          setNewGoal({
                            title: "",
                            category: "Growth",
                            target: "",
                            unit: "users",
                          });
                        }}
                        className="px-6 py-3 rounded-lg border border-white/15 text-white hover:bg-white/5 font-semibold transition-all hover:border-white/30 hover:shadow-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddGoal}
                        disabled={!newGoal.title || !newGoal.target}
                        className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600 hover:from-blue-700 hover:via-blue-700 hover:to-cyan-700 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 disabled:hover:scale-100 flex items-center gap-2 justify-center"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                        </svg>
                        {editingId ? "Update Goal" : "Create Goal"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Goal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal: Goal) => (
                <GoalCard
                  key={goal.id}
                  {...goal}
                  onEdit={handleEditGoal}
                  onRemove={handleRemoveGoal}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
