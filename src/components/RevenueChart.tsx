"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
}

interface RevenueChartProps {
  startDate: string;
  endDate: string;
}

export function RevenueChart({ startDate, endDate }: RevenueChartProps) {
  const [data, setData] = useState<RevenueData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
          startDate,
          endDate,
        });
        const response = await fetch(`/api/metrics?${params}`);
        const result = await response.json();

        // Aggregate data weekly for cleaner visualization
        const aggregated = aggregateWeekly(result.data);
        setData(aggregated);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const aggregateWeekly = (data: RevenueData[]) => {
    if (data.length === 0) return [];

    const weekly: RevenueData[] = [];
    let weekSum = { revenue: 0, orders: 0, customers: 0, count: 0, date: "" };

    data.forEach((item, index) => {
      weekSum.revenue += item.revenue;
      weekSum.orders += item.orders;
      weekSum.customers += item.customers;
      weekSum.count += 1;
      if (!weekSum.date) weekSum.date = item.date;

      // Every 7 days or at the end
      if ((index + 1) % 7 === 0 || index === data.length - 1) {
        weekly.push({
          date: weekSum.date,
          revenue: Math.floor(weekSum.revenue / weekSum.count),
          orders: Math.floor(weekSum.orders / weekSum.count),
          customers: Math.floor(weekSum.customers / weekSum.count),
        });
        weekSum = { revenue: 0, orders: 0, customers: 0, count: 0, date: "" };
      }
    });

    return weekly;
  };

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 flex items-center justify-center h-80\">
        <div className="text-slate-400 text-sm\">Loading chart...</div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4\">
      <h2 className="text-sm font-bold text-white mb-4\">Revenue Trend</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(12px)",
            }}
            labelStyle={{ color: "#e2e8f0" }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            name="Daily Revenue ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
