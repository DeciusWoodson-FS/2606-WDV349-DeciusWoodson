import React, { useState } from "react";

export default function RegisterPage({ navigateTo }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <>
      <h2 className="font-cambria text-3xl md:text-4xl text-neutral-200 mb-10 text-center tracking-wide drop-shadow-md">
        Let's get started, sovereign
      </h2>

      <form
        className="space-y-6 flex flex-col items-center w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex gap-6 w-full">
          <div className="w-full relative group">
            <div className="drafting-box absolute inset-0"></div>
            <input
              type="text"
              placeholder="First name..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-5 py-3 outline-none font-cambria text-lg text-neutral-200 placeholder-neutral-500 bg-transparent relative z-30"
            />
          </div>
          <div className="w-full relative group">
            <div className="drafting-box absolute inset-0"></div>
            <input
              type="text"
              placeholder="Last name..."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-5 py-3 outline-none font-cambria text-lg text-neutral-200 placeholder-neutral-500 bg-transparent relative z-30"
            />
          </div>
        </div>

        <div className="w-full relative group">
          <div className="drafting-box absolute inset-0"></div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/0 group-focus-within:border-white/50 group-hover:border-white/50 transition-colors pointer-events-none z-30 flex items-center justify-center">
            <div className="w-1 h-1 bg-white/0 group-focus-within:bg-white/80 group-hover:bg-white/80 rounded-full transition-colors"></div>
          </div>
          <input
            type="text"
            placeholder="Username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-5 py-3 outline-none font-cambria text-lg text-neutral-200 placeholder-neutral-500 bg-transparent relative z-30"
          />
        </div>

        <div className="w-full relative group">
          <div className="drafting-box absolute inset-0"></div>
          <input
            type="email"
            placeholder="Email address..."
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            className="w-full px-5 py-3 outline-none font-cambria text-lg text-neutral-200 placeholder-neutral-500 bg-transparent relative z-30"
          />
        </div>

        <div className="w-full relative group">
          <div className="drafting-box absolute inset-0"></div>
          <input
            type="password"
            placeholder="Password..."
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            className="w-full px-5 py-3 outline-none font-cambria text-lg text-neutral-200 placeholder-neutral-500 bg-transparent relative z-30"
          />
        </div>

        <div className="w-full relative group">
          <div className="drafting-box absolute inset-0"></div>
          <input
            type="password"
            placeholder="Confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-5 py-3 outline-none font-cambria text-lg text-neutral-200 placeholder-neutral-500 bg-transparent relative z-30"
          />
        </div>

        <div className="h-2"></div>

        <button className="w-full relative group text-white transition-colors duration-200">
          <div className="drafting-box absolute inset-0 bg-neutral-600/30 group-hover:bg-neutral-500/50"></div>
          <div className="relative z-30 px-6 py-4 font-cambria text-lg tracking-widest font-bold">
            Let's get it!
          </div>
        </button>

        {/* Swap to Login Route */}
        <button
          type="button"
          onClick={() => navigateTo("login")}
          className="text-neutral-500 hover:text-neutral-300 font-cambria tracking-wide transition-colors mt-2"
        >
          Already have an account? Sign in.
        </button>
      </form>
    </>
  );
}
