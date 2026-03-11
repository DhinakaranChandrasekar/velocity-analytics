"use client";

import Image from "next/image";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  color?: "blue" | "green" | "purple" | "orange";
}

export function MetricCard({
  title,
  value,
  change,
  icon,
  trend = "neutral",
  subtitle,
  color = "blue",
}: MetricCardProps) {
  const trendStyles =
    trend === "up"
      ? "bg-green-500/10 border-green-500/30 text-green-500"
      : trend === "down"
        ? "bg-red-500/10 border-red-500/30 text-red-500"
        : "bg-slate-500/10 border-slate-400/20 text-slate-400";

  const colorGradients: Record<string, string> = {
    blue: "from-blue-600/20 to-blue-400/5 border-blue-500/20",
    green: "from-green-600/20 to-green-400/5 border-green-500/20",
    purple: "from-purple-600/20 to-purple-400/5 border-purple-500/20",
    orange: "from-orange-600/20 to-orange-400/5 border-orange-500/20",
  };

  const iconBg: Record<string, string> = {
    blue: "bg-blue-600/20 text-blue-400",
    green: "bg-green-600/20 text-green-400",
    purple: "bg-purple-600/20 text-purple-400",
    orange: "bg-orange-600/20 text-orange-400",
  };

  const sparklineData = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
  ];
  const maxValue = Math.max(...sparklineData);

  return (
    <div
      className={`group rounded-2xl border backdrop-blur-xl p-2.5 sm:p-3 transition-all duration-300 bg-gradient-to-br ${colorGradients[color]} hover:border-white/30 hover:shadow-lg hover:shadow-blue-500/10`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div
            className={`h-7 w-7 sm:h-8 sm:w-8 rounded-lg flex items-center justify-center transition ${iconBg[color]}`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value Section */}
      <div className="mb-2">
        <div className="text-xl sm:text-2xl font-bold text-white mb-1">
          {value}
        </div>
        {change !== undefined && (
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-semibold text-xs ${trendStyles}`}
          >
            {trend === "up" ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            ) : trend === "down" ? (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17l-5-5m0 0l5-5m-5 5H18"
                />
              </svg>
            ) : (
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            )}
            <span>{change}% this month</span>
          </div>
        )}
      </div>

      {/* Sparkline Chart */}
      <div className="mb-2 pt-1 pb-0.5">
        <div className="flex items-end gap-1 h-8">
          {sparklineData.map((dataPoint, idx) => (
            <div
              key={idx}
              className={`flex-1 rounded-t transition-all duration-300 group-hover:opacity-100 ${
                trend === "up"
                  ? "bg-gradient-to-t from-green-500 to-green-400"
                  : trend === "down"
                    ? "bg-gradient-to-t from-red-500 to-red-400"
                    : color === "blue"
                      ? "bg-gradient-to-t from-blue-500 to-blue-400"
                      : color === "green"
                        ? "bg-gradient-to-t from-green-500 to-green-400"
                        : color === "purple"
                          ? "bg-gradient-to-t from-purple-500 to-purple-400"
                          : "bg-gradient-to-t from-orange-500 to-orange-400"
              }`}
              style={{
                height: `${(dataPoint / maxValue) * 100}%`,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-1">Last 5 periods</p>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
        <div>
          <p className="text-xs text-slate-500">Peak</p>
          <p className="text-xs font-semibold text-white mt-0.5">
            ${(Math.random() * 10000 + 5000).toFixed(0)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Avg</p>
          <p className="text-xs font-semibold text-white mt-0.5">
            ${(Math.random() * 5000 + 2000).toFixed(0)}
          </p>
        </div>
      </div>
    </div>
  );
}
