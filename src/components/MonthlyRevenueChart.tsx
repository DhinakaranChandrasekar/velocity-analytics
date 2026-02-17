"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";

const monthlyData = [
  { month: "Jan", revenue2025: 45000, revenue2026: 52000 },
  { month: "Feb", revenue2025: 52000, revenue2026: 58000 },
  { month: "Mar", revenue2025: 48000, revenue2026: 55000 },
  { month: "Apr", revenue2025: 61000, revenue2026: 68000 },
  { month: "May", revenue2025: 55000, revenue2026: 62000 },
  { month: "Jun", revenue2025: 67000, revenue2026: 74000 },
  { month: "Jul", revenue2025: 52000, revenue2026: 59000 },
  { month: "Aug", revenue2025: 54000, revenue2026: 61000 },
  { month: "Sep", revenue2025: 63000, revenue2026: 71000 },
  { month: "Oct", revenue2025: 72000, revenue2026: 82000 },
  { month: "Nov", revenue2025: 85000, revenue2026: 96000 },
  { month: "Dec", revenue2025: 98000, revenue2026: 115000 },
];

const generateDayData = (startDate: Date) => {
  let data = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      day: `Day ${i + 1}`,
      revenue2025: Math.floor(Math.random() * 5000 + 2000),
      revenue2026: Math.floor(Math.random() * 6000 + 2500),
    });
  }
  return data;
};

const generateWeekData = (startDate: Date) => {
  let data = [];
  for (let i = 0; i < 8; i++) {
    data.push({
      week: `W${i + 1}`,
      revenue2025: Math.floor(Math.random() * 35000 + 15000),
      revenue2026: Math.floor(Math.random() * 42000 + 18000),
    });
  }
  return data;
};

const generateQuarterData = () => {
  return [
    { quarter: "Q1", revenue2025: 145000, revenue2026: 165000 },
    { quarter: "Q2", revenue2025: 183000, revenue2026: 204000 },
    { quarter: "Q3", revenue2025: 169000, revenue2026: 191000 },
    { quarter: "Q4", revenue2025: 255000, revenue2026: 293000 },
  ];
};

const generateYearData = () => {
  return [
    { year: "2025", revenue2025: 752000, revenue2026: 0 },
    { year: "2026", revenue2025: 0, revenue2026: 853000 },
  ];
};

type ViewType = "day" | "week" | "month" | "quarter" | "year";

export function MonthlyRevenueChart() {
  const [view, setView] = useState<ViewType>("month");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));

  const getChartData = () => {
    switch (view) {
      case "day":
        return generateDayData(currentDate);
      case "week":
        return generateWeekData(currentDate);
      case "quarter":
        return generateQuarterData();
      case "year":
        return generateYearData();
      default:
        return monthlyData;
    }
  };

  const getXAxisDataKey = () => {
    switch (view) {
      case "day":
        return "day";
      case "week":
        return "week";
      case "quarter":
        return "quarter";
      case "year":
        return "year";
      default:
        return "month";
    }
  };

  const handlePrev = () => {
    if (view === "day" || view === "week") {
      const newDate = new Date(currentDate);
      const daysToSubtract = view === "day" ? 30 : 56;
      newDate.setDate(newDate.getDate() - daysToSubtract);
      setCurrentDate(newDate);
    }
  };

  const handleNext = () => {
    if (view === "day" || view === "week") {
      const newDate = new Date(currentDate);
      const daysToAdd = view === "day" ? 30 : 56;
      newDate.setDate(newDate.getDate() + daysToAdd);
      setCurrentDate(newDate);
    }
  };

  const getDateRangeLabel = () => {
    if (view === "day") {
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 29);
      return `${currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    }
    if (view === "week") {
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 55);
      return `${currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
    }
    return "All time";
  };

  const chartData = getChartData();

  console.log(
    "MonthlyRevenueChart - view:",
    view,
    "data length:",
    chartData?.length,
    "data:",
    chartData,
  );

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-5 lg:p-6 transition">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          Revenue Comparison
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="flex gap-2 flex-wrap">
            {(["day", "week", "month", "quarter", "year"] as const).map((v) => (
              <button
                key={v}
                onClick={() => {
                  setView(v);
                  setCurrentDate(new Date(2026, 0, 1));
                }}
                className={`px-3 py-1 text-xs rounded-lg font-medium transition ${
                  view === v
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                }`}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={
                view === "month" || view === "quarter" || view === "year"
              }
              className={`p-1.5 rounded-lg transition ${
                view === "month" || view === "quarter" || view === "year"
                  ? "bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed opacity-50"
                  : "bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition text-slate-300"
              }`}
            >
              ←
            </button>
            <span className="text-xs text-slate-400 whitespace-nowrap min-w-fit">
              {getDateRangeLabel()}
            </span>
            <button
              onClick={handleNext}
              disabled={
                view === "month" || view === "quarter" || view === "year"
              }
              className={`p-1.5 rounded-lg transition ${
                view === "month" || view === "quarter" || view === "year"
                  ? "bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed opacity-50"
                  : "bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition text-slate-300"
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", height: "384px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis
              dataKey={getXAxisDataKey()}
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              type="number"
            />
            <Tooltip
              content={(props: any) => (
                <CustomTooltip
                  {...props}
                  formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`}
                />
              )}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "12px",
                fontSize: "12px",
              }}
              iconType="circle"
              iconSize={12}
            />
            <Bar
              dataKey="revenue2025"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
              name="2025 Revenue"
              isAnimationActive={false}
              cursor="default"
              barSize={35}
            />
            <Bar
              dataKey="revenue2026"
              fill="#a855f7"
              radius={[8, 8, 0, 0]}
              name="2026 Revenue"
              isAnimationActive={false}
              cursor="default"
              barSize={35}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
