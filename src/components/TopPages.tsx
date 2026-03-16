"use client";

import React from "react";

interface PageData {
  id: number;
  name: string;
  views: number;
  bounceRate: number;
  avgDuration: string;
  trend: number;
}

const mockPages: PageData[] = [
  {
    id: 1,
    name: "/dashboard",
    views: 8234,
    bounceRate: 18.5,
    avgDuration: "3m 24s",
    trend: 12,
  },
  {
    id: 2,
    name: "/products",
    views: 6421,
    bounceRate: 22.3,
    avgDuration: "2m 50s",
    trend: 8,
  },
  {
    id: 3,
    name: "/analytics",
    views: 5389,
    bounceRate: 25.1,
    avgDuration: "4m 12s",
    trend: 5,
  },
  {
    id: 4,
    name: "/settings",
    views: 3241,
    bounceRate: 45.2,
    avgDuration: "1m 30s",
    trend: -3,
  },
  {
    id: 5,
    name: "/account",
    views: 2847,
    bounceRate: 38.7,
    avgDuration: "2m 05s",
    trend: 2,
  },
];

export default function TopPages() {
  return (
    <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-xl rounded-2xl border border-white/15 p-8 mb-8 transition-all duration-500 hover:border-white/25 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white">Top Pages</h2>
          <p className="text-sm text-slate-400">
            Most visited pages and engagement metrics
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-xs font-bold text-slate-300 uppercase tracking-widest">
                Page
              </th>
              <th className="text-right py-3 px-4 text-xs font-bold text-slate-300 uppercase tracking-widest">
                Views
              </th>
              <th className="text-right py-3 px-4 text-xs font-bold text-slate-300 uppercase tracking-widest">
                Bounce Rate
              </th>
              <th className="text-right py-3 px-4 text-xs font-bold text-slate-300 uppercase tracking-widest">
                Avg Duration
              </th>
              <th className="text-right py-3 px-4 text-xs font-bold text-slate-300 uppercase tracking-widest">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {mockPages.map((page, index) => (
              <tr
                key={page.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors duration-200 group"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-white font-medium">
                      {page.name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm font-semibold text-white">
                    {page.views.toLocaleString()}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          page.bounceRate > 30
                            ? "bg-orange-500"
                            : page.bounceRate > 20
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${page.bounceRate}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-slate-400 w-10">
                      {page.bounceRate}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <span className="text-sm text-slate-300">
                    {page.avgDuration}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      page.trend >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {page.trend >= 0 ? "+" : ""}
                    {page.trend}%
                    {page.trend >= 0 ? (
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
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
