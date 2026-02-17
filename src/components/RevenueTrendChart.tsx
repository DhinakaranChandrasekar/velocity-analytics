"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";

// Generate day-wise data for the entire year with proper growth trajectory
function generateYearData(year: number, previousYearEndRevenue: number = 0) {
  const data = [];
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeapYear ? 366 : 365;
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dayOfMonth = 1;
  let currentMonth = 0;

  for (let day = 1; day <= daysInYear; day++) {
    const month = new Date(year, 0, day).getMonth();

    // Reset day counter when month changes
    if (month !== currentMonth) {
      currentMonth = month;
      dayOfMonth = 1;
    }

    const baseRevenue =
      previousYearEndRevenue > 0
        ? previousYearEndRevenue + (month * 1000 + day * 100) // Build on previous year
        : 8000 + (month * 500 + day * 50); // making it to add monthly revenue to simulate growth over the year

    const noise = (Math.random() - 0.5) * 3000; // More volatility for realistic business
    const revenue = Math.max(5000, baseRevenue + noise);

    data.push({
      day: day,
      date: new Date(year, month, dayOfMonth)
        .toLocaleDateString("en-US", { month: "short", day: "numeric" })
        .replace(" ", " "),
      month: monthNames[month],
      monthNum: month + 1,
      revenue: Math.round(revenue),
    });

    dayOfMonth++;
  }

  return data;
}

// Merge both years data with realistic growth
function getMergedData() {
  const data2025 = generateYearData(2025);
  // Get the last revenue value from 2025 to start 2026 from there
  const lastRevenue2025 = data2025[data2025.length - 1].revenue;
  const data2026 = generateYearData(2026, lastRevenue2025);

  // Merge by aligning the same day of year
  return data2025.map((item, index) => ({
    day: item.day,
    date: item.date,
    month: item.month,
    monthNum: item.monthNum,
    revenue2025: item.revenue, // Previous year (2025)
    revenue2026: data2026[index]?.revenue || 0, // Current year (2026) - builds on 2025
  }));
}

// Aggregate daily data into weekly averages
function aggregateToWeekly(dailyData: any[]) {
  const weeklyData: any[] = [];
  let week: any[] = [];

  dailyData.forEach((day, index) => {
    week.push(day);

    // Group by 7 days
    if (week.length === 7 || index === dailyData.length - 1) {
      const avgRevenue2025 =
        week.reduce((sum, d) => sum + d.revenue2025, 0) / week.length;
      const avgRevenue2026 =
        week.reduce((sum, d) => sum + d.revenue2026, 0) / week.length;

      weeklyData.push({
        day: week[0].day,
        date: week[0].date,
        month: week[0].month,
        monthNum: week[0].monthNum,
        revenue2025: Math.round(avgRevenue2025),
        revenue2026: Math.round(avgRevenue2026),
        // Keep all days for detailed hover
        details: week,
      });

      week = [];
    }
  });

  return weeklyData;
}

export function RevenueTrendChart() {
  const dailyData = getMergedData();

  // Get unique month labels with their day indices
  const monthLabels = new Map();
  dailyData.forEach((item, index) => {
    if (!monthLabels.has(item.monthNum)) {
      monthLabels.set(item.monthNum, index);
    }
  });

  // X-axis ticks for months
  const xAxisTicks = Array.from(monthLabels.values());

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-5 lg:p-6 transition mb-6">
      <h3 className="text-sm font-bold text-white mb-6">Revenue Trend</h3>
      <div style={{ width: "100%", height: "320px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dailyData}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorRevenue2026" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRevenue2025" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              ticks={xAxisTicks}
              tickFormatter={(value) => {
                const item = dailyData[value];
                return item?.month || "";
              }}
              stroke="rgba(255,255,255,0.1)"
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              stroke="rgba(255,255,255,0.1)"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              content={(props: any) => {
                if (!props.active || !props.payload?.[0]) return null;
                const data = props.payload[0].payload;

                return (
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-3 text-xs">
                    <p className="text-slate-200 font-semibold mb-2">
                      {data.date}
                    </p>
                    <p className="text-blue-400 mb-1">
                      2026: ${(data.revenue2026 / 1000).toFixed(1)}K
                    </p>
                    <p className="text-orange-400">
                      2025: ${(data.revenue2025 / 1000).toFixed(1)}K
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue2026"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorRevenue2026)"
              isAnimationActive={false}
              name="2026"
            />
            <Area
              type="monotone"
              dataKey="revenue2025"
              stroke="#f97316"
              fillOpacity={1}
              fill="url(#colorRevenue2025)"
              isAnimationActive={false}
              name="2025"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-400"></div>
          <span className="text-slate-400">2026 (Current)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-orange-400"></div>
          <span className="text-slate-400">2025 (Previous)</span>
        </div>
      </div>
    </div>
  );
}
