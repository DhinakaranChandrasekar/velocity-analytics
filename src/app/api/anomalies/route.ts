import { NextResponse } from 'next/server';

// Mock anomaly data
export async function GET(request: Request) {
  const anomalies = [
    {
      date: '2026-02-14',
      metric: 'revenue',
      change: 45,
      reason: 'Valentine\'s Day spike',
    },
    {
      date: '2026-12-25',
      metric: 'revenue',
      change: 180,
      reason: 'Holiday sales peak',
    },
    {
      date: '2026-07-04',
      metric: 'revenue',
      change: -25,
      reason: 'Independence Day dip',
    },
    {
      date: '2026-11-28',
      metric: 'orders',
      change: 95,
      reason: 'Black Friday kickoff',
    },
  ];

  return NextResponse.json({
    anomalies,
  });
}
