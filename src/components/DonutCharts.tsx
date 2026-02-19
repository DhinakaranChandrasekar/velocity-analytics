"use client";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "@/context/ThemeContext";
import { CustomTooltip } from "./CustomTooltip";

const revenueBySourceData = [
  { name: "Direct Sales", value: 45000, percentage: 32 },
  { name: "Organic", value: 35000, percentage: 25 },
  { name: "Paid Ads", value: 40000, percentage: 29 },
  { name: "Partners", value: 20000, percentage: 14 },
];

const revenueByProductData = [
  { name: "Product A", value: 55000, percentage: 39 },
  { name: "Product B", value: 45000, percentage: 32 },
  { name: "Product C", value: 40000, percentage: 29 },
];

const subscriptionTiersData = [
  { name: "Starter", value: 25000, percentage: 18 },
  { name: "Pro", value: 65000, percentage: 46 },
  { name: "Enterprise", value: 50000, percentage: 36 },
];

const COLORS = ["#3b82f6", "#a855f7", "#ec4899", "#f59e0b"];
const COLORS_2 = ["#06b6d4", "#8b5cf6", "#ef4444"];
const COLORS_3 = ["#10b981", "#f59e0b", "#ef4444"];

export function DonutCharts() {
  const { theme } = useTheme();
  return (
    <div className={`backdrop-blur-xl rounded-2xl border p-4 sm:p-5 lg:p-6 transition ${
      theme === "light"
        ? "bg-slate-100/40 border-slate-300"
        : "bg-white/5 border-white/10"
    }`}>
      {/* <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
        Revenue Distribution
      </h3> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue by Source */}
        <div>
          <h4 className={`text-xs font-semibold mb-3 text-center ${
            theme === "light" ? "text-slate-700" : "text-white"
          }`}>
            Revenue by Source
          </h4>
          <div style={{ width: "100%", height: "220px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBySourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {revenueBySourceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={(props: any) => (
                    <CustomTooltip
                      {...props}
                      formatter={(value: any) =>
                        `$${(value / 1000).toFixed(1)}K`
                      }
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-col items-center space-y-2">
            {revenueBySourceData.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                ></div>
                <span className={theme === "light" ? "text-slate-600" : "text-slate-300"}>{item.name}</span>
                <span className={`font-medium ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}>
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Product */}
        <div>
          <h4 className={`text-xs font-semibold mb-3 text-center ${
            theme === "light" ? "text-slate-700" : "text-white"
          }`}>
            Revenue by Product
          </h4>
          <div style={{ width: "100%", height: "220px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueByProductData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {revenueByProductData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS_2[index % COLORS_2.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={(props: any) => (
                    <CustomTooltip
                      {...props}
                      formatter={(value: any) =>
                        `$${(value / 1000).toFixed(1)}K`
                      }
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-col items-center space-y-2">
            {revenueByProductData.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS_2[i % COLORS_2.length] }}
                ></div>
                <span className={theme === "light" ? "text-slate-600" : "text-slate-300"}>{item.name}</span>
                <span className={`font-medium ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}>
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Tiers */}
        <div>
          <h4 className={`text-xs font-semibold mb-3 text-center ${
            theme === "light" ? "text-slate-700" : "text-white"
          }`}>
            Subscription Tiers
          </h4>
          <div style={{ width: "100%", height: "220px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subscriptionTiersData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {subscriptionTiersData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS_3[index % COLORS_3.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={(props: any) => (
                    <CustomTooltip
                      {...props}
                      formatter={(value: any) =>
                        `$${(value / 1000).toFixed(1)}K`
                      }
                    />
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-col items-center space-y-2">
            {subscriptionTiersData.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: COLORS_3[i % COLORS_3.length] }}
                ></div>
                <span className={theme === "light" ? "text-slate-600" : "text-slate-300"}>{item.name}</span>
                <span className={`font-medium ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}>
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
