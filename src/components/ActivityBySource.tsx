"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const sourceData = [
  { name: "Direct", value: 4210, percentage: 28 },
  { name: "Organic Search", value: 3840, percentage: 26 },
  { name: "Referral", value: 2520, percentage: 17 },
  { name: "Social Media", value: 2310, percentage: 15 },
  { name: "Ads", value: 1950, percentage: 14 },
];

const COLORS = ["#3b82f6", "#a855f7", "#10b981", "#f59e0b", "#ef4444"];

export default function ActivityBySource() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Traffic Sources Chart */}
      <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl border border-white/15 p-8 transition-all duration-500 hover:border-white/25 hover:shadow-xl hover:shadow-purple-500/10">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Traffic Sources</h2>
            <p className="text-sm text-slate-400">User acquisition channels</p>
          </div>
          <div className="p-2.5 rounded-lg bg-purple-600/20 text-purple-300">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Pie
              data={sourceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percentage }) => `${percentage}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {sourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Source Details */}
      <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl border border-white/15 p-8 transition-all duration-500 hover:border-white/25 hover:shadow-xl hover:shadow-purple-500/10">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Source Details</h2>
            <p className="text-sm text-slate-400">
              Breakdown by traffic source
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-purple-600/20 text-purple-300">
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
          </div>
        </div>

        <div className="space-y-4">
          {sourceData.map((source, index) => (
            <div key={source.name} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-sm font-medium text-white">
                    {source.name}
                  </span>
                </div>
                <span className="text-sm font-bold text-white">
                  {source.value.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: COLORS[index],
                    width: `${source.percentage}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-500"></span>
                <span className="text-xs text-slate-400">
                  {source.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-3">
            Total Users
          </p>
          <p className="text-3xl font-bold text-white">14,830</p>
        </div>
      </div>
    </div>
  );
}
