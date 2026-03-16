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
    <div className="min-h-screen bg-white flex flex-col">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
        }
      `}</style>

      {/* SLIDE 1: Hero Section */}
      <div className="min-h-screen flex relative overflow-hidden">
        {/* Left Side - Bold Background */}
        <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8 lg:p-16 relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 max-w-md text-center lg:text-left animate-slideUp">
            <div className="mb-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">Dashboard Generator</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              Your Data,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Visualized</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              Turn CSV files into professional dashboards. Instantly.
            </p>
            
            {/* CTA Button */}
            <div className="inline-block">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                Start Now →
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Upload Area */}
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-gradient-to-bl from-slate-900 to-slate-950 p-16 relative">
          <div className="w-full max-w-sm">
            {/* Upload Widget */}
            <div className="animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <CSVUploadWidget
                onUpload={handleFileUpload}
                isLoading={isLoading}
                theme={theme}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 rounded-lg border border-red-300 bg-red-50 text-red-700">
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="mt-8 space-y-3 text-center">
              <p className="text-sm text-slate-600 font-semibold">⚡ FAST PROCESSING</p>
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-2xl font-black text-cyan-600">5-8</div>
                  <p className="text-xs text-slate-500">Charts</p>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-600">&lt;2s</div>
                  <p className="text-xs text-slate-500">Process</p>
                </div>
                <div>
                  <div className="text-2xl font-black text-purple-600">∞</div>
                  <p className="text-xs text-slate-500">Possibilities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 2: How It Works - Bold Typography */}
      <div className="min-h-screen bg-white flex items-center justify-center p-8 lg:p-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl w-full">
          <div className="text-center mb-16 animate-slideUp">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2 block">Process</span>
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900">4 Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Upload", desc: "CSV file" },
              { num: "02", title: "Analyze", desc: "Auto-detect types" },
              { num: "03", title: "Generate", desc: "Select charts" },
              { num: "04", title: "Export", desc: "Share instantly" }
            ].map((step, i) => (
              <div 
                key={i}
                className="animate-slideUp group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-6xl font-black text-slate-200 group-hover:text-cyan-500 transition-colors mb-4">
                  {step.num}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLIDE 3: Features - Asymmetric Layout */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left - Text Content */}
            <div className="animate-slideUp">
              <span className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 block">Features</span>
              <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                Everything you need<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">in one tool</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Smart Visualizations</h4>
                    <p className="text-slate-600">Auto-selects the best charts for your data type</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">⚡</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Lightning Fast</h4>
                    <p className="text-slate-600">Generate complete dashboards in under 2 seconds</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-3xl">📈</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Real Insights</h4>
                    <p className="text-slate-600">AI-powered analysis reveals trends and patterns</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Visual Block */}
            <div className="relative h-96 lg:h-full min-h-96 animate-slideUp" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl opacity-10"></div>
              <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl opacity-20"></div>
              <div className="absolute bottom-8 left-8 w-40 h-40 bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl opacity-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SLIDE 4: Call to Action */}
      <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center max-w-2xl animate-slideUp">
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Ready to transform your data?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            No credit card. No setup. Just upload and explore.
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
            Get Started Free
          </button>
          <p className="text-sm text-slate-400 mt-6">
            ✨ No credit card required
          </p>
        </div>
      </div>
    </div>
  );
}
