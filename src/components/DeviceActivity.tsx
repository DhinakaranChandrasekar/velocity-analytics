"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const deviceData = [
  { device: "Desktop", users: 5420, sessions: 7230, bounce: 18 },
  { device: "Mobile", users: 4850, sessions: 6120, bounce: 35 },
  { device: "Tablet", users: 2577, sessions: 3200, bounce: 28 },
];

export default function DeviceActivity() {
  const totalUsers = deviceData.reduce((sum, item) => sum + item.users, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chart */}
      <div className="lg:col-span-2 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl border border-white/15 p-8 transition-all duration-500 hover:border-white/25 hover:shadow-xl hover:shadow-green-500/10">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Activity by Device</h2>
            <p className="text-sm text-slate-400">
              Performance across different devices
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-green-600/20 text-green-300">
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
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={deviceData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="device"
              stroke="rgba(148,163,184,0.5)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="rgba(148,163,184,0.5)"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Legend />
            <Bar dataKey="users" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            <Bar dataKey="sessions" fill="#a855f7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Device Stats */}
      <div className="space-y-4">
        {deviceData.map((device, index) => (
          <div
            key={device.device}
            className={`bg-gradient-to-br ${
              index === 0
                ? "from-blue-600/20 to-blue-400/5 border-blue-500/30"
                : index === 1
                  ? "from-purple-600/20 to-purple-400/5 border-purple-500/30"
                  : "from-green-600/20 to-green-400/5 border-green-500/30"
            } border rounded-xl p-4`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">{device.device}</h3>
              <span className="text-xs font-semibold text-slate-300">
                {((device.users / totalUsers) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="space-y-2 mb-3">
              <p className="text-xs text-slate-400">
                Users:{" "}
                <span className="text-white font-semibold">
                  {device.users.toLocaleString()}
                </span>
              </p>
              <p className="text-xs text-slate-400">
                Sessions:{" "}
                <span className="text-white font-semibold">
                  {device.sessions.toLocaleString()}
                </span>
              </p>
              <p className="text-xs text-slate-400">
                Bounce Rate:{" "}
                <span
                  className={`font-semibold ${
                    device.bounce > 30
                      ? "text-orange-400"
                      : device.bounce > 20
                        ? "text-yellow-400"
                        : "text-green-400"
                  }`}
                >
                  {device.bounce}%
                </span>
              </p>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  index === 0
                    ? "bg-blue-500"
                    : index === 1
                      ? "bg-purple-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${(device.users / totalUsers) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
