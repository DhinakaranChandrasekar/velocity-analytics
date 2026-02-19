"use client";

import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

export function MetricCard({
  title,
  value,
  change,
  icon,
  trend = "neutral",
}: MetricCardProps) {
  const { theme } = useTheme();
  const trendStyles =
    trend === "up"
      ? "bg-green-500/10 border-green-500/30 text-green-500"
      : trend === "down"
        ? "bg-red-500/10 border-red-500/30 text-red-500"
        : "bg-slate-500/10 border-slate-400/20 text-slate-400";

  return (
    <div className={`group rounded-2xl border backdrop-blur-xl p-3 sm:p-4 transition-all duration-300 ${
      theme === "light"
        ? "bg-slate-100/40 border-slate-300 hover:bg-slate-200/40 hover:border-slate-400"
        : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
    }`}>
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <h3 className={`text-xs sm:text-sm font-semibold ${
          theme === "light" ? "text-slate-600" : "text-slate-400"
        }`}>
          {title}
        </h3>
        {icon && (
          <div className={`h-4 w-4 sm:h-5 sm:w-5 transition ${
            theme === "light"
              ? "text-slate-400 group-hover:text-slate-600"
              : "text-slate-500 group-hover:text-slate-300"
          }`}>
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2 sm:gap-3">
        <div className={`text-xl sm:text-2xl font-bold break-words ${
          theme === "light" ? "text-slate-900" : "text-white"
        }`}>
          {value}
        </div>
        {change !== undefined && (
          <div
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border font-semibold text-xs flex items-center gap-1 whitespace-nowrap ${trendStyles}`}
          >
            {trend === "up" ? (
              <Image src="/up-arrow.svg" alt="up" width={8} height={8} />
            ) : trend === "down" ? (
              <Image src="/down-arrow.svg" alt="down" width={7} height={7} />
            ) : (
              <span>→</span>
            )}
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
}
