"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

interface GoalCardProps {
  id: string;
  title: string;
  category: string;
  target: number;
  current: number;
  unit: string;
  progress: number;
  status: "on-track" | "at-risk" | "behind" | "completed";
  daysRemaining: number;
  trend: Array<{ day: number; value: number }>;
  icon: string;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const getCategoryIcon = (category: string) => {
  const icons: Record<string, React.ReactNode> = {
    Growth: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
        <polyline points="3 13 7 9 11 13 17 7" />
      </svg>
    ),
    Revenue: <span className="text-xl font-bold">$</span>,
    Engagement: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    Operations: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
      </svg>
    ),
    Product: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
      </svg>
    ),
    Performance: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
        <path d="M9 14l2-2 3 3 5-5" />
      </svg>
    ),
  };
  return icons[category] || icons["Growth"];
};

const statusConfig = {
  "on-track": {
    label: "On Track",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    progressColor: "bg-emerald-500",
    icon: "✓",
  },
  "at-risk": {
    label: "At Risk",
    color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    progressColor: "bg-amber-500",
    icon: "⚠",
  },
  behind: {
    label: "Behind",
    color: "bg-red-500/20 text-red-400 border-red-500/30",
    progressColor: "bg-red-500",
    icon: "!",
  },
  completed: {
    label: "Completed",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    progressColor: "bg-blue-500",
    icon: "★",
  },
};

export default function GoalCard({
  id,
  title,
  category,
  target,
  current,
  unit,
  progress,
  status,
  daysRemaining,
  trend,
  icon,
  onEdit,
  onRemove,
}: GoalCardProps) {
  const config = statusConfig[status];
  const remainingValue = target - current;
  const percentageComplete = ((current / target) * 100).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-white/10 p-6 hover:border-white/20 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="text-white">{getCategoryIcon(category)}</div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">{title}</h3>
            <p className="text-slate-400 text-sm mt-1">{category}</p>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
        >
          {config.label}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300 text-sm">Progress</span>
          <span className="text-white font-semibold">
            {percentageComplete}%
          </span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${config.progressColor}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
            Current
          </p>
          <p className="text-white text-lg font-bold">
            {typeof current === "number" ? current.toLocaleString() : current}
            <span className="text-slate-400 text-sm font-normal ml-1">
              {unit}
            </span>
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
            Target
          </p>
          <p className="text-white text-lg font-bold">
            {typeof target === "number" ? target.toLocaleString() : target}
            <span className="text-slate-400 text-sm font-normal ml-1">
              {unit}
            </span>
          </p>
        </div>
      </div>

      {/* Remaining & Days */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-sm">
          <p className="text-slate-400 mb-1">Remaining</p>
          <p className="text-white font-semibold">
            {remainingValue.toLocaleString()} {unit}
          </p>
        </div>
        <div className="text-sm">
          <p className="text-slate-400 mb-1">Days Left</p>
          <p className="text-white font-semibold">{daysRemaining} days</p>
        </div>
      </div>

      {/* Trend Chart */}
      {trend && trend.length > 0 && (
        <div className="h-16 -mx-2 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#e2e8f0" }}
                formatter={(value) => [value, unit]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={config.progressColor.replace("bg-", "#")}
                dot={false}
                strokeWidth={2}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Footer */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-slate-500">Monthly Goal</span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit?.(id)}
            className="px-3 py-1 text-xs rounded border border-white/10 text-slate-300 hover:bg-white/5 hover:border-white/20 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onRemove?.(id)}
            className="px-3 py-1 text-xs rounded border border-red-500/20 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
