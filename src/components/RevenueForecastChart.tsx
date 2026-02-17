"use client";

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Generate forecast data
function generateForecastData() {
  const data: any[] = [];

  // Last 6 months of actual data (historical)
  const historicalMonths = [
    { month: "Sep", revenue: 125000, type: "actual" },
    { month: "Oct", revenue: 138000, type: "actual" },
    { month: "Nov", revenue: 152000, type: "actual" },
    { month: "Dec", revenue: 175000, type: "actual" },
    { month: "Jan", revenue: 185000, type: "actual" },
    { month: "Feb", revenue: 198000, type: "actual" },
  ];

  // Add historical data
  historicalMonths.forEach((item) => {
    data.push({
      month: item.month,
      revenue: item.revenue,
      type: "actual",
      forecast: item.revenue,
      forecastLower: item.revenue,
      forecastUpper: item.revenue,
    });
  });

  // Generate forecast for next 3 months
  const lastRevenue = historicalMonths[historicalMonths.length - 1].revenue;
  const growthRate =
    (lastRevenue - historicalMonths[0].revenue) /
    historicalMonths[0].revenue /
    6; // Average monthly growth
  const forecastMonths = ["Mar", "Apr", "May"];

  forecastMonths.forEach((month, index) => {
    const monthIndex = index + 1;
    const forecastedRevenue =
      lastRevenue * Math.pow(1 + growthRate, monthIndex);
    const margin = forecastedRevenue * (0.1 + index * 0.02); // Increasing uncertainty further out

    data.push({
      month,
      revenue: null,
      type: "forecast",
      forecast: Math.round(forecastedRevenue),
      forecastLower: Math.round(forecastedRevenue - margin),
      forecastUpper: Math.round(forecastedRevenue + margin),
    });
  });

  return data;
}

export function RevenueForecastChart() {
  const data = generateForecastData();
  const lastActualIndex = 5; // Index of last actual data point

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-5 lg:p-6 transition mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white">Revenue Forecast</h3>
        <span className="text-xs text-slate-400">
          3-Month Projection with Confidence Intervals
        </span>
      </div>

      <div style={{ width: "100%", height: "320px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient
                id="confidenceGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              stroke="rgba(255,255,255,0.1)"
            />

            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              stroke="rgba(255,255,255,0.1)"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
            />

            <Tooltip
              content={(props: any) => {
                if (!props.active || !props.payload) return null;
                const data = props.payload[0]?.payload;
                if (!data) return null;

                return (
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg p-3 text-xs">
                    <p className="text-slate-200 font-semibold mb-2">
                      {data.month}
                    </p>
                    {data.type === "actual" ? (
                      <>
                        <p className="text-blue-400 mb-1">
                          Actual: ${(data.revenue / 1000).toFixed(0)}K
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-green-400 font-medium mb-1">
                          Forecast: ${(data.forecast / 1000).toFixed(0)}K
                        </p>
                        <p className="text-slate-300 text-xs">
                          Range: ${(data.forecastLower / 1000).toFixed(0)}K - $
                          {(data.forecastUpper / 1000).toFixed(0)}K
                        </p>
                      </>
                    )}
                  </div>
                );
              }}
            />

            {/* Confidence interval area */}
            <Area
              type="monotone"
              dataKey="forecastUpper"
              stroke="none"
              fill="url(#confidenceGradient)"
              isAnimationActive={false}
              name="Confidence Bounds"
            />
            <Area
              type="monotone"
              dataKey="forecastLower"
              stroke="none"
              fill="url(#confidenceGradient)"
              isAnimationActive={false}
              name="Confidence Bounds"
            />

            {/* Actual revenue line */}
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              dot={false}
              strokeWidth={2.5}
              isAnimationActive={false}
              name="Actual Revenue"
            />

            {/* Forecast line */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="#10b981"
              dot={false}
              strokeWidth={2.5}
              strokeDasharray="5 5"
              isAnimationActive={false}
              name="Forecast"
            />

            {/* Reference line at last actual point */}
            <ReferenceLine
              x={data[lastActualIndex]?.month}
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="3 3"
              label={{
                value: "Today",
                position: "top",
                fill: "#94a3b8",
                fontSize: 11,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-blue-400"></div>
          <span className="text-slate-400">Actual Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-0.5 bg-green-400"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #10b981 50%, transparent 50%)",
              backgroundSize: "5px 2px",
            }}
          ></div>
          <span className="text-slate-400">Forecast</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-gradient-to-b from-purple-400 to-transparent opacity-50"></div>
          <span className="text-slate-400">Confidence Range</span>
        </div>
      </div>
    </div>
  );
}
