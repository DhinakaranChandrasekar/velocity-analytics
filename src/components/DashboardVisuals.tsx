"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/context/ThemeContext";

interface DashboardSpec {
  datasetId: string;
  datasetType: string;
  fileName: string;
  kpis: Array<{
    label: string;
    value: string | number;
    metric?: string;
  }>;
  charts: Array<{
    type: string;
    title: string;
    xAxis: string;
    yAxis: string;
    data: any[];
  }>;
  insights: string[];
}

interface DashboardVisualsProps {
  dashboard: DashboardSpec;
  theme: string;
  onReset: () => void;
}

const formatValue = (value: string | number | undefined): string => {
  if (value === undefined) return "N/A";
  if (typeof value === "number") {
    if (value > 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    }
    if (value > 1000) {
      return (value / 1000).toFixed(1) + "K";
    }
    return value.toFixed(0);
  }
  return String(value);
};

export function DashboardVisuals({
  dashboard,
  theme,
  onReset,
}: DashboardVisualsProps) {
  const getChartColor = (index: number) => {
    const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];
    return colors[index % colors.length];
  };

  const renderChart = (chart: any, index: number) => {
    const color = getChartColor(index);
    const data = chart.data || [];

    switch (chart.type.toLowerCase()) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === "light" ? "#e2e8f0" : "#475569"}
              />
              <XAxis
                dataKey={chart.xAxis}
                stroke={theme === "light" ? "#64748b" : "#94a3b8"}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke={theme === "light" ? "#64748b" : "#94a3b8"}
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "light" ? "#f8fafc" : "#1e293b",
                  border: `1px solid ${
                    theme === "light" ? "#e2e8f0" : "#475569"
                  }`,
                  borderRadius: "8px",
                }}
                labelStyle={{
                  color: theme === "light" ? "#000" : "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={chart.yAxis}
                stroke={color}
                dot={{ fill: color, r: 4 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === "light" ? "#e2e8f0" : "#475569"}
              />
              <XAxis
                dataKey={chart.xAxis}
                stroke={theme === "light" ? "#64748b" : "#94a3b8"}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke={theme === "light" ? "#64748b" : "#94a3b8"}
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "light" ? "#f8fafc" : "#1e293b",
                  border: `1px solid ${
                    theme === "light" ? "#e2e8f0" : "#475569"
                  }`,
                  borderRadius: "8px",
                }}
                labelStyle={{
                  color: theme === "light" ? "#000" : "#fff",
                }}
              />
              <Legend />
              <Bar dataKey={chart.yAxis} fill={color} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "histogram":
        return (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === "light" ? "#e2e8f0" : "#475569"}
              />
              <XAxis
                dataKey={chart.xAxis}
                stroke={theme === "light" ? "#64748b" : "#94a3b8"}
                style={{ fontSize: "12px" }}
              />
              <YAxis
                stroke={theme === "light" ? "#64748b" : "#94a3b8"}
                style={{ fontSize: "12px" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "light" ? "#f8fafc" : "#1e293b",
                  border: `1px solid ${
                    theme === "light" ? "#e2e8f0" : "#475569"
                  }`,
                  borderRadius: "8px",
                }}
                labelStyle={{
                  color: theme === "light" ? "#000" : "#fff",
                }}
              />
              <Bar
                dataKey={chart.yAxis}
                fill={color}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`p-8 lg:p-12 ${
        theme === "light"
          ? "bg-gradient-to-br from-slate-50 to-slate-100"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header with Reset Button */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1
              className={`text-3xl font-bold ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              {dashboard.fileName}
            </h1>
            <p
              className={`text-sm mt-1 ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}
            >
              Dashboard Type:{" "}
              <span className="font-semibold capitalize">
                {dashboard.datasetType}
              </span>
            </p>
          </div>
          <button
            onClick={onReset}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              theme === "light"
                ? "bg-slate-200 text-slate-900 hover:bg-slate-300"
                : "bg-slate-700 text-white hover:bg-slate-600"
            }`}
          >
            {" "}
            ↑ Upload New File
          </button>
        </div>

        {/* KPI Cards */}
        <div className="mb-12">
          <h2
            className={`text-xl font-bold mb-6 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}
          >
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboard.kpis.map((kpi, index) => (
              <div
                key={index}
                className={`rounded-lg border p-6 transition-all duration-300 hover:shadow-lg ${
                  theme === "light"
                    ? "bg-white border-slate-200 shadow-sm hover:shadow-blue-500/20"
                    : "bg-slate-800/50 border-slate-700 shadow-sm hover:shadow-blue-500/20"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    theme === "light" ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {kpi.label}
                </p>
                <p
                  className={`text-3xl font-bold mt-3 bg-clip-text text-transparent ${
                    theme === "light"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500"
                      : "bg-gradient-to-r from-blue-400 to-blue-300"
                  }`}
                >
                  {formatValue(kpi.value)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Charts */}
        {dashboard.charts.length > 0 && (
          <div className="mb-12">
            <h2
              className={`text-xl font-bold mb-6 ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              Data Visualizations
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {dashboard.charts.map((chart, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-6 ${
                    theme === "light"
                      ? "bg-white border-slate-200 shadow-lg shadow-slate-900/5"
                      : "bg-slate-800/30 border-slate-700 shadow-lg shadow-black/20"
                  }`}
                >
                  <h3
                    className={`font-semibold mb-4 ${
                      theme === "light" ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {chart.title}
                  </h3>
                  {renderChart(chart, index)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Insights */}
        {dashboard.insights.length > 0 && (
          <div className="mb-12">
            <h2
              className={`text-xl font-bold mb-6 ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              AI Insights
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {dashboard.insights.map((insight, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-4 flex items-start gap-3 ${
                    theme === "light"
                      ? "bg-blue-50 border-blue-200"
                      : "bg-blue-900/20 border-blue-800/40"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      theme === "light" ? "text-blue-600" : "text-blue-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-11-1a1 1 0 11-2 0 1 1 0 012 0zM8 8a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p
                    className={`text-sm leading-relaxed ${
                      theme === "light"
                        ? "text-blue-900"
                        : "text-blue-300"
                    }`}
                  >
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              const json = JSON.stringify(dashboard, null, 2);
              const blob = new Blob([json], { type: "application/json" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `dashboard-${dashboard.datasetId}.json`;
              a.click();
            }}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
              theme === "light"
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/40"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/40"
            }`}
          >
            📥 Export Dashboard JSON
          </button>
        </div>
      </div>
    </div>
  );
}
