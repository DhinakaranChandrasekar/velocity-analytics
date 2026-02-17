"use client";

import React from "react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any) => string;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

export function CustomTooltip({
  active,
  payload,
  label,
  formatter,
  bgColor = "rgba(15, 23, 42, 0.95)",
  borderColor = "rgba(255, 255, 255, 0.1)",
  textColor = "#e2e8f0",
}: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: "12px",
        backdropFilter: "blur(12px)",
        padding: "12px 16px",
      }}
      className="flex flex-col gap-1"
    >
      <p style={{ color: textColor, fontSize: "12px", fontWeight: "500" }}>
        {label}
      </p>
      {payload.map((entry, index) => (
        <p
          key={`item-${index}`}
          style={{ color: entry.color || "#94a3b8", fontSize: "12px" }}
        >
          <span style={{ fontWeight: "600" }}>{entry.name}: </span>
          {formatter ? formatter(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
}
