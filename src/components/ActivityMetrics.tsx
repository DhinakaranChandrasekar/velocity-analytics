"use client";

import React from "react";

interface MetricProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricProps> = ({
  title,
  value,
  change,
  icon,
  color,
}) => {
  const isPositive = change >= 0;

  return (
    <div
      className={`group relative bg-gradient-to-br ${
        color === "blue"
          ? "from-blue-600/25 via-blue-500/10 to-blue-400/5 border-blue-400/40"
          : color === "purple"
            ? "from-purple-600/25 via-purple-500/10 to-purple-400/5 border-purple-400/40"
            : color === "green"
              ? "from-green-600/25 via-green-500/10 to-green-400/5 border-green-400/40"
              : "from-orange-600/25 via-orange-500/10 to-orange-400/5 border-orange-400/40"
      } border rounded-2xl p-5 transition-all duration-500 hover:border-white/30 hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none"></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <p className="text-xs font-bold text-slate-200 uppercase tracking-widest">
            {title}
          </p>
          <div
            className={`p-2 rounded-lg ${
              color === "blue"
                ? "bg-blue-600/20 text-blue-400"
                : color === "purple"
                  ? "bg-purple-600/20 text-purple-400"
                  : color === "green"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-orange-600/20 text-orange-400"
            }`}
          >
            {icon}
          </div>
        </div>
        <div className="flex items-baseline gap-3 mb-4">
          <p className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-300">
            {value}
          </p>
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
              isPositive
                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                : "bg-red-500/20 text-red-300 border border-red-500/30"
            }`}
          >
            {isPositive ? (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1V9a1 1 0 112 0v3.586l4.293-4.293a1 1 0 011.414 1.414L9.414 13H12z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {isPositive ? "+" : ""}
            {change}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 group-hover:w-4/5 ${
              color === "blue"
                ? "bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400"
                : color === "purple"
                  ? "bg-gradient-to-r from-purple-500 via-purple-400 to-pink-400"
                  : color === "green"
                    ? "bg-gradient-to-r from-green-500 via-green-400 to-emerald-400"
                    : "bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400"
            } w-3/4`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default function ActivityMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <MetricCard
        title="Active Users"
        value="12,847"
        change={12}
        color="blue"
        icon={
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
              d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        }
      />
      <MetricCard
        title="Total Sessions"
        value="45,230"
        change={8}
        color="purple"
        icon={
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      />
      <MetricCard
        title="Avg. Session"
        value="4m 32s"
        change={3}
        color="green"
        icon={
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        }
      />
      <MetricCard
        title="Bounce Rate"
        value="32.5%"
        change={-2}
        color="orange"
        icon={
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
              d="M7 11s1.5 2 5 2 5-2 5-2M9 20h6a2 2 0 002-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        }
      />
    </div>
  );
}
