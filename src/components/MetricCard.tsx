'use client';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export function MetricCard({
  title,
  value,
  change,
  icon,
  trend = 'neutral',
}: MetricCardProps) {
  const trendColor =
    trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : '';
  const trendBg =
    trend === 'up'
      ? 'bg-green-500/10'
      : trend === 'down'
        ? 'bg-red-500/10'
        : 'bg-slate-700/50';

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 hover:border-slate-600 transition">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        {icon && <div className="text-slate-500 h-5 w-5">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-3">
        <div className="text-3xl font-bold text-white">{value}</div>
        {change !== undefined && (
          <div className={`text-sm font-semibold flex items-center gap-1 px-2 py-1 rounded ${trendBg} ${trendColor}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
}
