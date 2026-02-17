"use client";

import Image from "next/image";

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
  const trendStyles =
    trend === "up"
      ? "bg-green-500/10 border-green-500/30 text-green-500"
      : trend === "down"
        ? "bg-red-500/10 border-red-500/30 text-red-500"
        : "bg-slate-500/10 border-slate-400/20 text-slate-400";

  return (
    <div className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 p-3 sm:p-4 transition-all duration-300 hover:bg-white/10\">
      <div className="flex items-start justify-between mb-3 sm:mb-4\">
        <h3 className="text-slate-400 text-xs sm:text-sm font-semibold\">
          {title}
        </h3>
        {icon && (
          <div className="text-slate-500 h-4 w-4 sm:h-5 sm:w-5 group-hover:text-slate-300 transition\">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2 sm:gap-3\">
        <div className="text-xl sm:text-2xl font-bold text-white break-words\">
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
