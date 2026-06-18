import React, { useState } from "react";

export default function LoginPage({ navigateTo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <h2 className="font-cambria text-3xl md:text-4xl text-neutral-200 mb-16 text-center tracking-wide drop-shadow-md">
        Sign in to your account
      </h2>

      <form
        className="space-y-10 flex flex-col items-center w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Email input */}
        <div className="w-full relative group">
          <div className="drafting-box absolute inset-0"></div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/0 group-focus-within:border-white/50 group-hover:border-white/50 transition-colors pointer-events-none z-30 flex items-center justify-center">
            <div className="w-1 h-1 bg-white/0 group-focus-within:bg-white/80 group-hover:bg-white/80 rounded-full transition-colors"></div>
          </div>
          <input
            type="text"
            placeholder="Email/Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-8 py-4 outline-none font-cambria text-lg text-neutral-200 placeholder-neutral-500 bg-transparent relative z-30"
          />
        </div>

        {/* Password input */}
        <div className="w-full relative group">
          <div className="drafting-box absolute inset-0"></div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/0 group-focus-within:border-white/50 group-hover:border-white/50 transition-colors pointer-events-none z-30 flex items-center justify-center">
            <div className="w-1 h-1 bg-white/0 group-focus-within:bg-white/80 group-hover:bg-white/80 rounded-full transition-colors"></div>
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-8 py-4 outline-none font-cambria text-lg text-neutral-200 placeholder-neutral-500 bg-transparent relative z-30"
          />
        </div>

        <div className="h-2"></div>

        {/* Google Button */}
        <button
          type="button"
          className="w-full relative group text-neutral-300 hover:text-white transition-colors duration-200"
        >
          <div className="drafting-box absolute inset-0"></div>
          <div className="relative z-30 px-6 py-4 flex items-center justify-center gap-4 font-cambria text-lg tracking-wide">
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </div>
        </button>

        {/* Swap to Register Route */}
        <button
          type="button"
          onClick={() => navigateTo("register")}
          className="w-full relative group text-white transition-colors duration-200"
        >
          <div className="drafting-box absolute inset-0 bg-blue-800/60 group-hover:bg-blue-700/80"></div>
          <div className="relative z-30 px-6 py-4 font-cambria text-lg uppercase tracking-widest font-bold">
            Create account
          </div>
        </button>
      </form>
    </>
  );
}
