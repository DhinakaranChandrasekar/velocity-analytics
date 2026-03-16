"use client";

import { useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface CSVUploadWidgetProps {
  onUpload: (file: File) => void;
  isLoading: boolean;
}

export function CSVUploadWidget({ onUpload, isLoading }: CSVUploadWidgetProps) {
  const { theme } = useTheme();
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.name.toLowerCase().endsWith(".csv")) {
        setSelectedFile(file);
        onUpload(file);
      } else {
        alert("Please drop a CSV file");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
      className={`relative border-2 border-dashed rounded-lg p-8 cursor-pointer transition-all duration-300 ${
        isDragActive
          ? theme === "light"
            ? "bg-blue-50 border-blue-300 shadow-lg"
            : "bg-blue-500/10 border-blue-400 shadow-lg"
          : theme === "light"
            ? "bg-slate-50 border-slate-300 hover:bg-slate-100 hover:border-slate-400"
            : "bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleChange}
        disabled={isLoading}
        className="hidden"
        aria-label="Upload CSV file"
      />

      <div className="text-center">
        {isLoading ? (
          <>
            <div className="inline-block mb-4">
              <div className="animate-spin">
                <svg
                  className="w-8 h-8 text-blue-500"
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
              </div>
            </div>
            <p
              className={`font-semibold ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              Generating your dashboard...
            </p>
            <p
              className={`text-sm mt-1 ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}
            >
              This may take a moment
            </p>
          </>
        ) : (
          <>
            <svg
              className={`w-12 h-12 mx-auto mb-4 ${
                theme === "light" ? "text-slate-400" : "text-slate-500"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p
              className={`font-semibold ${
                theme === "light" ? "text-slate-900" : "text-white"
              }`}
            >
              Drag and drop your CSV here
            </p>
            <p
              className={`text-sm mt-2 ${
                theme === "light" ? "text-slate-600" : "text-slate-400"
              }`}
            >
              or click to select a file
            </p>
            {selectedFile && (
              <p
                className={`text-sm mt-4 font-medium ${
                  theme === "light" ? "text-blue-600" : "text-blue-400"
                }`}
              >
                📄 {selectedFile.name}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
