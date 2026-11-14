import { useState } from "react";
import { useNavigate } from "react-router";
import { authClient } from "../lib/authClient";

export default function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);
    // Usernames can't contain "@", so anything with one is treated as an email.
    const value = identifier.trim();
    const { error: signInError } = value.includes("@")
      ? await authClient.signIn.email({ email: value, password })
      : await authClient.signIn.username({ username: value, password });
    setSubmitting(false);

    if (signInError) {
      setError(signInError.message || "Couldn't sign you in. Please try again.");
      return;
    }
    navigate("/dashboard");
  };

  return (
    <>
      <h2 className="font-cambria text-3xl md:text-4xl text-neutral-200 mb-16 text-center tracking-wide drop-shadow-md">
        Sign in to your account
      </h2>
      <form
        className="space-y-10 flex flex-col items-center w-full"
        onSubmit={handleSubmit}
      >
        {/* Email Input */}
        <div className="w-full relative group">
          <div className="drafting-box absolute inset-0"></div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/0 group-focus-within:border-white/50 group-hover:border-white/50 transition-colors pointer-events-none z-30 flex items-center justify-center">
            <div className="w-1 h-1 bg-white/0 group-focus-within:bg-white/80 group-hover:bg-white/80 rounded-full transition-colors"></div>
          </div>
          <input
            type="text"
            placeholder="Email/Username"
            autoComplete="username"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-8 py-4 outline-none font-cambria text-lg text-neutral-200 placeholder-neutral-500 bg-transparent relative z-30"
          />
        </div>

        {/* Password Input */}
        <div className="w-full relative group">
          <div className="drafting-box absolute inset-0"></div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/0 group-focus-within:border-white/50 group-hover:border-white/50 transition-colors pointer-events-none z-30 flex items-center justify-center">
            <div className="w-1 h-1 bg-white/0 group-focus-within:bg-white/80 group-hover:bg-white/80 rounded-full transition-colors"></div>
          </div>
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-8 py-4 outline-none font-cambria text-lg text-neutral-200 placeholder-neutral-500 bg-transparent relative z-30"
          />
        </div>

        {error ? (
          <p role="alert" className="font-cambria text-red-400 text-center">
            {error}
          </p>
        ) : (
          <div className="h-2"></div>
        )}

        {/* Standard Login Action */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full relative group text-white transition-colors duration-200 disabled:opacity-60"
        >
          <div className="drafting-box absolute inset-0 bg-neutral-600/30 group-hover:bg-neutral-500/50"></div>
          <div className="relative z-30 px-6 py-4 font-cambria text-lg uppercase tracking-widest font-bold">
            {submitting ? "Signing in..." : "Sign In"}
          </div>
        </button>

        {/* Swap to Register Action */}
        <button
          type="button"
          onClick={() => navigate("/register")}
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
