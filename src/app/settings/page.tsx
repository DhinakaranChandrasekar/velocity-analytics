"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function SettingsPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [alertFrequency, setAlertFrequency] = useState("weekly");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [exportLoading, setExportLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (!authToken) {
      router.push("/login");
      return;
    }

    setUserEmail(email || "");
    // Load saved settings
    const savedCurrency = localStorage.getItem("userCurrency") || "USD";
    const savedFrequency = localStorage.getItem("alertFrequency") || "weekly";
    setCurrency(savedCurrency);
    setAlertFrequency(savedFrequency);
  }, []);

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    localStorage.setItem("userCurrency", value);
  };

  const handleAlertFrequencyChange = (value: string) => {
    setAlertFrequency(value);
    localStorage.setItem("alertFrequency", value);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }

    // Simulate password change
    setPasswordSuccess("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);
    setTimeout(() => setPasswordSuccess(""), 3000);
  };

  const handleExportData = (format: "csv" | "json") => {
    setExportLoading(true);
    // Simulate export
    setTimeout(() => {
      const data = {
        format,
        exportDate: new Date().toISOString(),
        email: userEmail,
        dataPoints: 1250,
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `velocity-data-${new Date().toISOString().split("T")[0]}.${format === "csv" ? "csv" : "json"}`;
      a.click();
      setExportLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"></div>
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-32 left-1/2 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Sidebar */}
      <Sidebar userEmail={userEmail} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          startDate="2026-01-01"
          endDate="2026-12-31"
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-6 mt-20">
          {/* Title with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 text-slate-300 hover:text-white flex-shrink-0"
              title="Go back"
            >
              <svg
                className="w-5 h-5"
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
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-slate-400">
                Manage your workspace preferences and security
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Currency Settings */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Currency</h2>
                    <p className="text-sm text-slate-400">
                      Choose your preferred currency for analytics
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {["USD", "EUR", "GBP", "AED", "CAD", "AUD", "CHF", "INR"].map(
                    (curr) => (
                      <button
                        key={curr}
                        onClick={() => handleCurrencyChange(curr)}
                        className={`px-4 py-3 rounded-lg font-semibold transition-all duration-300 border ${
                          currency === curr
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 border-green-400/50 text-white shadow-lg shadow-green-500/20"
                            : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                        {curr}
                      </button>
                    ),
                  )}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-lg border border-green-400/20">
                  <p className="text-sm text-green-300">
                    <strong>Current:</strong> All revenue data will be displayed
                    in {currency}
                  </p>
                </div>
              </div>

              {/* Alert Frequency Settings */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
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
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Alert Frequency
                    </h2>
                    <p className="text-sm text-slate-400">
                      How often you want to receive revenue alerts
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      value: "realtime",
                      label: "Real-time",
                      desc: "Get notified immediately",
                    },
                    {
                      value: "daily",
                      label: "Daily",
                      desc: "Daily digest at 9:00 AM",
                    },
                    {
                      value: "weekly",
                      label: "Weekly",
                      desc: "Every Monday at 9:00 AM",
                    },
                    {
                      value: "monthly",
                      label: "Monthly",
                      desc: "First day of month at 9:00 AM",
                    },
                    {
                      value: "none",
                      label: "Disabled",
                      desc: "Turn off all alerts",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                        alertFrequency === option.value
                          ? "bg-blue-600/20 border-blue-400/50"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="alertFrequency"
                        value={option.value}
                        checked={alertFrequency === option.value}
                        onChange={(e) =>
                          handleAlertFrequencyChange(e.target.value)
                        }
                        className="w-4 h-4 cursor-pointer"
                      />
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-semibold text-white">
                          {option.label}
                        </p>
                        <p className="text-xs text-slate-400">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Data Export */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33A3 3 0 0116.5 19.5H6.75z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Data Export
                    </h2>
                    <p className="text-sm text-slate-400">
                      Download your analytics data
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <p className="text-sm text-slate-300">
                    Select a format to export your data:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleExportData("csv")}
                      disabled={exportLoading}
                      className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExportData("json")}
                      disabled={exportLoading}
                      className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Export as JSON
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-lg border border-purple-400/20">
                  <p className="text-sm text-purple-300">
                    Your data includes all analytics, metrics, and
                    configurations up to today.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-white/20 transition-all duration-300 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white">Security</h2>
                </div>

                <div>
                  <p className="text-sm text-slate-300 mb-3">Account email:</p>
                  <p className="text-sm font-mono text-slate-300 bg-white/5 p-3 rounded-lg mb-6 break-all">
                    {userEmail}
                  </p>

                  {!showPasswordForm ? (
                    <button
                      onClick={() => setShowPasswordForm(true)}
                      className="w-full px-4 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-400/30 text-red-300 rounded-lg font-semibold transition-all duration-300"
                    >
                      Change Password
                    </button>
                  ) : (
                    <form onSubmit={handlePasswordChange} className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-400/50 focus:bg-white/15 transition"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-400/50 focus:bg-white/15 transition"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-400/50 focus:bg-white/15 transition"
                          placeholder="••••••••"
                        />
                      </div>

                      {passwordError && (
                        <div className="p-3 bg-red-600/20 border border-red-400/30 rounded-lg">
                          <p className="text-xs text-red-300">
                            {passwordError}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowPasswordForm(false);
                            setCurrentPassword("");
                            setNewPassword("");
                            setConfirmPassword("");
                            setPasswordError("");
                          }}
                          className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-300 rounded-lg font-semibold transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {passwordSuccess && (
                    <div className="mt-3 p-3 bg-green-600/20 border border-green-400/30 rounded-lg">
                      <p className="text-xs text-green-300">
                        {passwordSuccess}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
