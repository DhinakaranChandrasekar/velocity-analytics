"use client";

import { ChartComponent } from "./ChartComponent";
import { MetricCard } from "../MetricCard";

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

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <div className="border-b border-white/10 backdrop-blur-xl bg-white/5">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-6 mt-20">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  📊 {dashboard.fileName}
                </h1>
                <p className="text-sm text-slate-400 mt-2">
                  {dashboard.datasetType
                    .charAt(0)
                    .toUpperCase() +
                    dashboard.datasetType.slice(1).replace(/_/g, " ")}{" "}
                  Dashboard • {dashboard.kpis[0]?.value || 0} records
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExport}
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all text-sm font-bold"
                >
                  ⬇️ Export JSON
                </button>
                <button
                  onClick={handleNewUpload}
                  className="px-5 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all text-sm font-bold"
                >
                  📤 New File
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8">
          {/* KPI Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">
              📊 Key Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {dashboard.kpis.slice(0, 4).map((kpi, idx) => {
                const colors = ["blue", "green", "purple", "orange"] as const;
                return (
                  <MetricCard
                    key={idx}
                    title={String(kpi.label)}
                    value={kpi.value}
                    color={colors[idx % colors.length]}
                    change={Math.floor(Math.random() * 20)}
                    trend="up"
                  />
                );
              })}
            </div>
          </div>

          {/* Insights Section */}
          {dashboard.insights.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4">
                🎯 Key Insights
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {dashboard.insights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-blue-400/5 backdrop-blur-xl p-4"
                  >
                    <p className="text-sm text-blue-200 font-medium">
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
              <h2 className="text-xl font-bold text-white mb-6">
                📈 Visualizations ({dashboard.charts.length} charts)
              </h2>
              
              {/* Line Charts - 1 per row */}
              {dashboard.charts.filter(c => c.type === "line").length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-1 gap-6">
                    {dashboard.charts.filter(c => c.type === "line").map((chart) => (
                      <div
                        key={chart.id}
                        className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl p-5 transition-all duration-300 hover:border-white/25 hover:shadow-xl hover:shadow-blue-500/10"
                      >
                        <h3 className="text-sm font-bold text-white mb-4">
                          {chart.title}
                        </h3>
                        <ChartComponent chart={chart} theme={theme} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Other Charts - 2 per row */}
              {dashboard.charts.filter(c => c.type !== "line").length > 0 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {dashboard.charts.filter(c => c.type !== "line").map((chart) => (
                      <div
                        key={chart.id}
                        className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl p-5 transition-all duration-300 hover:border-white/25 hover:shadow-xl hover:shadow-blue-500/10"
                      >
                        <h3 className="text-sm font-bold text-white mb-4 line-clamp-2">
                          {chart.title}
                        </h3>
                        <ChartComponent chart={chart} theme={theme} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
