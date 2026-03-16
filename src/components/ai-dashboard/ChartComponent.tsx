"use client";

import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  id: string;
  type: string;
  title: string;
  xAxis: string;
  yAxis: string;
  data: any[];
}

interface ChartComponentProps {
  chart: ChartData;
  theme: string;
}

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
  "#f97316",
  "#eab308",
  "#84cc16",
];

export function ChartComponent({ chart, theme }: ChartComponentProps) {
  const textColor = theme === "light" ? "#334155" : "#cbd5e1";
  const gridColor = theme === "light" ? "#e2e8f0" : "#475569";
  const tooltipBg = theme === "light" ? "#ffffff" : "#1e293b";
  const tooltipBorder = theme === "light" ? "#e2e8f0" : "#475569";

  const chartProps = {
    margin: { top: 10, right: 30, left: 0, bottom: 10 },
  };

  if (chart.type === "line") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chart.data} {...chartProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={chart.xAxis} stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: textColor }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={chart.yAxis}
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: "#6366f1", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chart.data} {...chartProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={chart.xAxis} stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: textColor }}
          />
          <Legend />
          <Bar dataKey={chart.yAxis} fill="#6366f1" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "area") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chart.data} {...chartProps}>
          <defs>
            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={chart.xAxis} stroke={textColor} />
          <YAxis stroke={textColor} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: textColor }}
          />
          <Area
            type="monotone"
            dataKey={chart.yAxis}
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#colorArea)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chart.data}
            dataKey={chart.yAxis}
            nameKey={chart.xAxis}
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {chart.data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: textColor }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return null;
}
