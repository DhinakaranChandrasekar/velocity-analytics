import { NextResponse } from "next/server";

// Mock cohort data
export async function GET(request: Request) {
  const cohorts = [
    {
      month: "Jan 2026",
      totalRevenue: 1200000,
      customers: 2500,
      avgCustomerValue: 480,
      retention30: 65,
      retention60: 45,
      retention90: 28,
    },
    {
      month: "Feb 2026",
      totalRevenue: 1350000,
      customers: 2800,
      avgCustomerValue: 482,
      retention30: 68,
      retention60: 48,
      retention90: 32,
    },
    {
      month: "Mar 2026",
      totalRevenue: 1500000,
      customers: 3100,
      avgCustomerValue: 484,
      retention30: 70,
      retention60: 50,
      retention90: 35,
    },
    {
      month: "Apr 2026",
      totalRevenue: 1450000,
      customers: 3000,
      avgCustomerValue: 483,
      retention30: 69,
      retention60: 49,
      retention90: 34,
    },
  ];

  return NextResponse.json({ cohorts });
}
