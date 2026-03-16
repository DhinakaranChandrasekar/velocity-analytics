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
import {
  FiTrendingUp,
  FiBarChart2,
  FiTarget,
  FiCheckCircle,
  FiAlertCircle,
  FiAward,
  FiPieChart,
  FiTrendingDown,
  FiCheck,
} from "react-icons/fi";

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

// Helper function to get icon components
const getIcon = (iconName: string) => {
  const iconProps = { size: 28, className: "text-cyan-400" };
  const iconMap: { [key: string]: React.ReactNode } = {
    "trending-up": <FiTrendingUp {...iconProps} />,
    "bar-chart": <FiBarChart2 {...iconProps} />,
    "target": <FiTarget {...iconProps} />,
    "check-circle": <FiCheckCircle {...iconProps} />,
    "alert-circle": <FiAlertCircle {...iconProps} />,
    "award": <FiAward {...iconProps} />,
    "pie-chart": <FiPieChart {...iconProps} />,
    "trending-down": <FiTrendingDown {...iconProps} />,
    "check": <FiCheck {...iconProps} />,
  };
  return iconMap[iconName] || <FiBarChart2 {...iconProps} />;
};

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
        icon: "trending-up",
      },
      {
        label: "Acceleration Rate",
        value: "5.2%",
        description: "Compound daily growth rate",
        icon: "bar-chart",
      },
      {
        label: "Strongest Week",
        value: "Weeks 2-3",
        description: "Peak performance period",
        icon: "award",
      },
      {
        label: "Q2 Projection",
        value: "Strong",
        description: "Pipeline looking healthy",
        icon: "trending-up",
      },
      {
        label: "Action Required",
        value: "None",
        description: "On track, maintain pace",
        icon: "check-circle",
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
        icon: "bar-chart",
      },
      {
        label: "Brand Strength",
        value: "28%",
        description: "Direct visits showing trust",
        icon: "target",
      },
      {
        label: "Social Opportunity",
        value: "18%",
        description: "High bounce - optimize content",
        icon: "alert-circle",
      },
      {
        label: "Paid Efficiency",
        value: "9%",
        description: "Low volume - scale what works",
        icon: "trending-up",
      },
      {
        label: "Strategic Focus",
        value: "70%",
        description: "Organic + Direct are high-value",
        icon: "pie-chart",
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
        icon: "award",
      },
      {
        label: "Top 2 Products",
        value: "63%",
        description: "Concentrate on these tiers",
        icon: "bar-chart",
      },
      {
        label: "Upsell Success",
        value: "Strong",
        description: "Enterprise migration working",
        icon: "trending-up",
      },
      {
        label: "Conversion Rate",
        value: "High",
        description: "Price points well-aligned",
        icon: "check-circle",
      },
      {
        label: "Growth Strategy",
        value: "Add Tier",
        description: "Headroom above Premium exists",
        icon: "target",
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
        icon: "target",
      },
      {
        label: "Active Retention",
        value: "75%",
        description: "Low churn, high stickiness",
        icon: "check-circle",
      },
      {
        label: "Signup Conv.",
        value: "19%",
        description: "Solid baseline for SaaS",
        icon: "trending-up",
      },
      {
        label: "Growth Bottleneck",
        value: "Top",
        description: "Visitor → Signup needs work",
        icon: "alert-circle",
      },
      {
        label: "Recommendation",
        value: "Focus",
        description: "Top-funnel acquisition",
        icon: "bar-chart",
      },
    ],
  },
  {
    id: 5,
    title: "Customer Retention Cohort",
    subtitle: "Excellent retention curve with stable long-term users",
    chartType: "line",
    data: [
      { month: "Jan", cohort1: 100, cohort2: 100, cohort3: 100, cohort4: 100 },
      { month: "Feb", cohort1: 92, cohort2: 94, cohort3: 88, cohort4: 85 },
      { month: "Mar", cohort1: 88, cohort2: 87, cohort3: 81, cohort4: 76 },
      { month: "Apr", cohort1: 85, cohort2: 82, cohort3: 78, cohort4: 72 },
      { month: "May", cohort1: 83, cohort2: 80, cohort3: 75, cohort4: 68 },
      { month: "Jun", cohort1: 82, cohort2: 79, cohort3: 73, cohort4: 65 },
    ],
    insights: [
      {
        label: "Month 1 Retention",
        value: "92-94%",
        description: "Excellent early engagement",
        icon: "award",
      },
      {
        label: "Month 3 Stability",
        value: "82-88%",
        description: "Strong product stickiness",
        icon: "trending-up",
      },
      {
        label: "Churn Pattern",
        value: "Linear",
        description: "Predictable & manageable",
        icon: "bar-chart",
      },
      {
        label: "L-Curve Shape",
        value: "Healthy",
        description: "No dramatic drop-offs",
        icon: "check-circle",
      },
      {
        label: "Forecast",
        value: "Stable",
        description: "Reliable LTV predictions",
        icon: "trending-down",
      },
    ],
  },
];

interface AnalysisPresentationProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChartComponent = ({ slide }: { slide: AnalysisSlide }) => {
  // Detect line chart type and render accordingly
  if (slide.chartType === "line") {
    // Check if this is slide 1 (actual/goal) or slide 5 (cohorts)
    const isRevenueChart = slide.data[0]?.actual !== undefined;
    
    if (isRevenueChart) {
      // Slide 1: Revenue Growth with actual vs goal
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
    } else {
      // Slide 5: Cohort retention lines
      const numericKeys = Object.keys(slide.data[0] || {})
        .filter(k => k !== "month" && k !== "day" && typeof slide.data[0][k] === 'number');
      const colors = ['#06b6d4', '#10b981', '#f59e0b', '#ec4899'];

      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={slide.data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <defs>
              {numericKeys.map((_, i) => (
                <linearGradient key={`lineGradient${i}`} id={`lineGradient${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors[i]} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={colors[i]} stopOpacity={0.1} />
                </linearGradient>
              ))}
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="month" stroke="rgba(148, 163, 184, 0.4)" style={{ fontSize: "12px" }} />
            <YAxis stroke="rgba(148, 163, 184, 0.4)" style={{ fontSize: "12px" }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.98)",
                border: "2px solid rgba(6, 182, 212, 0.6)",
                borderRadius: "12px",
                boxShadow: "0 20px 60px rgba(6, 182, 212, 0.3)",
              }}
              labelStyle={{ color: "#06b6d4", fontWeight: "bold" }}
              cursor={{ stroke: "rgba(255,255,255, 0.15)" }}
            />
            {numericKeys.map((key, i) => (
              <Line
                key={key}
                type="natural"
                dataKey={key}
                stroke={colors[i]}
                strokeWidth={4}
                dot={false}
                filter="url(#lineGlow)"
                opacity={0.9}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }
  }

  if (slide.chartType === "pie") {
    // Detect the data key to use
    const dataKey = slide.data[0]?.revenue ? "revenue" : slide.data[0]?.count ? "count" : Object.keys(slide.data[0]).find(k => typeof slide.data[0][k] === 'number');
    const xAxisKey = slide.data[0]?.name ? "name" : slide.data[0]?.stage ? "stage" : Object.keys(slide.data[0]).find(k => typeof slide.data[0][k] === 'string');
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={slide.data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
            </linearGradient>
            <filter id="barGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="barShine">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="coloredBlur" />
              <feComponentTransfer in="coloredBlur" type="saturate" tableValues="1.5" />
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xAxisKey} stroke="rgba(148, 163, 184, 0.4)" style={{ fontSize: "11px" }} angle={-15} textAnchor="end" height={80} />
          <YAxis stroke="rgba(148, 163, 184, 0.4)" style={{ fontSize: "11px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.98)",
              border: "2px solid rgba(6, 182, 212, 0.6)",
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(6, 182, 212, 0.3)",
            }}
            cursor={{ fill: "rgba(6, 182, 212, 0.1)" }}
          />
          <Bar
            dataKey={dataKey}
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            filter="url(#barGlow)"
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }



  if (slide.chartType === "bar") {
    // Detect the data key to use
    const dataKey = slide.data[0]?.revenue ? "revenue" : slide.data[0]?.count ? "count" : Object.keys(slide.data[0]).find(k => typeof slide.data[0][k] === 'number');
    const xAxisKey = slide.data[0]?.name ? "name" : slide.data[0]?.stage ? "stage" : Object.keys(slide.data[0]).find(k => typeof slide.data[0][k] === 'string');
    
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={slide.data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.8} />
            </linearGradient>
            <filter id="barGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="barShine">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="coloredBlur" />
              <feComponentTransfer in="coloredBlur" type="saturate" tableValues="1.5" />
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xAxisKey} stroke="rgba(148, 163, 184, 0.4)" style={{ fontSize: "11px" }} angle={-15} textAnchor="end" height={80} />
          <YAxis stroke="rgba(148, 163, 184, 0.4)" style={{ fontSize: "11px" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.98)",
              border: "2px solid rgba(6, 182, 212, 0.6)",
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(6, 182, 212, 0.3)",
            }}
            cursor={{ fill: "rgba(6, 182, 212, 0.1)" }}
          />
          <Bar
            dataKey={dataKey}
            fill="url(#barGradient)"
            radius={[8, 8, 0, 0]}
            filter="url(#barGlow)"
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (slide.chartType === "pie") {
    const pieColors = slide.colors || [
      "#06b6d4",
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
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
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
                fill={pieColors[index % pieColors.length]}
                filter="url(#pieGlow)"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "2px solid rgba(6, 182, 212, 0.5)",
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

  // Different layouts for each slide
  const renderSlideLayout = () => {
    switch (currentSlide) {
      // Slide 1: Chart Full Width, Insights Below
      case 0:
        return (
          <div className="w-full h-full flex flex-col gap-8">
            {/* Header with futuristic style */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-400 to-blue-500" />
                <span className="text-xs font-bold text-cyan-400 tracking-widest">METRIC 01</span>
              </div>
              <h1 className="text-7xl font-black tracking-tight bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-lg text-slate-300 font-light">{slide.subtitle}</p>
              <div className="flex gap-2 pt-2">
                <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                <div className="h-1 w-8 bg-cyan-400/30 rounded-full" />
              </div>
            </div>

            {/* Full width chart */}
            <div className="flex-1 bg-gradient-to-br from-cyan-950/40 via-slate-900/40 to-blue-950/40 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
              <ChartComponent slide={slide} />
            </div>

            {/* Insights Grid - 5 columns */}
            <div className="grid grid-cols-5 gap-3">
              {slide.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-cyan-950/40 to-blue-950/30 backdrop-blur border border-cyan-500/20 rounded-xl p-4 hover:from-cyan-900/60 hover:to-blue-900/50 hover:border-cyan-400/40 transition-all duration-300 group"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{getIcon(insight.icon)}</div>
                  <p className="text-xs text-cyan-300/80 font-bold uppercase tracking-wide mb-1">{insight.label}</p>
                  <p className="text-lg font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">{insight.value}</p>
                  <p className="text-xs text-slate-500 mt-2">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      // Slide 2: Pie chart top, insights grid below
      case 1:
        return (
          <div className="w-full h-full flex flex-col gap-8">
            <div className="space-y-2">
              <h1 className="text-7xl font-black text-white">{slide.title}</h1>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
              <div className="w-32 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex-1 bg-gradient-to-br from-cyan-950/30 to-slate-900/30 backdrop-blur rounded-3xl p-8 border border-cyan-500/20 flex items-center justify-center">
                <ChartComponent slide={slide} />
              </div>
              
              <div className="grid grid-cols-5 gap-3">
                {slide.insights.map((insight, idx) => (
                  <div key={idx} className="bg-cyan-950/40 backdrop-blur border border-cyan-500/30 rounded-lg p-3 hover:bg-cyan-900/50 hover:border-cyan-400/50 transition-all flex flex-col items-center text-center">
                    <div className="text-2xl mb-2 text-cyan-400">{getIcon(insight.icon)}</div>
                    <p className="text-xs text-cyan-300/80 font-bold uppercase leading-tight">{insight.label}</p>
                    <p className="text-sm font-black text-cyan-200 mt-2">{insight.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // Slide 3: Bar chart top, insights grid below
      case 2:
        return (
          <div className="w-full h-full flex flex-col gap-8">
            <div className="space-y-2">
              <h1 className="text-7xl font-black text-white">{slide.title}</h1>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
              <div className="w-32 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
            </div>
            
            <div className="flex-1 flex flex-col gap-6">
              <div className="flex-1 bg-gradient-to-br from-emerald-950/30 to-slate-900/30 backdrop-blur rounded-3xl p-8 border border-emerald-500/20 flex items-center">
                <ChartComponent slide={slide} />
              </div>
              
              <div className="grid grid-cols-5 gap-3">
                {slide.insights.map((insight, idx) => (
                  <div key={idx} className="bg-emerald-950/40 backdrop-blur border border-emerald-500/30 rounded-lg p-3 hover:bg-emerald-900/50 hover:border-emerald-400/50 transition-all flex flex-col items-center text-center">
                    <div className="text-2xl mb-2 text-emerald-400">{getIcon(insight.icon)}</div>
                    <p className="text-xs text-emerald-300/80 font-bold uppercase leading-tight">{insight.label}</p>
                    <p className="text-sm font-black text-emerald-200 mt-2">{insight.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // Slide 4: Chart top, insights bottom
      case 3:
        return (
          <div className="w-full h-full flex flex-col gap-8">
            <div className="space-y-2">
              <h1 className="text-7xl font-black text-white">{slide.title}</h1>
              <p className="text-xl text-slate-300">{slide.subtitle}</p>
              <div className="w-32 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
            </div>
            
            <div className="flex-1 flex flex-col gap-8">
              <div className="h-2/3 bg-gradient-to-br from-amber-950/50 to-orange-950/30 backdrop-blur rounded-3xl p-8 border border-amber-500/20 flex items-center">
                <ChartComponent slide={slide} />
              </div>
              
              <div className="h-1/3 grid grid-cols-5 gap-3 overflow-y-auto">
                {slide.insights.map((insight, idx) => (
                  <div key={idx} className="bg-amber-950/40 backdrop-blur border border-amber-500/30 rounded-lg p-3 hover:bg-amber-900/50 hover:border-amber-400/50 transition-all flex flex-col justify-center items-center text-center">
                    <div className="text-2xl mb-1 text-amber-400">{getIcon(insight.icon)}</div>
                    <p className="text-xs text-amber-300/80 font-bold uppercase">{insight.label}</p>
                    <p className="text-sm font-black text-amber-200 mt-1">{insight.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // Slide 5: Top chart, bottom insights - Futuristic
      case 4:
        return (
          <div className="w-full h-full flex flex-col gap-8">
            {/* Header with futuristic style */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-12 bg-gradient-to-r from-purple-400 to-pink-500" />
                <span className="text-xs font-bold text-purple-400 tracking-widest">METRIC 05</span>
              </div>
              <h1 className="text-7xl font-black tracking-tight bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
                {slide.title}
              </h1>
              <p className="text-lg text-slate-300 font-light">{slide.subtitle}</p>
              <div className="flex gap-2 pt-2">
                <div className="h-1 w-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                <div className="h-1 w-8 bg-purple-400/30 rounded-full" />
              </div>
            </div>

            {/* Top chart */}
            <div className="h-1/2 bg-gradient-to-br from-purple-950/40 via-slate-900/40 to-pink-950/40 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <ChartComponent slide={slide} />
            </div>

            {/* Bottom insights - horizontal layout */}
            <div className="h-1/2 grid grid-cols-5 gap-3 overflow-y-auto">
              {slide.insights.map((insight, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-purple-950/40 to-pink-950/30 backdrop-blur border border-purple-500/20 rounded-xl p-4 hover:from-purple-900/60 hover:to-pink-900/50 hover:border-purple-400/40 transition-all duration-300 flex flex-col justify-center group"
                >
                  <div className="text-3xl mb-3 text-center group-hover:scale-110 transition-transform">{getIcon(insight.icon)}</div>
                  <p className="text-xs text-purple-300/80 font-bold uppercase text-center tracking-wide">{insight.label}</p>
                  <p className="text-lg font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent text-center mt-2">{insight.value}</p>
                  <p className="text-xs text-slate-500 mt-2 text-center">{insight.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950 z-[9999] flex flex-col overflow-hidden"
    >
      {/* Futuristic animated background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main orbs */}
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl" />
        
        {/* Grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Animated accent lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      {/* Top Control Bar - Minimal & Modern */}
      <div className="relative bg-gradient-to-r from-slate-950/60 via-slate-900/40 to-slate-950/60 backdrop-blur-2xl border-b border-cyan-500/20 px-12 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse" />
            <h2 className="text-sm font-bold text-white/80 tracking-widest uppercase">Live Analytics</h2>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400 font-semibold">
            {currentSlide + 1} / {analysisSlides.length}
          </span>
        </div>
        <button
          onClick={handleClose}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white backdrop-blur-md border border-cyan-500/30 hover:border-cyan-400/60 bg-cyan-500/5 hover:bg-cyan-500/10 transition-all duration-300"
        >
          ✕ Exit
        </button>
      </div>

      {/* Main Content - Full height */}
      <div
        className={`relative flex-1 px-12 py-8 overflow-hidden transition-opacity duration-300 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        {renderSlideLayout()}
      </div>

      {/* Bottom Navigation - Futuristic */}
      <div className="relative bg-gradient-to-r from-slate-950/60 via-slate-900/40 to-slate-950/60 backdrop-blur-2xl border-t border-cyan-500/20 px-12 py-4 flex items-center justify-between z-10">
        <div className="flex gap-2">
          {analysisSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide 
                  ? "w-8 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50" 
                  : "w-2 h-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-slate-500 font-medium">
          ← → Space to navigate
        </div>
      </div>
    </div>
  );
};
