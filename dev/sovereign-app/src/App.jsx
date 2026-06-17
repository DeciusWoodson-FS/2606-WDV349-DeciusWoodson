import React, { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-neutral-900 relative overflow-hidden text-neutral-200"
      style={{ fontFamily: "'Cambria', serif" }}
    >
      {}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        
        html, body, #root {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          max-width: none;
        }

        @font-face {
          font-family: 'Frontage';
          src: url('/fonts/Frontage-Bold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
        
        .font-title {
          font-family: 'Frontage', sans-serif;
        }
        .font-cambria {
          font-family: 'Cambria', serif;
        }
        
        /* Metaphor inspired Dialogue Box (Drafting Lines) */
        .drafting-box {
          position: relative;
          background: rgba(15, 15, 15, 0.75);
          backdrop-filter: blur(4px);
        }
        /* Top & Bottom extending lines */
        .drafting-box::before {
          content: '';
          position: absolute;
          top: 0; left: -12px; right: -12px;
          height: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          pointer-events: none;
          transition: border-color 0.3s;
          z-index: 20;
        }
        /* Left & Right extending lines */
        .drafting-box::after {
          content: '';
          position: absolute;
          top: -12px; bottom: -12px;
          left: 0; right: 0;
          width: 100%;
          border-left: 1px solid rgba(255, 255, 255, 0.3);
          border-right: 1px solid rgba(255, 255, 255, 0.3);
          pointer-events: none;
          transition: border-color 0.3s;
          z-index: 20;
        }
        /* Active/Hover states */
        .group:hover .drafting-box::before,
        .group:hover .drafting-box::after,
        .group:focus-within .drafting-box::before,
        .group:focus-within .drafting-box::after {
          border-color: rgba(255, 255, 255, 0.9);
        }

        /* Title FX */
        .metaphor-title-fx {
          color: white;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2)) drop-shadow(0 4px 4px rgba(0, 0, 0, 0.8));
        }
        
        /* Typographic Texture applied to the Main Title */
        .sovereign-logo-transform {
          display: inline-block;
          transform: scaleY(0.55);
          letter-spacing: -0.075em; 
          transform-origin: center;
        }
        
        /* Subtle background noise texture */
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `,
        }}
      />

      {}
      <div className="absolute inset-0 pointer-events-none bg-noise mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-[120%] h-[120%] -translate-x-1/4 -translate-y-1/4 rotate-[-15deg] bg-neutral-950 -z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-1/3 h-1/2 rotate-25 bg-[#0d1766] opacity-20 -z-10 blur-3xl"></div>

      {/* Main Split Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col md:flex-row bg-transparent">
        {/* Left Column */}
        <div className="flex-1 p-12 flex flex-col items-center justify-center relative border-b-2 md:border-b-0 md:border-r-2 border-neutral-700/50">
          <h1 className="mb-8 z-10 hover:scale-105 transition-transform duration-300 metaphor-title-fx flex justify-center">
            <span className="font-title text-7xl md:text-8xl lg:text-9xl uppercase sovereign-logo-transform">
              Sovereign
            </span>
          </h1>

          <div className="w-64 h-64 flex items-center justify-center z-10 relative group mb-8 mt-4">
            <div className="drafting-box absolute inset-0 transition-colors group-hover:bg-neutral-800/80"></div>
            <span className="text-neutral-500 font-cambria text-2xl tracking-widest lowercase relative z-10">
              image
            </span>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 p-12 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full max-w-md relative z-10">
            <h2 className="font-cambria text-3xl md:text-4xl text-neutral-200 mb-16 text-center tracking-wide drop-shadow-md">
              Sign in to your account
            </h2>

            <form
              className="space-y-10 flex flex-col items-center w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              {}
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

              {}
              <button className="w-full relative group text-neutral-300 hover:text-white transition-colors duration-200">
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

              <button className="w-full relative group text-white transition-colors duration-200">
                <div className="drafting-box absolute inset-0 bg-blue-800/60 group-hover:bg-blue-700/80"></div>
                <div className="relative z-30 px-6 py-4 font-cambria text-lg uppercase tracking-widest font-bold">
                  Create account
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
