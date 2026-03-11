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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
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

// Daily Revenue Data (Cumulative)
const dailyRevenueData = [
  { day: "1", actual: 12500, goal: 15000 },
  { day: "2", actual: 26700, goal: 30000 },
  { day: "3", actual: 40500, goal: 45000 },
  { day: "4", actual: 57000, goal: 60000 },
  { day: "5", actual: 72200, goal: 75000 },
  { day: "6", actual: 89500, goal: 90000 },
  { day: "7", actual: 104400, goal: 105000 },
  { day: "8", actual: 122500, goal: 120000 },
  { day: "9", actual: 139200, goal: 135000 },
  { day: "10", actual: 158400, goal: 150000 },
  { day: "11", actual: 176200, goal: 165000 },
  { day: "12", actual: 191700, goal: 180000 },
  { day: "13", actual: 210600, goal: 195000 },
  { day: "14", actual: 226800, goal: 210000 },
  { day: "15", actual: 246300, goal: 225000 },
  { day: "16", actual: 263400, goal: 240000 },
  { day: "17", actual: 278200, goal: 255000 },
  { day: "18", actual: 298300, goal: 270000 },
  { day: "19", actual: 317000, goal: 285000 },
  { day: "20", actual: 333400, goal: 300000 },
  { day: "21", actual: 353200, goal: 315000 },
  { day: "22", actual: 370800, goal: 330000 },
  { day: "23", actual: 386900, goal: 345000 },
  { day: "24", actual: 405200, goal: 360000 },
  { day: "25", actual: 425700, goal: 375000 },
  { day: "26", actual: 443600, goal: 390000 },
  { day: "27", actual: 462800, goal: 405000 },
  { day: "28", actual: 481400, goal: 420000 },
  { day: "29", actual: 502500, goal: 435000 },
  { day: "30", actual: 522300, goal: 450000 },
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

  return (
    <div className="min-h-screen flex bg-slate-900">
      <Sidebar userEmail={userEmail} />

      <div className="flex-1 flex flex-col">
        <Header startDate="2026-03-01" endDate="2026-03-31" />

        <main className="flex-1 p-8 relative z-10 w-full mt-16">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Goals & KPIs</h1>
            <p className="text-slate-400">Set and track your monthly targets</p>
          </div>

          {/* Goals Section */}
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

            {/* Add Goal Modal */}
            {showAddGoal && (
              <>
                <div
                  className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
                  onClick={() => setShowAddGoal(false)}
                />
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-2xl w-full max-w-2xl p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        {editingId ? "Update Goal" : "Create Goal"}
                      </h2>
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
                        className="text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Goal Title
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Increase Revenue"
                          value={newGoal.title}
                          onChange={(e) =>
                            setNewGoal({ ...newGoal, title: e.target.value })
                          }
                          className="w-full bg-slate-700/50 border border-white/15 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-white font-semibold mb-2">
                          Category
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            "Growth",
                            "Revenue",
                            "Engagement",
                            "Operations",
                            "Product",
                            "Performance",
                          ].map((cat) => (
                            <button
                              key={cat}
                              onClick={() =>
                                setNewGoal({ ...newGoal, category: cat })
                              }
                              className={`p-2 rounded-lg border transition-all ${
                                newGoal.category === cat
                                  ? "border-blue-500 bg-blue-500/20"
                                  : "border-white/15 bg-white/5 hover:border-white/30"
                              }`}
                            >
                              <div className="w-5 h-5 mx-auto mb-1">
                                {getCategoryIcon(cat)}
                              </div>
                              <span className="text-xs text-white">{cat}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            Target
                          </label>
                          <input
                            type="number"
                            placeholder="Amount"
                            value={newGoal.target}
                            onChange={(e) =>
                              setNewGoal({
                                ...newGoal,
                                target: e.target.value,
                              })
                            }
                            className="w-full bg-slate-700/50 border border-white/15 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-white font-semibold mb-2">
                            Unit
                          </label>
                          <select
                            value={newGoal.unit}
                            onChange={(e) =>
                              setNewGoal({ ...newGoal, unit: e.target.value })
                            }
                            className="w-full bg-slate-700/50 border border-white/15 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="users">Users</option>
                            <option value="$">Dollars ($)</option>
                            <option value="%">Percentage (%)</option>
                            <option value="tickets">Tickets</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end mt-6">
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
                        className="px-4 py-2 rounded-lg border border-white/15 text-white hover:bg-white/5"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddGoal}
                        disabled={!newGoal.title || !newGoal.target}
                        className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
                      >
                        {editingId ? "Update" : "Create"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Goal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  {...goal}
                  onEdit={handleEditGoal}
                  onRemove={handleRemoveGoal}
                />
              ))}
            </div>
          </div>

          {/* Daily Revenue Tracking */}
          <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl border border-white/15 p-8 transition-all duration-500 hover:border-white/25 hover:shadow-xl hover:shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">
                  Daily Revenue Tracking
                </h2>
                <p className="text-sm text-slate-400">
                  Actual revenue vs daily goal target
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-600/20 text-emerald-300">
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
                    d="M13 7h8m0 0v8m0-8L5.5 19.5M21 7l-8-4-8 4v8l8 4 8-4V7z"
                  />
                </svg>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={dailyRevenueData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="day"
                  stroke="rgb(148, 163, 184)"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="rgb(148, 163, 184)"
                  style={{ fontSize: "12px" }}
                  label={{
                    value: "Revenue ($)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(value: any) => `$${value.toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="goal"
                  stroke="rgb(100, 200, 255)"
                  strokeWidth={2}
                  name="Daily Goal"
                  dot={false}
                  isAnimationActive={false}
                  opacity={0.6}
                />
                <Line
                  type="natural"
                  dataKey="actual"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth={3}
                  name="Actual Revenue"
                  dot={(props) => {
                    const { cx, cy } = props;
                    return (
                      <circle cx={cx} cy={cy} r={4} fill="rgb(34, 197, 94)" />
                    );
                  }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-semibold">
                  Average Actual
                </p>
                <p className="text-lg font-bold text-green-300">$17,410</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-semibold">
                  Average Goal
                </p>
                <p className="text-lg font-bold text-blue-300">$15,000</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-semibold">Variance</p>
                <p className="text-lg font-bold text-emerald-300">+16.1%</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
