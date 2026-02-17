"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Notification {
  id: string;
  type:
    | "feature"
    | "maintenance"
    | "announcement"
    | "import"
    | "export"
    | "milestone";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface HeaderProps {
  startDate: string;
  endDate: string;
  userEmail?: string;
  onLogout?: () => void;
}

interface DateRangeCalendarProps {
  startDate: string;
  endDate: string;
  onSelect: (start: string, end: string) => void;
  onApply: () => void;
  onCancel: () => void;
}

function DateRangeCalendar({
  startDate,
  endDate,
  onSelect,
  onApply,
  onCancel,
}: DateRangeCalendarProps) {
  const [tempStart, setTempStart] = useState(startDate);
  const [tempEnd, setTempEnd] = useState(endDate);
  const [hoverDate, setHoverDate] = useState<string | null>(null);
  const [displayDate, setDisplayDate] = useState(
    new Date(startDate || new Date()),
  );

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(displayDate);
  const firstDay = getFirstDayOfMonth(displayDate);
  const monthName = displayDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() - 1),
    );
  };

  const nextMonth = () => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() + 1),
    );
  };

  const isInRange = (dateStr: string): boolean => {
    if (!tempStart || !tempEnd) return false;
    const date = new Date(dateStr).getTime();
    const start = new Date(tempStart).getTime();
    const end = new Date(tempEnd).getTime();
    return date >= start && date <= end;
  };

  const isStartDate = (dateStr: string) => dateStr === tempStart;
  const isEndDate = (dateStr: string) => dateStr === tempEnd;

  const handleDateClick = (day: number) => {
    const dateStr = new Date(
      displayDate.getFullYear(),
      displayDate.getMonth(),
      day,
    )
      .toISOString()
      .split("T")[0];

    if (!tempStart || (tempStart && tempEnd)) {
      setTempStart(dateStr);
      setTempEnd("");
    } else if (dateStr >= tempStart) {
      setTempEnd(dateStr);
    } else {
      setTempEnd(tempStart);
      setTempStart(dateStr);
    }
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weeks = [];
  let currentWeek = Array(firstDay).fill(null);

  days.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-4">
        {/* Month/Year Header with Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-1 hover:bg-white/10 rounded transition"
            title="Previous month"
          >
            <svg
              className="w-5 h-5 text-slate-400 hover:text-slate-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <p className="text-sm font-semibold text-white">{monthName}</p>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-white/10 rounded transition"
            title="Next month"
          >
            <svg
              className="w-5 h-5 text-slate-400 hover:text-slate-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-slate-400 py-1"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Dates */}
          <div className="space-y-1">
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="grid grid-cols-7 gap-1">
                {week.map((day, dayIdx) => {
                  if (!day) {
                    return <div key={dayIdx} />;
                  }

                  const dateStr = new Date(
                    displayDate.getFullYear(),
                    displayDate.getMonth(),
                    day,
                  )
                    .toISOString()
                    .split("T")[0];

                  const inRange = isInRange(dateStr);
                  const isStart = isStartDate(dateStr);
                  const isEnd = isEndDate(dateStr);
                  const isHover = hoverDate && isInRange(hoverDate);

                  return (
                    <button
                      key={dayIdx}
                      onClick={() => handleDateClick(day)}
                      onMouseEnter={() => {
                        if (tempStart && !tempEnd) {
                          const hDate = new Date(
                            displayDate.getFullYear(),
                            displayDate.getMonth(),
                            day,
                          )
                            .toISOString()
                            .split("T")[0];
                          setHoverDate(hDate);
                        }
                      }}
                      onMouseLeave={() => setHoverDate(null)}
                      className={`py-2 text-xs font-semibold rounded transition ${
                        isStart || isEnd
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : inRange || (hoverDate && isInRange(hoverDate))
                            ? "bg-blue-600/30 text-blue-200"
                            : "text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            onSelect(tempStart, tempEnd);
            onApply();
          }}
          className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold text-xs transition"
        >
          Apply
        </button>
        <button
          onClick={onCancel}
          className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-300 rounded-lg font-semibold text-xs transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function Header({
  startDate,
  endDate,
  userEmail,
  onLogout,
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const username = userEmail?.split("@")[0] || "User";

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "feature",
      title: "New Features Released",
      message: "Real-time revenue alerts are now available",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "milestone",
      title: "Revenue Milestone",
      message: "You hit $100K revenue!",
      timestamp: "4 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "import",
      title: "Data Import Completed",
      message: "1,250 data points imported successfully",
      timestamp: "Yesterday",
      read: false,
    },
    {
      id: "4",
      type: "export",
      title: "Export Completed",
      message: "Your analytics export is ready to download",
      timestamp: "2 days ago",
      read: true,
    },
    {
      id: "5",
      type: "announcement",
      title: "Announcement",
      message: "Q1 performance review period starts today",
      timestamp: "3 days ago",
      read: true,
    },
    {
      id: "6",
      type: "maintenance",
      title: "Maintenance Notification",
      message: "Scheduled maintenance complete - all systems operational",
      timestamp: "5 days ago",
      read: true,
    },
  ]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsDatePickerOpen(false);
      }
    }

    if (isDropdownOpen || isNotificationOpen || isDatePickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen, isNotificationOpen, isDatePickerOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getDateRangeLabel = () => {
    const today = new Date();
    const startDateObj = new Date(localStartDate);
    const endDateObj = new Date(localEndDate);

    const diffTime = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (
      diffDays === 7 &&
      startDateObj.toISOString().split("T")[0] ===
        new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
    ) {
      return "Last 7 days";
    }
    if (
      diffDays === 30 &&
      startDateObj.toISOString().split("T")[0] ===
        new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
    ) {
      return "Last 30 days";
    }
    if (
      diffDays === 90 &&
      startDateObj.toISOString().split("T")[0] ===
        new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
    ) {
      return "Last 90 days";
    }

    return `${localStartDate} – ${localEndDate}`;
  };

  const applyDateRange = (start: string, end: string) => {
    setLocalStartDate(start);
    setLocalEndDate(end);
    setIsDatePickerOpen(false);
  };

  const getNotificationIconColor = (type: string) => {
    switch (type) {
      case "feature":
        return "bg-blue-600/20 text-blue-400";
      case "maintenance":
        return "bg-orange-600/20 text-orange-400";
      case "announcement":
        return "bg-purple-600/20 text-purple-400";
      case "import":
        return "bg-green-600/20 text-green-400";
      case "export":
        return "bg-cyan-600/20 text-cyan-400";
      case "milestone":
        return "bg-yellow-600/20 text-yellow-400";
      default:
        return "bg-slate-600/20 text-slate-400";
    }
  };

  const getNotificationIconSVG = (type: string) => {
    switch (type) {
      case "feature":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case "maintenance":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
          </svg>
        );
      case "announcement":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5.882V19.24a1.961 1.961 0 01-2.404-1.759l-.5-5a1.009 1.009 0 00-.995-.909h-.773c-.5 0-.964.244-1.26.616l-.738.737a.75.75 0 00.292 1.24c.561.307 1.134.472 1.706.472a2.75 2.75 0 002.75-2.75V5.882m0 0a.75.75 0 001.5 0"
            />
          </svg>
        );
      case "import":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 16.5V9.75m0 0l-3 3m3-3l3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33A3 3 0 0116.5 19.5H6.75z"
            />
          </svg>
        );
      case "export":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        );
      case "milestone":
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };
  return (
    <header className="fixed inset-0 top-0 h-16 bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-3xl border-b border-white/10 z-50">
      <div className="w-screen h-16 px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Left - Dashboard title */}
        <div className="hidden md:flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Velocity
            </h1>
            <p className="text-xs text-slate-500">Analytics Dashboard</p>
          </div>
        </div>

        {/* Right - Date, notifications, profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Date Range Picker */}
          <div className="relative" ref={datePickerRef}>
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 rounded-lg border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 group"
            >
              <svg
                className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs text-slate-300 font-medium">
                {getDateRangeLabel()}
              </span>
              <svg
                className={`w-3 h-3 text-blue-400 transition transform ${
                  isDatePickerOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>

            {/* Date Picker Dropdown */}
            {isDatePickerOpen && (
              <div className="absolute left-0 mt-2 w-80 bg-slate-900 border border-white/20 rounded-lg shadow-xl z-50 overflow-hidden">
                {/* Preset Ranges */}
                <div className="px-4 py-3 border-b border-white/10 grid grid-cols-2 gap-2">
                  {[
                    {
                      label: "Last 7 days",
                      days: 7,
                    },
                    {
                      label: "Last 30 days",
                      days: 30,
                    },
                    {
                      label: "Last 90 days",
                      days: 90,
                    },
                    {
                      label: "Last 365 days",
                      days: 365,
                    },
                  ].map((range) => {
                    const today = new Date();
                    const startDate = new Date(
                      today.getTime() - range.days * 24 * 60 * 60 * 1000,
                    )
                      .toISOString()
                      .split("T")[0];
                    const endDate = today.toISOString().split("T")[0];

                    return (
                      <button
                        key={range.label}
                        onClick={() => applyDateRange(startDate, endDate)}
                        className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-400/50 rounded transition"
                      >
                        {range.label}
                      </button>
                    );
                  })}
                </div>

                {/* Date Range Calendar */}
                <div className="px-4 py-4">
                  <DateRangeCalendar
                    startDate={localStartDate}
                    endDate={localEndDate}
                    onSelect={(start, end) => {
                      setLocalStartDate(start);
                      setLocalEndDate(end);
                    }}
                    onApply={() => setIsDatePickerOpen(false)}
                    onCancel={() => setIsDatePickerOpen(false)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300 relative group"
            >
              <svg
                className="w-5 h-5 text-slate-400 group-hover:text-slate-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-96 max-h-[600px] overflow-y-auto bg-slate-900/95 backdrop-blur border border-white/20 rounded-lg shadow-xl z-50">
                {/* Header */}
                <div className="sticky top-0 bg-slate-900/95 px-4 py-3 border-b border-white/10 flex items-center justify-between backdrop-blur">
                  <h3 className="text-sm font-bold text-white">
                    Notifications
                  </h3>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-slate-400 hover:text-slate-200 transition"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-slate-400">No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/10">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 hover:bg-white/5 transition ${
                          !notif.read ? "bg-white/[0.03]" : ""
                        } group`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${getNotificationIconColor(notif.type)} mt-0.5`}
                          >
                            {getNotificationIconSVG(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white">
                              {notif.title}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                              {notif.message}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {notif.timestamp}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                            {!notif.read && (
                              <button
                                onClick={() => markAsRead(notif.id)}
                                className="p-1 hover:bg-white/20 rounded transition"
                                title="Mark as read"
                              >
                                <svg
                                  className="w-4 h-4 text-slate-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => dismissNotification(notif.id)}
                              className="p-1 hover:bg-white/20 rounded transition"
                              title="Dismiss"
                            >
                              <svg
                                className="w-4 h-4 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Footer */}
                {notifications.length > 0 && (
                  <div className="sticky bottom-0 bg-slate-900/95 px-4 py-3 border-t border-white/10 text-center backdrop-blur">
                    <button className="text-xs text-blue-400 hover:text-blue-300 transition font-medium">
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Settings Icon */}
          <Link
            href="/settings"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-300"
          >
            <svg
              className="w-5 h-5 text-slate-400 hover:text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Link>

          {/* User Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg transition-colors duration-300"
            >
              <span className="text-xs sm:text-sm text-slate-300 font-medium hidden sm:inline">
                {username}
              </span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur border border-white/20 rounded-lg shadow-xl z-50">
                <Link
                  href="/account"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-white/10 hover:text-white transition border-b border-white/10 flex items-center gap-2 block"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Account
                </Link>
                <button
                  onClick={onLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-600/20 hover:text-red-300 transition flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
