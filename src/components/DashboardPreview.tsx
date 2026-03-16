"use client";

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

interface DashboardPreviewProps {
  dashboard: DashboardSpec;
  theme: string;
}

export function DashboardPreview({
  dashboard,
  theme,
}: DashboardPreviewProps) {
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

  return (
    <div className="space-y-6">
      {/* Dataset Info */}
      <div
        className={`rounded-lg border p-4 flex items-center justify-between ${
          theme === "light"
            ? "bg-blue-50 border-blue-200 text-blue-900"
            : "bg-blue-900/20 border-blue-800/40 text-blue-300"
        }`}
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <div>
            <p className="text-sm font-semibold">Dataset Type: {dashboard.datasetType.toUpperCase()}</p>
            <p className="text-xs opacity-75">File: {dashboard.fileName}</p>
          </div>
        </div>
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* KPI Cards */}
      <div>
        <h2
          className={`text-lg font-semibold mb-4 ${
            theme === "light" ? "text-slate-900" : "text-white"
          }`}
        >
          Key Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dashboard.kpis.map((kpi, index) => (
            <div
              key={index}
              className={`rounded-lg border p-4 transition-all duration-300 ${
                theme === "light"
                  ? "bg-white/80 border-slate-200 shadow-lg shadow-slate-900/5 hover:shadow-lg hover:shadow-blue-200/30"
                  : "bg-white/5 border-white/10 shadow-lg shadow-black/20 backdrop-blur-xl hover:bg-white/10 hover:border-white/20"
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
                className={`text-2xl font-bold mt-2 bg-clip-text text-transparent ${
                  theme === "light"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gradient-to-r from-blue-400 to-purple-400"
                }`}
              >
                {formatValue(kpi.value)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      {dashboard.insights.length > 0 && (
        <div>
          <h2
            className={`text-lg font-semibold mb-4 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}
          >
            AI Insights
          </h2>
          <div className="space-y-3">
            {dashboard.insights.map((insight, index) => (
              <div
                key={index}
                className={`rounded-lg border p-4 flex items-start gap-3 ${
                  theme === "light"
                    ? "bg-amber-50 border-amber-200 text-amber-900"
                    : "bg-amber-900/20 border-amber-800/40 text-amber-300"
                }`}
              >
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72a1 1 0 01.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Charts Info */}
      {dashboard.charts.length > 0 && (
        <div>
          <h2
            className={`text-lg font-semibold mb-4 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}
          >
            Charts Generated
          </h2>
          <div className="space-y-3">
            {dashboard.charts.map((chart, index) => (
              <div
                key={index}
                className={`rounded-lg border p-4 ${
                  theme === "light"
                    ? "bg-white/80 border-slate-200 shadow-lg shadow-slate-900/5"
                    : "bg-white/5 border-white/10 shadow-lg shadow-black/20 backdrop-blur-xl"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className={`font-semibold ${
                        theme === "light"
                          ? "text-slate-900"
                          : "text-white"
                      }`}
                    >
                      {chart.title}
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        theme === "light"
                          ? "text-slate-600"
                          : "text-slate-400"
                      }`}
                    >
                      <span className="font-medium">Type:</span> {chart.type} |{" "}
                      <span className="font-medium">X:</span> {chart.xAxis} |{" "}
                      <span className="font-medium">Y:</span> {chart.yAxis}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      theme === "light"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-blue-900/40 text-blue-300"
                    }`}
                  >
                    {chart.type.toUpperCase()}
                  </span>
                </div>
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
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            theme === "light"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/40"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/40"
          }`}
        >
          📥 Export Dashboard JSON
        </button>
      </div>
    </div>
  );
}
