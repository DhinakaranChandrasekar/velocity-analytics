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
    <main
      className={`min-h-screen flex items-center justify-center p-6 ${
        theme === "light"
          ? "bg-gradient-to-br from-slate-50 to-slate-100"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      }`}
    >
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div
              className={`p-4 rounded-2xl ${
                theme === "light"
                  ? "bg-gradient-to-br from-indigo-500 to-purple-500"
                  : "bg-gradient-to-br from-indigo-600 to-purple-600"
              }`}
            >
              <svg
                className="w-8 h-8 text-white"
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
          <h1
            className={`text-3xl font-bold mb-2 ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}
          >
            AI Dashboard Generator
          </h1>
          <p
            className={`text-base ${
              theme === "light" ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Upload a CSV and get instant professional dashboards
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            className={`rounded-xl border p-4 mb-6 ${
              theme === "light"
                ? "bg-red-50 border-red-200 text-red-800"
                : "bg-red-900/20 border-red-800/40 text-red-300"
            }`}
          >
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Upload Widget */}
        <CSVUploadWidget
          onUpload={handleFileUpload}
          isLoading={isLoading}
          theme={theme}
        />

        {/* Info */}
        <div
          className={`mt-8 p-4 rounded-xl border ${
            theme === "light"
              ? "bg-blue-50 border-blue-200"
              : "bg-blue-900/20 border-blue-800/40"
          }`}
        >
          <h3
            className={`font-semibold text-sm mb-3 ${
              theme === "light" ? "text-blue-900" : "text-blue-300"
            }`}
          >
            📋 Tips:
          </h3>
          <ul
            className={`text-xs space-y-2 ${
              theme === "light" ? "text-blue-800" : "text-blue-400"
            }`}
          >
            <li>• Use CSV files with 100+ rows</li>
            <li>• Include headers in the first row</li>
            <li>• Mix numeric and categorical data</li>
            <li>• Max 50MB file size</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
