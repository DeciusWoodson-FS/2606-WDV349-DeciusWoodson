//This file handles split-screen design, the Logo, and dynanimc image placeholders(These images will be hand drawn and change depending on the page in question)

import React from "react";

export default function AuthLayout({ children, currentView }) {
  return (
    <div className="relative z-10 w-full flex-1 flex flex-col md:flex-row bg-transparent">
      {/* Left Column - Shared Branding */}
      <div className="flex-1 p-12 flex flex-col items-center justify-center relative border-b-2 md:border-b-0 md:border-r-2 border-neutral-700/50">
        <h1 className="mb-8 z-10 hover:scale-105 transition-transform duration-300 metaphor-title-fx flex justify-center">
          <span className="font-title text-7xl md:text-8xl lg:text-9xl uppercase sovereign-logo-transform">
            Sovereign
          </span>
        </h1>

        {/* Image Placeholder based on active page */}
        <div
          className={`flex items-center justify-center z-10 relative group mb-8 mt-4 transition-all duration-500 ${currentView === "register" ? "w-64 h-80" : "w-64 h-64"}`}
        >
          <div className="drafting-box absolute inset-0 transition-colors group-hover:bg-neutral-800/80"></div>
          <span className="text-neutral-500 font-cambria text-2xl tracking-widest lowercase relative z-10">
            image
          </span>
        </div>
      </div>

      {/* Right Column - Dynamic Form Injection */}
      <div className="flex-1 p-12 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="w-full max-w-md relative z-10">
          {/* This is where the specific page components get rendered */}
          {children}
        </div>
      </div>
    </div>
  );
}
