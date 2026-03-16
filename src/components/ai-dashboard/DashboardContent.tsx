"use client";

import { ChartComponent } from "./ChartComponent";
import { KPICards } from "./KPICards";

interface DashboardSpec {
  datasetId: string;
  datasetType: string;
  fileName: string;
  kpis: Array<{
    label: string;
    value: number | string;
    change?: number;
    metric?: string;
  }>;
  charts: Array<{
    id: string;
    type: string;
    title: string;
    xAxis: string;
    yAxis: string;
    data: any[];
  }>;
  insights: string[];
}

interface DashboardContentProps {
  dashboard: DashboardSpec;
  theme: string;
}

export function DashboardContent({
  dashboard,
  theme,
}: DashboardContentProps) {
  const handleExport = () => {
    const json = JSON.stringify(dashboard, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-${dashboard.datasetId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNewUpload = () => {
    window.location.reload();
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors ${
        theme === "light"
          ? "bg-gradient-to-br from-slate-50 to-slate-100"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b sticky top-0 z-50 ${
          theme === "light"
            ? "bg-white/80 border-slate-200"
            : "bg-slate-800/80 border-slate-700"
        } backdrop-blur-xl`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1
              className={`text-3xl font-bold ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              📊 {dashboard.fileName}
            </h1>
            <p
              className={`text-sm mt-2 ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}
            >
              {dashboard.datasetType.charAt(0).toUpperCase() +
                dashboard.datasetType.slice(1).replace(/_/g, " ")}{" "}
              • {dashboard.kpis[0]?.value || 0} records
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 transition-all text-sm font-medium shadow-md"
            >
              ⬇️ Export
            </button>
            <button
              onClick={handleNewUpload}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                theme === "light"
                  ? "bg-slate-200 text-slate-900 hover:bg-slate-300"
                  : "bg-slate-700 text-white hover:bg-slate-600"
              }`}
            >
              📤 New File
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* KPI Cards */}
        <div className="mb-14">
          <h2
            className={`text-2xl font-bold mb-6 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}
          >
            📊 Key Metrics
          </h2>
          <KPICards kpis={dashboard.kpis} theme={theme} />
        </div>

        {/* Insights Section */}
        {dashboard.insights.length > 0 && (
          <div className="mb-14">
            <h2
              className={`text-2xl font-bold mb-6 ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              🎯 Key Insights
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {dashboard.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border p-5 transition-all ${
                    theme === "light"
                      ? "bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100"
                      : "bg-blue-900/20 border-blue-800/50 text-blue-200 hover:bg-blue-900/30"
                  }`}
                >
                  <p className="text-base leading-relaxed font-medium">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Charts Section */}
        {dashboard.charts.length > 0 && (
          <div>
            <h2
              className={`text-2xl font-bold mb-8 ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              📈 Visualizations ({dashboard.charts.length} charts)
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {dashboard.charts.map((chart) => (
                <div
                  key={chart.id}
                  className={`rounded-xl border p-8 transition-all ${
                    theme === "light"
                      ? "bg-white border-slate-200 shadow-lg hover:shadow-xl"
                      : "bg-slate-800/50 border-slate-700 shadow-lg backdrop-blur-sm hover:bg-slate-800/60"
                  }`}
                >
                  <h3
                    className={`text-lg font-bold mb-6 ${
                      theme === "light" ? "text-slate-900" : "text-white"
                    }`}
                  >
                    {chart.title}
                  </h3>
                  <div className="w-full h-96">
                    <ChartComponent chart={chart} theme={theme} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
