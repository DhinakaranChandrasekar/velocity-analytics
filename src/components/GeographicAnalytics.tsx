"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MapComponent = dynamic(() => import("./MapComponent"), {
  loading: () => (
    <div className="w-full h-96 bg-slate-800/50 rounded-lg animate-pulse" />
  ),
  ssr: false,
}) as React.ComponentType<{ data: any[] }>;

interface CountryData {
  code: string;
  name: string;
  users: number;
  sessions: number;
  growth: number;
  percentage: number;
}

const countryData: CountryData[] = [
  {
    code: "US",
    name: "United States",
    users: 3842,
    sessions: 5230,
    growth: 12,
    percentage: 29.9,
  },
  {
    code: "IN",
    name: "India",
    users: 1823,
    sessions: 2540,
    growth: 18,
    percentage: 14.2,
  },
  {
    code: "GB",
    name: "United Kingdom",
    users: 1245,
    sessions: 1680,
    growth: 8,
    percentage: 9.7,
  },
  {
    code: "DE",
    name: "Germany",
    users: 987,
    sessions: 1320,
    growth: 5,
    percentage: 7.7,
  },
  {
    code: "CA",
    name: "Canada",
    users: 876,
    sessions: 1180,
    growth: 10,
    percentage: 6.8,
  },
  {
    code: "AU",
    name: "Australia",
    users: 654,
    sessions: 890,
    growth: 15,
    percentage: 5.1,
  },
  {
    code: "SG",
    name: "Singapore",
    users: 543,
    sessions: 740,
    growth: 22,
    percentage: 4.2,
  },
  {
    code: "JP",
    name: "Japan",
    users: 432,
    sessions: 580,
    growth: 3,
    percentage: 3.4,
  },
  {
    code: "NL",
    name: "Netherlands",
    users: 389,
    sessions: 520,
    growth: 7,
    percentage: 3.0,
  },
  {
    code: "FR",
    name: "France",
    users: 356,
    sessions: 480,
    growth: 6,
    percentage: 2.8,
  },
];

const topCountries = countryData.slice(0, 5);

// Daily Revenue Data
const dailyRevenueData = [
  { day: "1", actual: 12500, goal: 15000 },
  { day: "2", actual: 14200, goal: 15000 },
  { day: "3", actual: 13800, goal: 15000 },
  { day: "4", actual: 16500, goal: 15000 },
  { day: "5", actual: 15200, goal: 15000 },
  { day: "6", actual: 17300, goal: 15000 },
  { day: "7", actual: 14900, goal: 15000 },
  { day: "8", actual: 18100, goal: 15000 },
  { day: "9", actual: 16700, goal: 15000 },
  { day: "10", actual: 19200, goal: 15000 },
];

export default function GeographicAnalytics() {
  const [showMap, setShowMap] = useState(false);
  const totalUsers = countryData.reduce((sum, c) => sum + c.users, 0);

  return (
    <>
      {/* Revenue Tracking Section */}
      <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl border border-white/15 p-8 transition-all duration-500 hover:border-white/25 hover:shadow-xl hover:shadow-emerald-500/10 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">
              Daily Revenue Tracking
            </h2>
            <p className="text-sm text-slate-400">
              Actual revenue vs daily goal target
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-600/20 text-emerald-300">
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
                d="M13 7h8m0 0v8m0-8L5.5 19.5M21 7l-8-4-8 4v8l8 4 8-4V7z"
              />
            </svg>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={dailyRevenueData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="day"
              stroke="rgb(148, 163, 184)"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke="rgb(148, 163, 184)"
              style={{ fontSize: "12px" }}
              label={{
                value: "Revenue ($)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value: any) => `$${value.toLocaleString()}`}
            />
            <Line
              type="monotone"
              dataKey="goal"
              stroke="rgb(100, 200, 255)"
              strokeWidth={2}
              name="Daily Goal"
              dot={false}
              isAnimationActive={false}
              opacity={0.6}
            />
            <Line
              type="natural"
              dataKey="actual"
              stroke="rgb(34, 197, 94)"
              strokeWidth={3}
              name="Actual Revenue"
              dot={(props) => {
                const { cx, cy } = props;
                return <circle cx={cx} cy={cy} r={4} fill="rgb(34, 197, 94)" />;
              }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="space-y-1">
            <p className="text-xs text-slate-400 font-semibold">
              Average Actual
            </p>
            <p className="text-lg font-bold text-green-300">$16,091</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-400 font-semibold">Average Goal</p>
            <p className="text-lg font-bold text-blue-300">$15,000</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-slate-400 font-semibold">Variance</p>
            <p className="text-lg font-bold text-emerald-300">+7.3%</p>
          </div>
        </div>
      </div>

      {/* Geographic Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* World Map Visualization */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl border border-white/15 p-8 transition-all duration-500 hover:border-white/25 hover:shadow-xl hover:shadow-cyan-500/10">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">
                {showMap ? "World Map" : "Geographic Distribution"}
              </h2>
              <p className="text-sm text-slate-400">
                {showMap
                  ? "User distribution across regions"
                  : `User base across ${countryData.length} countries`}
              </p>
            </div>
            <button
              onClick={() => setShowMap(!showMap)}
              className="p-2.5 rounded-lg bg-cyan-600/20 text-cyan-300 hover:bg-cyan-600/40 transition-all duration-300 hover:scale-110"
              title={showMap ? "Show grid view" : "Show map view"}
            >
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
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20H19a2 2 0 002-2v-2a2 2 0 00-2-2h-2.5a2 2 0 01-1-3.8m0 0H9m0 0a2 2 0 01-1-3.8m0 0H5a2 2 0 00-2 2v2a2 2 0 002 2h2.5"
                />
              </svg>
            </button>
          </div>

          {/* Conditional View */}
          {showMap ? (
            <MapComponent data={countryData} />
          ) : (
            <>
              {/* Countries Grid */}
              <div className="grid grid-cols-5 gap-2 mb-8">
                {countryData.map((country) => {
                  const intensity =
                    (country.users /
                      Math.max(...countryData.map((c) => c.users))) *
                    100;
                  const baseColor =
                    intensity > 75
                      ? "from-blue-600 to-blue-500"
                      : intensity > 50
                        ? "from-cyan-600 to-cyan-500"
                        : intensity > 25
                          ? "from-teal-600 to-teal-500"
                          : "from-slate-600 to-slate-500";

                  return (
                    <div
                      key={country.code}
                      className="group relative"
                      title={`${country.name}: ${country.users.toLocaleString()} users`}
                    >
                      <div
                        className={`aspect-square rounded-xl bg-gradient-to-br ${baseColor} opacity-70 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer group-hover:scale-110 shadow-lg`}
                      >
                        <div className="text-center">
                          <p className="text-xs font-bold text-white">
                            {country.code}
                          </p>
                          <p className="text-xs font-semibold text-white/80 mt-0.5">
                            {(country.users / 1000).toFixed(1)}k
                          </p>
                        </div>
                      </div>

                      {/* Hover Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                        <div className="bg-slate-900 border border-white/20 rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                          <p className="text-xs font-bold text-white">
                            {country.name}
                          </p>
                          <p className="text-xs text-cyan-300">
                            {country.users.toLocaleString()} users
                          </p>
                          <p className="text-xs text-slate-400">
                            {country.percentage}% of total
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-500/30 p-5 transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none"></div>
                  <div className="relative z-10">
                    <p className="text-xs text-blue-200/70 font-semibold mb-2 uppercase tracking-wide">
                      Total Users
                    </p>
                    <p className="text-3xl font-bold text-blue-100">
                      {totalUsers.toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-300/50 mt-2">
                      +12% from last month
                    </p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-600/20 to-cyan-500/10 border border-cyan-500/30 p-5 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/20">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-cyan-600/10 to-transparent pointer-events-none"></div>
                  <div className="relative z-10">
                    <p className="text-xs text-cyan-200/70 font-semibold mb-2 uppercase tracking-wide">
                      Countries
                    </p>
                    <p className="text-3xl font-bold text-cyan-100">
                      {countryData.length}
                    </p>
                    <p className="text-xs text-cyan-300/50 mt-2">
                      Global reach
                    </p>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-600/20 to-emerald-500/10 border border-emerald-500/30 p-5 transition-all duration-300 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-600/10 to-transparent pointer-events-none"></div>
                  <div className="relative z-10">
                    <p className="text-xs text-emerald-200/70 font-semibold mb-2 uppercase tracking-wide">
                      Top Region
                    </p>
                    <p className="text-3xl font-bold text-emerald-100">29.9%</p>
                    <p className="text-xs text-emerald-300/50 mt-2">
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Top Countries List */}
        <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl border border-white/15 p-8 transition-all duration-500 hover:border-white/25 hover:shadow-xl hover:shadow-cyan-500/10">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">Top Regions</h2>
              <p className="text-sm text-slate-400">
                Highest user concentration
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-cyan-600/20 text-cyan-300">
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

          <div className="space-y-4">
            {topCountries.map((country, index) => (
              <div key={country.code} className="group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 font-bold text-sm text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {country.name}
                      </p>
                      <p className="text-xs text-slate-400">{country.code}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">
                      {country.users.toLocaleString()}
                    </p>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        country.growth > 0
                          ? "bg-green-500/20 text-green-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {country.growth > 0 ? (
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L13.586 7H12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 13a1 1 0 110 2H7a1 1 0 01-1-1V9a1 1 0 112 0v3.586l4.293-4.293a1 1 0 011.414 1.414L9.414 13H12z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {Math.abs(country.growth)}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/50"
                    style={{ width: `${country.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Remaining */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-400 font-semibold">
                Other Countries (5)
              </p>
              <p className="text-sm font-bold text-white">
                {(
                  100 - topCountries.reduce((sum, c) => sum + c.percentage, 0)
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
