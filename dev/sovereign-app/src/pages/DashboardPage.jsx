import React from "react";

export default function DashboardPage({ navigateTo }) {
  return (
    <div className="min-h-screen w-full flex flex-col relative z-10 text-neutral-200">
      <header className="relative w-full p-8 flex justify-between items-start">
        {/* Player Profile Section */}
        <div className="flex flex-col gap-2 items-start">
          {/* Top Row: PFP + Level/XP */}
          <div className="flex items-center gap-6">
            <div className="relative group w-24 h-24 shrink-0">
              <div className="drafting-box absolute inset-0"></div>
              <div className="absolute inset-0 flex items-center justify-center font-juana text-xl text-neutral-400 z-10">
                pfp
              </div>
            </div>

            {/* Level & XP Bar */}
            <div className="flex items-center gap-3 w-full">
              <div className="bg-neutral-800 border border-neutral-600 px-3 py-1 font-juana text-sm tracking-widest uppercase">
                Lv. 14
              </div>
              <div className="relative h-4 w-48 bg-neutral-800 border border-neutral-700 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                <div className="absolute top-0 left-0 h-full w-[65%] bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"></div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Nameplate */}
          <div className="relative w-64 h-16 flex items-center mt-2">
            <img
              src="/name-plate.png"
              alt="Nameplate background"
              className="absolute inset-0 w-full h-full object-cover name-plate-blend opacity-80"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <span className="relative z-10 pl-6 font-juana text-2xl text-white drop-shadow-md tracking-wider">
              leo_vane
            </span>
          </div>
        </div>

        {/* Center Title */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10">
          <h2 className="font-juana text-3xl md:text-4xl text-blue-700 tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-center">
            Welcome back, Sovereign
          </h2>
        </div>

        {/* Hamburger Menu -> Logout */}
        <div
          className="cursor-pointer group mt-2"
          onClick={() => navigateTo("login")}
        >
          <div className="flex flex-col gap-2">
            <div className="w-10 h-1 bg-white group-hover:bg-blue-500 transition-colors"></div>
            <div className="w-10 h-1 bg-white group-hover:bg-blue-500 transition-colors"></div>
            <div className="w-10 h-1 bg-white group-hover:bg-blue-500 transition-colors"></div>
          </div>
        </div>
      </header>

      {}
      <main className="relative flex-1 w-full px-12 py-8 flex justify-between gap-12 h-full">
        {/* Left Column: Quests */}
        <section className="w-full max-w-md relative group h-[60vh] flex flex-col p-8">
          <div className="drafting-box absolute inset-0 transition-colors group-hover:bg-neutral-800/80"></div>
          <h3 className="relative z-10 font-juana text-2xl mb-8 text-center tracking-widest uppercase border-b border-neutral-600 pb-4">
            Daily Quests
          </h3>
          <div className="relative z-10 flex flex-col gap-6 flex-1 overflow-y-auto">
            {[
              "100 Pushups",
              "5x10 Pullups",
              "150g Protein",
              "10 Min L-Sit Grind",
            ].map((quest, i) => (
              <label
                key={i}
                className="flex items-center gap-4 cursor-pointer group/item"
              >
                <div className="w-6 h-6 border-2 border-neutral-500 flex items-center justify-center group-hover/item:border-blue-500 transition-colors"></div>
                <span className="font-juana text-lg text-neutral-300 group-hover/item:text-white transition-colors">
                  {quest}
                </span>
                <span className="ml-auto text-green-400 font-juana text-sm opacity-0 group-hover/item:opacity-100 transition-opacity">
                  +50 XP
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Center: Future Skill Tree Launch Button */}
        <div className="flex-1 flex items-center justify-center">
          <button className="relative group text-white transition-colors duration-200">
            <div className="drafting-box absolute inset-0 bg-blue-800/40 group-hover:bg-blue-700/60"></div>
            <div className="relative z-30 px-8 py-4 font-juana text-xl uppercase tracking-widest">
              Open Skill Tree
            </div>
          </button>
        </div>

        {/* Right Column: Achievements */}
        <section className="w-full max-w-md relative group h-[60vh] flex flex-col p-8">
          <div className="drafting-box absolute inset-0 transition-colors group-hover:bg-neutral-800/80"></div>
          <h3 className="relative z-10 font-juana text-2xl mb-8 text-center tracking-widest uppercase border-b border-neutral-600 pb-4">
            Recent
            <br />
            Achievements
          </h3>
          <div className="relative z-10 flex flex-col gap-8 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-1">
              <span className="font-juana text-blue-400 text-sm tracking-widest">
                UNLOCKED
              </span>
              <span className="font-juana text-xl text-white">
                Advanced Tuck Planche
              </span>
              <span className="font-juana text-neutral-500 text-sm mt-1">
                2 days ago
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-juana text-green-400 text-sm tracking-widest">
                LEVEL UP
              </span>
              <span className="font-juana text-xl text-white">
                Reached Level 14
              </span>
              <span className="font-juana text-neutral-500 text-sm mt-1">
                1 week ago
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
