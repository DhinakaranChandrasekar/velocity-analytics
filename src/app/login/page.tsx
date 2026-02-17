"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email && password) {
      localStorage.setItem("authToken", "demo-token-" + Date.now());
      localStorage.setItem("userEmail", email);
      router.push("/dashboard");
    } else {
      setError("Please fill in all fields");
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #6d28d9 50%, #312e81 100%)",
      }}
    >
      {/* Animated Background Elements */}
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-gradient {
          animation: gradient-shift 15s ease infinite;
          background-size: 200% 200%;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div
        className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
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

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-center gap-8">
        {/* Animation Styles */}
        <style>{`
          @keyframes animateLine {
            0% { stroke-dasharray: 200; stroke-dashoffset: 200; opacity: 0.3; }
            50% { stroke-dasharray: 200; stroke-dashoffset: 0; opacity: 0.8; }
            100% { stroke-dasharray: 200; stroke-dashoffset: -200; opacity: 0.3; }
          }
          @keyframes animateBars {
            0% { transform: scaleY(0); opacity: 0; }
            100% { transform: scaleY(1); opacity: 1; }
          }
          .animate-chart-line {
            animation: animateLine 4s ease-in-out infinite !important;
          }
          .animate-chart-bars {
            animation: animateBars 2.5s ease-in-out infinite !important;
            transform-origin: bottom;
          }
        `}</style>

        {/* Left Chart */}
        <div className="hidden lg:flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
          <svg
            width="280"
            height="280"
            viewBox="0 0 100 60"
            className="drop-shadow-2xl"
          >
            <defs>
              <linearGradient
                id="leftLineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#60a5fa", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#a78bfa", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <polyline
              points="0,45 15,35 30,40 45,20 60,15 75,25 90,10"
              fill="none"
              stroke="url(#leftLineGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-chart-line"
            />
          </svg>
        </div>

        {/* Center Content */}
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
              Velocity
            </h1>
            <p className="text-lg text-purple-300/80">
              Next-Gen Analytics Platform
            </p>
          </div>

          {/* Login Card with Glassmorphism */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 via-purple-600/50 to-pink-600/50 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

            {/* Main Card */}
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div className="group">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-white/80 mb-3 group-focus-within:text-white transition-colors"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-focus-within:opacity-100 transition-all duration-300 blur-md`}
                    ></div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="you@example.com"
                      className="relative w-full px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                    />
                    {focusedField === "email" && (
                      <div className="absolute right-4 top-3 w-1 h-5 bg-gradient-to-b from-blue-400 to-transparent rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>

                {/* Password Input */}
                <div className="group">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-white/80 mb-3 group-focus-within:text-white transition-colors"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-focus-within:opacity-100 transition-all duration-300 blur-md`}
                    ></div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="••••••••"
                      className="relative w-full px-5 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                    />
                    {focusedField === "password" && (
                      <div className="absolute right-4 top-3 w-1 h-5 bg-gradient-to-b from-purple-400 to-transparent rounded-full animate-pulse"></div>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 backdrop-blur-sm animate-pulse">
                    <p className="text-red-300 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full relative mt-8 py-4 px-6 rounded-lg font-bold text-white transition-all duration-300 overflow-hidden group/btn disabled:opacity-70"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 group-hover/btn:scale-110 group-hover/btn:brightness-110 transition-all duration-300"></div>
                  <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 bg-white/10 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <svg
                          className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-white/50 text-sm">
                  Advanced Analytics for Modern Teams
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Chart */}
        <div className="hidden lg:flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
          <svg
            width="280"
            height="280"
            viewBox="0 0 100 60"
            className="drop-shadow-2xl"
          >
            <defs>
              <linearGradient
                id="rightBarGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#ec4899", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#a78bfa", stopOpacity: 0.3 }}
                />
              </linearGradient>
            </defs>
            <rect
              x="15"
              y="25"
              width="8"
              height="35"
              fill="url(#rightBarGradient)"
              rx="1"
              className="animate-chart-bars"
            />
            <rect
              x="32"
              y="10"
              width="8"
              height="50"
              fill="url(#rightBarGradient)"
              rx="1"
              className="animate-chart-bars"
              style={{ animationDelay: "0.2s" }}
            />
            <rect
              x="49"
              y="30"
              width="8"
              height="30"
              fill="url(#rightBarGradient)"
              rx="1"
              className="animate-chart-bars"
              style={{ animationDelay: "0.4s" }}
            />
            <rect
              x="66"
              y="15"
              width="8"
              height="45"
              fill="url(#rightBarGradient)"
              rx="1"
              className="animate-chart-bars"
              style={{ animationDelay: "0.6s" }}
            />
          </svg>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <p className="text-white/30 text-xs tracking-widest">
          SECURE • ENCRYPTED • RELIABLE
        </p>
      </div>
    </div>
  );
}
