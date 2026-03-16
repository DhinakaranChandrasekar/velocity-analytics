"use client";

interface KPICard {
  label: string;
  value: number | string;
  change?: number;
}

interface KPICardsProps {
  kpis: KPICard[];
  theme: string;
}

export function KPICards({ kpis, theme }: KPICardsProps) {
  const formatValue = (value: number | string): string => {
    if (typeof value === "string") return value;
    if (value > 1000000) return (value / 1000000).toFixed(1) + "M";
    if (value > 1000) return (value / 1000).toFixed(1) + "K";
    return value.toFixed(0);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {kpis.map((kpi, idx) => (
        <div
          key={idx}
          className={`rounded-xl border p-6 transition-all duration-300 ${
            theme === "light"
              ? "bg-white border-slate-200 shadow-md hover:shadow-lg hover:border-slate-300"
              : "bg-slate-800/50 border-slate-700 shadow-md hover:shadow-lg hover:bg-slate-800/70 backdrop-blur-sm"
          }`}
        >
          <p
            className={`text-sm font-medium mb-2 ${
              theme === "light" ? "text-slate-600" : "text-slate-400"
            }`}
          >
            {kpi.label}
          </p>

          <div className="flex items-end justify-between">
            <p
              className={`text-3xl font-bold ${
                theme === "light"
                  ? "text-slate-900"
                  : "text-white"
              }`}
            >
              {formatValue(kpi.value)}
            </p>

            {kpi.change !== undefined && (
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  kpi.change >= 0
                    ? theme === "light"
                      ? "text-green-600"
                      : "text-green-400"
                    : theme === "light"
                      ? "text-red-600"
                      : "text-red-400"
                }`}
              >
                <svg
                  className={`w-4 h-4 ${
                    kpi.change < 0 ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                {Math.abs(kpi.change)}%
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
