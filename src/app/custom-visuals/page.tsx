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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CustomChart {
  id: string;
  title: string;
  type: "line" | "bar" | "pie" | "area";
  xField: string;
  yField: string;
  color: string;
}

interface AvailableField {
  name: string;
  type: "numeric" | "string" | "date";
}

const mockData = [
  { month: "Jan", revenue: 32000, customers: 450, growth: 12 },
  { month: "Feb", revenue: 38000, customers: 520, growth: 15 },
  { month: "Mar", revenue: 42000, customers: 610, growth: 18 },
  { month: "Apr", revenue: 45000, customers: 680, growth: 20 },
  { month: "May", revenue: 52000, customers: 750, growth: 22 },
  { month: "Jun", revenue: 58000, customers: 820, growth: 25 },
];

const availableFields: AvailableField[] = [
  { name: "month", type: "date" },
  { name: "revenue", type: "numeric" },
  { name: "customers", type: "numeric" },
  { name: "growth", type: "numeric" },
];

const COLORS = [
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#8b5cf6",
  "#f43f5e",
];

export default function CustomVisualsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [charts, setCharts] = useState<CustomChart[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);
  const [newChartTitle, setNewChartTitle] = useState("");
  const [newChartType, setNewChartType] = useState<
    "line" | "bar" | "pie" | "area"
  >("line");
  const [newChartXField, setNewChartXField] = useState("month");
  const [newChartYField, setNewChartYField] = useState("revenue");
  const [newChartColor, setNewChartColor] = useState("#3b82f6");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (!authToken) {
      router.push("/login");
      return;
    }

    setUserEmail(email || "");
  }, []);

  const addChart = () => {
    if (!newChartTitle) {
      alert("Chart title is required");
      return;
    }

    const newChart: CustomChart = {
      id: Date.now().toString(),
      title: newChartTitle,
      type: newChartType,
      xField: newChartXField,
      yField: newChartYField,
      color: newChartColor,
    };

    setCharts([...charts, newChart]);
    setSelectedChartId(newChart.id);
    setNewChartTitle("");
    setNewChartType("line");
    setNewChartXField("month");
    setNewChartYField("revenue");
    setNewChartColor("#3b82f6");
  };

  const deleteChart = (id: string) => {
    setCharts(charts.filter((c) => c.id !== id));
    if (selectedChartId === id) {
      setSelectedChartId(charts[0]?.id || null);
    }
  };

  const updateChart = (id: string, updates: Partial<CustomChart>) => {
    setCharts(charts.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const selectedChart = charts.find((c) => c.id === selectedChartId);

  const renderChart = (chart: CustomChart) => {
    const key = `${chart.id}-${chart.type}`;

    switch (chart.type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300} key={key}>
            <LineChart data={mockData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey={chart.xField} stroke="rgba(148,163,184,0.5)" />
              <YAxis stroke="rgba(148,163,184,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={chart.yField}
                stroke={chart.color}
                strokeWidth={2}
                dot={{ fill: chart.color, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300} key={key}>
            <BarChart data={mockData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey={chart.xField} stroke="rgba(148,163,184,0.5)" />
              <YAxis stroke="rgba(148,163,184,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Bar
                dataKey={chart.yField}
                fill={chart.color}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300} key={key}>
            <PieChart>
              <Pie
                data={mockData}
                dataKey={chart.yField}
                nameKey={chart.xField}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={chart.color}
              >
                {mockData.map((_, index) => (
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
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={300} key={key}>
            <AreaChart data={mockData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey={chart.xField} stroke="rgba(148,163,184,0.5)" />
              <YAxis stroke="rgba(148,163,184,0.5)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey={chart.yField}
                fill={chart.color}
                stroke={chart.color}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
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
          startDate="2026-01-01"
          endDate="2026-12-31"
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="relative z-10 flex-1 w-full flex overflow-hidden mt-16">
          {/* Charts Canvas */}
          <div className="flex-1 overflow-auto p-6">
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
                <h1 className="text-3xl font-bold text-white mb-2">
                  Custom Visuals
                </h1>
                <p className="text-slate-400">
                  Build and customize your analytics visualizations
                </p>
              </div>
            </div>

            {/* Empty State */}
            {charts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-12 h-12 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No Visuals Yet
                </h3>
                <p className="text-slate-400 mb-8 text-center max-w-md">
                  Create your first custom visual to start visualizing your data
                </p>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition"
                >
                  + Add Visual
                </button>
              </div>
            )}

            {/* Charts Grid */}
            {charts.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                {charts.map((chart) => (
                  <div
                    key={chart.id}
                    onClick={() => setSelectedChartId(chart.id)}
                    className={`bg-white/5 backdrop-blur-xl rounded-2xl border p-6 hover:border-white/30 transition-all duration-300 cursor-pointer ${
                      selectedChartId === chart.id
                        ? "border-blue-400/50 ring-1 ring-blue-400/20"
                        : "border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-white">
                        {chart.title}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChart(chart.id);
                        }}
                        className="p-1 hover:bg-red-600/20 rounded transition text-red-400"
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
                    </div>
                    {renderChart(chart)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div
            className={`fixed right-0 top-16 h-[calc(100vh-4rem)] bg-slate-900/95 border-l border-white/10 transition-all duration-300 overflow-y-auto z-40 ${
              sidebarOpen ? "w-96" : "w-0"
            }`}
          >
            {sidebarOpen && (
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white">
                    Chart Settings
                  </h2>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1 hover:bg-white/10 rounded transition"
                  >
                    <svg
                      className="w-5 h-5 text-slate-400"
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

                {selectedChart ? (
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-2">
                        Chart Title
                      </label>
                      <input
                        type="text"
                        value={selectedChart.title}
                        onChange={(e) =>
                          updateChart(selectedChart.id, {
                            title: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50 transition"
                      />
                    </div>

                    {/* Chart Type */}
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-2">
                        Chart Type
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(["line", "bar", "pie", "area"] as const).map(
                          (type) => (
                            <button
                              key={type}
                              onClick={() =>
                                updateChart(selectedChart.id, { type })
                              }
                              className={`px-3 py-2 rounded-lg text-xs font-semibold transition capitalize ${
                                selectedChart.type === type
                                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                  : "bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10"
                              }`}
                            >
                              {type}
                            </button>
                          ),
                        )}
                      </div>
                    </div>

                    {/* X Field */}
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-2">
                        X-Axis Field
                      </label>
                      <select
                        value={selectedChart.xField}
                        onChange={(e) =>
                          updateChart(selectedChart.id, {
                            xField: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50 transition"
                      >
                        {availableFields.map((field) => (
                          <option
                            key={field.name}
                            value={field.name}
                            className="bg-slate-900"
                          >
                            {field.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Y Field */}
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-2">
                        Y-Axis / Value Field
                      </label>
                      <select
                        value={selectedChart.yField}
                        onChange={(e) =>
                          updateChart(selectedChart.id, {
                            yField: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50 transition"
                      >
                        {availableFields
                          .filter((f) => f.type === "numeric")
                          .map((field) => (
                            <option
                              key={field.name}
                              value={field.name}
                              className="bg-slate-900"
                            >
                              {field.name}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Color */}
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-2">
                        Color
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {COLORS.map((color) => (
                          <button
                            key={color}
                            onClick={() =>
                              updateChart(selectedChart.id, { color })
                            }
                            className={`w-full h-8 rounded-lg transition border-2 ${
                              selectedChart.color === color
                                ? "border-white"
                                : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-400 text-sm">
                    Select a chart to edit settings
                  </p>
                )}

                {/* Divider */}
                <div className="border-t border-white/10" />

                {/* Create New Chart */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">
                    Create New Chart
                  </h3>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={newChartTitle}
                      onChange={(e) => setNewChartTitle(e.target.value)}
                      placeholder="e.g., Q1 Revenue"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      Type
                    </label>
                    <select
                      value={newChartType}
                      onChange={(e) =>
                        setNewChartType(e.target.value as typeof newChartType)
                      }
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50 transition"
                    >
                      <option value="line" className="bg-slate-900">
                        Line
                      </option>
                      <option value="bar" className="bg-slate-900">
                        Bar
                      </option>
                      <option value="pie" className="bg-slate-900">
                        Pie
                      </option>
                      <option value="area" className="bg-slate-900">
                        Area
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      X-Axis
                    </label>
                    <select
                      value={newChartXField}
                      onChange={(e) => setNewChartXField(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50 transition"
                    >
                      {availableFields.map((field) => (
                        <option
                          key={field.name}
                          value={field.name}
                          className="bg-slate-900"
                        >
                          {field.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      Y-Axis
                    </label>
                    <select
                      value={newChartYField}
                      onChange={(e) => setNewChartYField(e.target.value)}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-400/50 transition"
                    >
                      {availableFields
                        .filter((f) => f.type === "numeric")
                        .map((field) => (
                          <option
                            key={field.name}
                            value={field.name}
                            className="bg-slate-900"
                          >
                            {field.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <button
                    onClick={addChart}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold text-sm transition"
                  >
                    + Add Chart
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Toggle Sidebar Button */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="fixed right-6 top-24 p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg transition z-40 shadow-lg"
              title="Open sidebar"
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
          )}
        </main>
      </div>
    </div>
  );
}
