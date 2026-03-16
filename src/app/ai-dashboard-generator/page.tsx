"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { CSVUploadWidget } from "@/components/ai-dashboard/CSVUploadWidget";
import { DashboardContent } from "@/components/ai-dashboard/DashboardContent";
import { LoadingState } from "@/components/ai-dashboard/LoadingState";

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

export default function AIDashboardGenerator() {
  const { theme } = useTheme();
  const [dashboard, setDashboard] = useState<DashboardSpec | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/generate-dashboard", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate dashboard");
      }

      const data: DashboardSpec = await response.json();
      setDashboard(data);
      setIsLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      setIsLoading(false);
    }
  };

  // If dashboard loaded, show full dashboard
  if (dashboard && !isLoading) {
    return <DashboardContent dashboard={dashboard} theme={theme} />;
  }

  // If loading, show loading state
  if (isLoading) {
    return <LoadingState theme={theme} />;
  }

  // Show upload screen
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

      {/* Main Content - Centered */}
      <div className="flex-1 flex flex-col relative z-10">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="w-full max-w-2xl">
            {/* Title Section */}
            <div className="mb-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-600/30 to-purple-600/20 border border-indigo-400/30">
                  <svg
                    className="w-8 h-8 text-indigo-300"
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
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-3">
                AI Dashboard Generator
              </h1>
              <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
                Upload a CSV file and instantly get professional dashboards with smart visualizations and actionable insights
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-8 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Upload Widget */}
            <div className="mb-8">
              <CSVUploadWidget
                onUpload={handleFileUpload}
                isLoading={isLoading}
                theme={theme}
              />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">📊</span>
                  <h3 className="font-semibold text-white">Smart Charts</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Auto-detects data types and generates 5-8 relevant visualizations
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">🎯</span>
                  <h3 className="font-semibold text-white">Deep Insights</h3>
                </div>
                <p className="text-xs text-slate-400">
                  AI-powered analysis reveals trends, patterns, and metrics
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">⚡</span>
                  <h3 className="font-semibold text-white">Instant Results</h3>
                </div>
                <p className="text-xs text-slate-400">
                  Get professional dashboards in seconds, ready to export
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
