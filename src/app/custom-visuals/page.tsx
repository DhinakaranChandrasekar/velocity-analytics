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
  ScatterChart,
  Scatter,
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
  type: "line" | "bar" | "pie" | "area" | "scatter" | "number" | "combo";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [editingChartId, setEditingChartId] = useState<string | null>(null);
  const [newChartTitle, setNewChartTitle] = useState("");
  const [newChartType, setNewChartType] = useState<CustomChart["type"]>("line");
  const [newChartXField, setNewChartXField] = useState("month");
  const [newChartYField, setNewChartYField] = useState("revenue");
  const [newChartColor, setNewChartColor] = useState("#3b82f6");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  const openCreateModal = () => {
    setEditingChartId(null);
    setNewChartTitle("");
    setNewChartType("line");
    setNewChartXField("month");
    setNewChartYField("revenue");
    setNewChartColor("#3b82f6");
    setModalOpen(true);
  };

  const openEditModal = (chart: CustomChart) => {
    setEditingChartId(chart.id);
    setNewChartTitle(chart.title);
    setNewChartType(chart.type);
    setNewChartXField(chart.xField);
    setNewChartYField(chart.yField);
    setNewChartColor(chart.color);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingChartId(null);
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

  const saveChart = () => {
    if (!newChartTitle) {
      alert("Chart title is required");
      return;
    }

    if (editingChartId) {
      // Edit existing chart
      setCharts(
        charts.map((c) =>
          c.id === editingChartId
            ? {
                ...c,
                title: newChartTitle,
                type: newChartType,
                xField: newChartXField,
                yField: newChartYField,
                color: newChartColor,
              }
            : c,
        ),
      );
    } else {
      // Add new chart
      const newChart: CustomChart = {
        id: Date.now().toString(),
        title: newChartTitle,
        type: newChartType,
        xField: newChartXField,
        yField: newChartYField,
        color: newChartColor,
      };
      setCharts([...charts, newChart]);
    }

    closeModal();
  };

  const deleteChart = (id: string) => {
    setCharts(charts.filter((c) => c.id !== id));
  };

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
      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={300} key={key}>
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              data={mockData}
            >
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
              <Scatter
                dataKey={chart.yField}
                fill={chart.color}
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        );
      case "combo":
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
      case "number":
        return (
          <div key={key} className="h-80 flex items-center justify-center">
            <div className="text-center">
              <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {mockData[mockData.length - 1][
                  chart.yField as keyof (typeof mockData)[0]
                ] || 0}
              </p>
              <p className="text-slate-400 mt-4">{chart.yField}</p>
            </div>
          </div>
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
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
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
              <button
                onClick={openCreateModal}
                className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition flex items-center gap-2 h-fit whitespace-nowrap"
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Visual
              </button>
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
                  onClick={openCreateModal}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition"
                >
                  + Create Visual
                </button>
              </div>
            )}

            {/* Charts Grid */}
            {charts.length > 0 && (
              <div className="space-y-8">
                {/* Number Cards */}
                {charts.filter((c) => c.type === "number").length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-white mb-4">
                      KPI Cards
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {charts
                        .filter((c) => c.type === "number")
                        .map((chart) => (
                          <div
                            key={chart.id}
                            className="group relative bg-gradient-to-br from-blue-600/20 to-blue-400/5 border-blue-500/30 border rounded-xl p-4 transition-all duration-300 hover:border-white/20 hover:shadow-lg cursor-pointer overflow-hidden"
                          >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-3">
                                <p className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                                  {chart.title}
                                </p>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <button
                                    onClick={() => openEditModal(chart)}
                                    className="p-1.5 hover:bg-blue-600/20 rounded-lg transition text-blue-400 hover:text-blue-300"
                                    title="Edit visual"
                                  >
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
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => deleteChart(chart.id)}
                                    className="p-1.5 hover:bg-red-600/20 rounded-lg transition text-red-400 hover:text-red-300"
                                    title="Delete visual"
                                  >
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
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-baseline gap-2">
                                <p className="text-2xl sm:text-3xl font-bold text-white">
                                  {mockData[mockData.length - 1][
                                    chart.yField as keyof (typeof mockData)[0]
                                  ] || 0}
                                </p>
                              </div>
                              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 w-3/4"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Chart Visuals */}
                {charts.filter((c) => c.type !== "number").length > 0 && (
                  <div>
                    {charts.filter((c) => c.type === "number").length > 0 && (
                      <h2 className="text-lg font-semibold text-white mb-4">
                        Charts
                      </h2>
                    )}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Existing Charts */}
                      {charts
                        .filter((c) => c.type !== "number")
                        .map((chart) => (
                          <div
                            key={chart.id}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 p-6 transition-all duration-300 group"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-bold text-white">
                                {chart.title}
                              </h3>
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {/* Edit Button */}
                                <button
                                  onClick={() => openEditModal(chart)}
                                  className="p-2 hover:bg-blue-600/20 rounded-lg transition text-blue-400 hover:text-blue-300"
                                  title="Edit visual"
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
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                  </svg>
                                </button>
                                {/* Delete Button */}
                                <button
                                  onClick={() => deleteChart(chart.id)}
                                  className="p-2 hover:bg-red-600/20 rounded-lg transition text-red-400 hover:text-red-300"
                                  title="Delete visual"
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
                            </div>
                            {renderChart(chart)}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-slate-900 rounded-2xl border border-white/10 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900">
              <h2 className="text-2xl font-bold text-white">
                {editingChartId ? "Edit Visual" : "Create New Visual"}
              </h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-white/10 rounded transition text-slate-400 hover:text-white"
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

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-2">
                  Visual Title
                </label>
                <input
                  type="text"
                  value={newChartTitle}
                  onChange={(e) => setNewChartTitle(e.target.value)}
                  placeholder="e.g., Sales Trend"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition text-sm"
                />
              </div>

              {/* Chart Type */}
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-3">
                  Visualization Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      "line",
                      "bar",
                      "pie",
                      "area",
                      "scatter",
                      "number",
                      "combo",
                    ] as const
                  ).map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewChartType(type)}
                      className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition capitalize ${
                        newChartType === type
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                      }`}
                    >
                      {type === "scatter" && "Scatter"}
                      {type === "combo" && "Combo"}
                      {type === "number" && "Number"}
                      {type !== "scatter" &&
                        type !== "combo" &&
                        type !== "number" &&
                        type}
                    </button>
                  ))}
                </div>
              </div>

              {/* X Field */}
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-2">
                  X-Axis / Category Field
                </label>
                <select
                  value={newChartXField}
                  onChange={(e) => setNewChartXField(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition text-sm [&>option]:bg-slate-800"
                >
                  {availableFields.map((field) => (
                    <option key={field.name} value={field.name}>
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Y Field */}
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-2">
                  Y-Axis / Value Field
                </label>
                <select
                  value={newChartYField}
                  onChange={(e) => setNewChartYField(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition text-sm [&>option]:bg-slate-800"
                >
                  {availableFields
                    .filter((f) => f.type === "numeric")
                    .map((field) => (
                      <option key={field.name} value={field.name}>
                        {field.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="text-sm font-semibold text-slate-300 block mb-3">
                  Color
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewChartColor(color)}
                      className={`w-full h-8 rounded-lg transition border-2 ${
                        newChartColor === color
                          ? "border-white ring-2 ring-blue-400"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-white/10 bg-slate-950">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-semibold transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveChart}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition text-sm"
              >
                {editingChartId ? "Update Visual" : "Create Visual"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
