import { NextResponse } from "next/server";

// Mock revenue data for the year
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const metric = searchParams.get("metric") || "revenue";

  // Generate mock data for the entire year (2026)
  const generateRevenueTrend = () => {
    const data = [];
    const current = new Date("2026-01-01");
    const end = new Date("2026-12-31");

    let revenue = 8000; // Starting daily revenue (~$8K)
    let previousDay = revenue;

    while (current <= end) {
      // Simulate realistic revenue fluctuations
      const weekday = current.getDay();
      const dayOfMonth = current.getDate();
      const monthNum = current.getMonth();

      // More revenue on certain days
      let dailyVariation = 1;
      if (weekday === 1 || weekday === 2)
        dailyVariation = 1.1; // Mondays/Tuesdays slightly higher
      else if (weekday === 5 || weekday === 6) dailyVariation = 0.9; // Weekends lower

      // Seasonal patterns (more subtle)
      if (monthNum === 11) dailyVariation *= 1.5; // December holiday season
      if (monthNum === 0) dailyVariation *= 1.2; // January momentum
      if (monthNum === 6) dailyVariation *= 0.85; // Summer dip

      // Random daily fluctuation (smaller range)
      dailyVariation *= 0.95 + Math.random() * 0.1;

      revenue = Math.floor(previousDay * dailyVariation);

      data.push({
        date: current.toISOString().split("T")[0],
        revenue: Math.max(revenue, 4000), // Floor at $4K to avoid drops
        orders: Math.floor(revenue / 150),
        customers: Math.floor(revenue / 200),
      });

      previousDay = revenue;
      current.setDate(current.getDate() + 1);
    }

    return data;
  };

  const yearData = generateRevenueTrend();

  // Filter by date range if provided
  let filteredData = yearData;
  if (startDate && endDate) {
    filteredData = yearData.filter(
      (d) => d.date >= startDate && d.date <= endDate,
    );
  }

  // Calculate metrics
  const totalRevenue = filteredData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = filteredData.reduce((sum, d) => sum + d.orders, 0);
  const totalCustomers = filteredData.reduce((sum, d) => sum + d.customers, 0);
  const avgDailyRevenue = Math.floor(totalRevenue / filteredData.length);

  return NextResponse.json({
    data: filteredData,
    summary: {
      totalRevenue,
      totalOrders,
      totalCustomers,
      avgDailyRevenue,
      days: filteredData.length,
    },
  });
}
