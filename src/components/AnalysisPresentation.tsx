"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AnalysisSlide {
  id: number;
  title: string;
  subtitle: string;
  chartType: "line" | "bar" | "pie";
  data: any[];
  insights: Array<{
    label: string;
    value: string;
    description: string;
    icon: string;
  }>;
  colors?: string[];
}

const analysisSlides: AnalysisSlide[] = [
  {
    id: 1,
    title: "Revenue Growth Trajectory",
    subtitle: "We're exceeding monthly targets with strong momentum",
    chartType: "line",
    data: [
      { day: "1", actual: 12500, goal: 15000 },
      { day: "5", actual: 72200, goal: 75000 },
      { day: "10", actual: 158400, goal: 150000 },
      { day: "15", actual: 246300, goal: 225000 },
      { day: "20", actual: 333400, goal: 300000 },
      { day: "25", actual: 425700, goal: 375000 },
      { day: "30", actual: 522300, goal: 450000 },
    ],
    insights: [
      {
        label: "Target Exceeded",
        value: "+$72,300",
        description: "16% above monthly goal",
        icon: "📈",
      },
      {
        label: "Acceleration Rate",
        value: "5.2%",
        description: "Compound daily growth rate",
        icon: "⚡",
      },
      {
        label: "Strongest Week",
        value: "Weeks 2-3",
        description: "Peak performance period",
        icon: "🎯",
      },
      {
        label: "Q2 Projection",
        value: "Strong",
        description: "Pipeline looking healthy",
        icon: "🚀",
      },
      {
        label: "Action Required",
        value: "None",
        description: "On track, maintain pace",
        icon: "✓",
      },
    ],
  },
  {
    id: 2,
    title: "Traffic Source Attribution",
    subtitle: "Balanced portfolio with strong organic foundation",
    chartType: "pie",
    data: [
      { name: "Organic Search", value: 42 },
      { name: "Direct", value: 28 },
      { name: "Social Media", value: 18 },
      { name: "Paid Ads", value: 9 },
      { name: "Referral", value: 3 },
    ],
    colors: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"],
    insights: [
      {
        label: "Top Driver",
        value: "Organic",
        description: "42% of all traffic",
        icon: "🔍",
      },
      {
        label: "Brand Strength",
        value: "28%",
        description: "Direct visits showing trust",
        icon: "💎",
      },
      {
        label: "Social Opportunity",
        value: "18%",
        description: "High bounce - optimize content",
        icon: "📱",
      },
      {
        label: "Paid Efficiency",
        value: "9%",
        description: "Low volume - scale what works",
        icon: "💰",
      },
      {
        label: "Strategic Focus",
        value: "70%",
        description: "Organic + Direct are high-value",
        icon: "🎯",
      },
    ],
  },
  {
    id: 3,
    title: "Product Performance Leaders",
    subtitle: "Premium tier dominates with excellent upsell velocity",
    chartType: "bar",
    data: [
      { name: "Premium Plan", revenue: 185000 },
      { name: "Enterprise Pack", revenue: 142000 },
      { name: "Pro Tier", revenue: 95000 },
      { name: "Starter Kit", revenue: 68000 },
      { name: "Add-on Services", revenue: 32300 },
    ],
    insights: [
      {
        label: "Revenue Leader",
        value: "$185K",
        description: "Premium Plan generates 35%",
        icon: "👑",
      },
      {
        label: "Top 2 Products",
        value: "63%",
        description: "Concentrate on these tiers",
        icon: "📊",
      },
      {
        label: "Upsell Success",
        value: "Strong",
        description: "Enterprise migration working",
        icon: "📈",
      },
      {
        label: "Conversion Rate",
        value: "High",
        description: "Price points well-aligned",
        icon: "💹",
      },
      {
        label: "Growth Strategy",
        value: "Add Tier",
        description: "Headroom above Premium exists",
        icon: "🚀",
      },
    ],
  },
  {
    id: 4,
    title: "User Conversion Funnel",
    subtitle: "Healthy funnel with 50% trial-to-paid conversion",
    chartType: "bar",
    data: [
      { stage: "Visitors", count: 15000, conversion: 100 },
      { stage: "Signups", count: 2850, conversion: 19 },
      { stage: "Trial Users", count: 1368, conversion: 48 },
      { stage: "Paid Users", count: 684, conversion: 50 },
      { stage: "Active Users", count: 512, conversion: 75 },
    ],
    insights: [
      {
        label: "Trial → Paid",
        value: "50%",
        description: "Strong product-market fit",
        icon: "🎯",
      },
      {
        label: "Active Retention",
        value: "75%",
        description: "Low churn, high stickiness",
        icon: "📍",
      },
      {
        label: "Signup Conv.",
        value: "19%",
        description: "Solid baseline for SaaS",
        icon: "✨",
      },
      {
        label: "Growth Bottleneck",
        value: "Top",
        description: "Visitor → Signup needs work",
        icon: "⚠️",
      },
      {
        label: "Recommendation",
        value: "Focus",
        description: "Top-funnel acquisition",
        icon: "💡",
      },
    ],
  },
  {
    id: 5,
    title: "Customer Retention Cohort",
    subtitle: "Excellent retention curve with stable long-term users",
    chartType: "line",
    data: [
      { month: "Jan", cohort1: 100, cohort2: 94, cohort3: 88, cohort4: 82 },
      { month: "Feb", cohort1: 92, cohort2: 87, cohort3: 81 },
      { month: "Mar", cohort1: 88, cohort2: 82 },
      { month: "Apr", cohort1: 85 },
    ],
    insights: [
      {
        label: "Month 1 Retention",
        value: "92-94%",
        description: "Excellent early engagement",
        icon: "🏆",
      },
      {
        label: "Month 3 Stability",
        value: "82-88%",
        description: "Strong product stickiness",
        icon: "📌",
      },
      {
        label: "Churn Pattern",
        value: "Linear",
        description: "Predictable & manageable",
        icon: "📊",
      },
      {
        label: "L-Curve Shape",
        value: "Healthy",
        description: "No dramatic drop-offs",
        icon: "✅",
      },
      {
        label: "Forecast",
        value: "Stable",
        description: "Reliable LTV predictions",
        icon: "🔮",
      },
    ],
  },
];

interface AnalysisPresentationProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChartComponent = ({ slide }: { slide: AnalysisSlide }) => {
  if (slide.chartType === "line") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={slide.data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="lineGradient1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#22c55e" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64c8ff" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#64c8ff" stopOpacity={0.1} />
            </linearGradient>
            <filter id="glow1">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            stroke="rgba(148, 163, 184, 0.3)"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="rgba(148, 163, 184, 0.3)"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "2px solid rgba(34, 197, 94, 0.5)",
              borderRadius: "12px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
            labelStyle={{ color: "#22c55e", fontWeight: "bold" }}
            cursor={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <Line
            type="natural"
            dataKey="actual"
            stroke="rgb(34, 197, 94)"
            strokeWidth={5}
            dot={false}
            filter="url(#glow1)"
          />
          <Line
            type="monotone"
            dataKey="goal"
            stroke="rgb(100, 200, 255)"
            strokeWidth={3}
            strokeDasharray="8 4"
            dot={false}
            strokeOpacity={0.7}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (slide.chartType === "bar") {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={slide.data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.7} />
            </linearGradient>
            <filter id="barGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="rgba(148, 163, 184, 0.3)"
            style={{ fontSize: "12px" }}
          />
          <YAxis
            stroke="rgba(148, 163, 184, 0.3)"
            style={{ fontSize: "12px" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "2px solid rgba(59, 130, 246, 0.5)",
              borderRadius: "12px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
          />
          <Bar
            dataKey="revenue"
            fill="url(#barGradient)"
            radius={[12, 12, 0, 0]}
            filter="url(#barGlow)"
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (slide.chartType === "pie") {
    const colors = slide.colors || [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
    ];
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <defs>
            <filter id="pieGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <Pie
            data={slide.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={false}
          >
            {slide.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                filter="url(#pieGlow)"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "2px solid rgba(59, 130, 246, 0.5)",
              borderRadius: "12px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  return null;
};

export const AnalysisPresentation: React.FC<AnalysisPresentationProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Request fullscreen on open
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const elem = containerRef.current as any;
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err: any) => {
          console.log("Fullscreen request failed:", err);
        });
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
    }
  }, [isOpen]);

  // Exit fullscreen on close
  const handleClose = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    onClose();
  };

  // Auto-play logic - simplified and more reliable
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= analysisSlides.length - 1) {
          // Auto-close at the end
          setTimeout(() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            }
            onClose();
          }, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  // Fade effect when slide changes
  useEffect(() => {
    setFadeOut(true);
    const timer = setTimeout(() => setFadeOut(false), 300);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (currentSlide < analysisSlides.length - 1) {
          setFadeOut(true);
          setTimeout(() => {
            setCurrentSlide((prev) => prev + 1);
            setFadeOut(false);
          }, 300);
        }
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentSlide > 0) {
          setFadeOut(true);
          setTimeout(() => {
            setCurrentSlide((prev) => prev - 1);
            setFadeOut(false);
          }, 300);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isOpen]);

  if (!isOpen) return null;

  const slide = analysisSlides[currentSlide];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-[9999] flex flex-col overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div
          className="absolute bottom-0 -right-40 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Top Control Bar - Premium Minimal */}
      <div className="relative bg-gradient-to-r from-slate-950/80 via-slate-900/80 to-slate-950/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold text-white/70 tracking-widest uppercase">
            Analysis Presentation
          </h2>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-500">
            {currentSlide + 1} / {analysisSlides.length}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleClose}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
          >
            ESC
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 flex items-center justify-center px-12 py-8 overflow-hidden z-5">
        <div
          className={`w-full h-full flex gap-12 transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Left: Chart (40%) */}
          <div className="w-2/5 flex flex-col items-center justify-center">
            <div className="relative bg-gradient-to-br from-blue-950/40 via-slate-900/40 to-cyan-950/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-8 w-full h-full flex items-center justify-center shadow-2xl overflow-hidden group hover:border-white/20 transition-all duration-500">
              {/* Gradient shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <ChartComponent slide={slide} />
            </div>
          </div>

          {/* Right: Content (60%) */}
          <div className="w-3/5 flex flex-col justify-center space-y-6 overflow-y-auto pr-4">
            {/* Header */}
            <div className="space-y-3">
              <h1 className="text-6xl font-black tracking-tight bg-gradient-to-r from-white via-blue-200 to-cyan-100 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
                {slide.subtitle}
              </p>
              <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-full mt-4 shadow-lg shadow-blue-500/50" />
            </div>

            {/* Insights Grid */}
            <div className="space-y-3 flex-1">
              {slide.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/15 rounded-lg p-4 hover:from-white/[0.12] hover:to-white/[0.05] hover:border-cyan-400/50 transition-all duration-300 cursor-default"
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 group-hover:from-cyan-500/10 to-transparent rounded-lg transition-all duration-300 pointer-events-none" />

                  <div className="relative flex items-start gap-3">
                    {/* Icon */}
                    <div className="text-2xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      {insight.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">
                        {insight.label}
                      </p>
                      <p className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        {insight.value}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
