"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const mockTimeData = [
  { time: "00:00", users: 342, sessions: 456 },
  { time: "04:00", users: 228, sessions: 301 },
  { time: "08:00", users: 1201, sessions: 1890 },
  { time: "12:00", users: 2290, sessions: 3200 },
  { time: "16:00", users: 2000, sessions: 2800 },
  { time: "20:00", users: 1500, sessions: 2100 },
  { time: "23:59", users: 800, sessions: 1100 },
];

export default function ActivityTimeline() {
  return (
    <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl border border-white/15 p-8 mb-8 transition-all duration-500 hover:border-white/25 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white">Activity Over Time</h2>
          <p className="text-sm text-slate-400">
            Real-time user activity throughout the day
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-300">
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

      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={mockTimeData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="time"
            stroke="rgba(148,163,184,0.5)"
            style={{ fontSize: "12px" }}
          />
          <YAxis stroke="rgba(148,163,184,0.5)" style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#fff" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#a855f7"
            strokeWidth={2}
            dot={{ fill: "#a855f7", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
