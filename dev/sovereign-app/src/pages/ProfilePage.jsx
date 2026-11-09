import { useNavigate } from "react-router";
import { useApi } from "../hooks/useApi";
import { fetchMe, fetchNodes } from "../lib/api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: me, loading: meLoading, error: meError } = useApi(fetchMe);
  const { data: nodes, loading: nodesLoading, error: nodesError } = useApi(fetchNodes);

  const xpPercent = me ? Math.min(100, Math.round((me.xp / me.xpToNextLevel) * 100)) : 0;
  const masteredNodes = nodes?.filter((n) => n.status === "mastered") ?? [];

  return (
    <div className="min-h-screen w-full flex flex-col relative z-10 text-neutral-200">
      <header className="relative w-full p-8 flex justify-end items-start">
        {/* Center Title */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10">
          <h2 className="font-heading text-3xl md:text-4xl text-blue-700 tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-center">
            Profile
          </h2>
        </div>

        {/* Hamburger Menu -> Back to Dashboard */}
        <button
          type="button"
          aria-label="Back to dashboard"
          className="cursor-pointer group mt-2"
          onClick={() => navigate("/dashboard")}
        >
          <div className="flex flex-col gap-2">
            <div className="w-10 h-1 bg-white group-hover:bg-blue-500 transition-colors"></div>
            <div className="w-10 h-1 bg-white group-hover:bg-blue-500 transition-colors"></div>
            <div className="w-10 h-1 bg-white group-hover:bg-blue-500 transition-colors"></div>
          </div>
        </button>
      </header>

      <main className="relative flex-1 w-full px-12 py-8 flex justify-center gap-12">
        {/* Left Column: Player Card */}
        <section className="w-full max-w-md relative group h-[60vh] flex flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="drafting-box absolute inset-0 transition-colors group-hover:bg-neutral-800/80"></div>
          {meLoading ? (
            <span className="relative z-10 font-heading text-neutral-400">Loading profile...</span>
          ) : !me ? (
            <span className="relative z-10 font-cambria text-sm text-red-400">{meError}</span>
          ) : (
            <div className="relative z-10 flex flex-col items-center gap-6 w-full">
              <div className="relative w-32 h-32">
                <div className="drafting-box absolute inset-0"></div>
                <div className="absolute inset-0 flex items-center justify-center font-heading text-2xl text-neutral-400">
                  pfp
                </div>
              </div>
              <span className="font-heading text-3xl text-white tracking-wider">
                {me.displayName}
              </span>
              <div className="bg-neutral-800 border border-neutral-600 px-3 py-1 font-heading text-sm tracking-widest uppercase">
                Lv. {me.level}
              </div>
              <div className="flex flex-col gap-2 w-full max-w-64">
                <div className="relative h-4 w-full bg-neutral-800 border border-neutral-700 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                    style={{ width: `${xpPercent}%` }}
                  ></div>
                </div>
                <span className="font-heading text-sm text-neutral-400">
                  {me.xp} / {me.xpToNextLevel} XP to level {me.level + 1}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Right Column: Mastered Skills */}
        <section className="w-full max-w-md relative group h-[60vh] flex flex-col p-8">
          <div className="drafting-box absolute inset-0 transition-colors group-hover:bg-neutral-800/80"></div>
          <h3 className="relative z-10 font-heading text-2xl mb-8 text-center tracking-widest uppercase border-b border-neutral-600 pb-4">
            Mastered Skills
            {nodes && (
              <span className="block text-sm text-neutral-400 mt-2">
                {masteredNodes.length} / {nodes.length}
              </span>
            )}
          </h3>
          <div className="relative z-10 flex flex-col gap-6 flex-1 overflow-y-auto">
            {nodesLoading ? (
              <span className="font-heading text-neutral-400">Loading skills...</span>
            ) : !nodes ? (
              <span className="font-cambria text-sm text-red-400">{nodesError}</span>
            ) : masteredNodes.length === 0 ? (
              <span className="font-heading text-neutral-400">
                No skills mastered yet. Your first one is waiting in the Skill Tree.
              </span>
            ) : (
              masteredNodes.map((node) => (
                <div key={node.id} className="flex flex-col gap-1">
                  <span className={`font-heading text-xl ${node.isApex ? "text-yellow-400" : "text-white"}`}>
                    {node.name}
                  </span>
                  <span className="font-heading text-neutral-500 text-sm">{node.muscleGroup}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
