"use client";

export function LoadingState({ theme }: { theme: string }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div
        className={`text-center p-12 rounded-2xl max-w-md ${
          theme === "light"
            ? "bg-white/90 border border-slate-200"
            : "bg-slate-800/90 border border-slate-700"
        }`}
      >
        <div className="inline-block mb-6 animate-spin">
          <svg
            className="w-16 h-16 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3
          className={`text-2xl font-bold mb-2 ${
            theme === "light" ? "text-slate-900" : "text-white"
          }`}
        >
          Analyzing Data...
        </h3>
        <p
          className={`text-sm ${
            theme === "light" ? "text-slate-600" : "text-slate-400"
          }`}
        >
          Processing your CSV file and generating visualizations
        </p>

        {/* Progress steps */}
        <div className="mt-8 space-y-3 text-left">
          {["Parsing CSV", "Profiling Data", "Building Charts", "Creating Insights"].map(
            (step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    theme === "light" ? "bg-indigo-500" : "bg-indigo-400"
                  }`}
                />
                <span
                  className={`text-sm ${
                    theme === "light" ? "text-slate-700" : "text-slate-300"
                  }`}
                >
                  {step}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
