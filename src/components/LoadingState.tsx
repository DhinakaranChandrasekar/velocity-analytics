"use client";

import { useTheme } from "@/context/ThemeContext";

export function LoadingState({ theme }: { theme: string }) {
  return (
    <div
      className={`rounded-xl border p-8 ${
        theme === "light"
          ? "bg-white/80 border-slate-200 shadow-lg shadow-slate-900/5"
          : "bg-white/5 border-white/10 shadow-lg shadow-black/20 backdrop-blur-xl"
      }`}
    >
      <div className="space-y-6">
        {/* Loading Header */}
        <div className="text-center py-8">
          <div className="inline-block mb-4">
            <div className="inline-block animate-spin">
              <svg
                className="w-12 h-12 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
          <h3
            className={`text-xl font-semibold ${
              theme === "light" ? "text-slate-900" : "text-white"
            }`}
          >
            Analyzing your data...
          </h3>
          <p
            className={`text-sm mt-2 ${
              theme === "light" ? "text-slate-600" : "text-slate-400"
            }`}
          >
            Our AI is profiling your dataset and generating insights
          </p>
        </div>

        {/* Progress Items */}
        <div className="space-y-3">
          {[
            "Parsing CSV",
            "Profiling data",
            "Detecting patterns",
            "Generating charts",
            "Creating insights",
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="relative w-6 h-6">
                <div
                  className={`absolute inset-0 rounded-full animate-pulse ${
                    theme === "light"
                      ? "bg-blue-200"
                      : "bg-blue-500/30"
                  }`}
                />
                <svg
                  className="w-6 h-6 text-blue-500 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span
                className={`text-sm font-medium ${
                  theme === "light" ? "text-slate-700" : "text-slate-300"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
