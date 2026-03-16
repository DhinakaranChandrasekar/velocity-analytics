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
  const textColor = "#cbd5e1";
  const gridColor = "rgba(148, 163, 184, 0.1)";
  const tooltipBg = "rgba(15, 23, 42, 0.95)";
  const tooltipBorder = "rgba(148, 163, 184, 0.2)";

  const chartProps = {
    margin: { top: 5, right: 20, left: 0, bottom: 5 },
  };

  if (chart.type === "line") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chart.data} {...chartProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={chart.xAxis} stroke={textColor} style={{ fontSize: "12px" }} />
          <YAxis stroke={textColor} style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: textColor }}
          />
          <Line
            type="monotone"
            dataKey={chart.yAxis}
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chart.data} {...chartProps}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={chart.xAxis} stroke={textColor} style={{ fontSize: "11px" }} angle={-30} textAnchor="end" height={60} />
          <YAxis stroke={textColor} style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: textColor }}
            formatter={(value: any) => value.toLocaleString()}
          />
          <Bar dataKey={chart.yAxis} fill="#06b6d4" radius={[8, 8, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "area") {
    return (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chart.data} {...chartProps}>
          <defs>
            <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey={chart.xAxis} stroke={textColor} style={{ fontSize: "12px" }} />
          <YAxis stroke={textColor} style={{ fontSize: "12px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: textColor }}
            formatter={(value: any) => value.toLocaleString()}
          />
          <Area
            type="monotone"
            dataKey={chart.yAxis}
            stroke="#10b981"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorArea)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={280}>
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
