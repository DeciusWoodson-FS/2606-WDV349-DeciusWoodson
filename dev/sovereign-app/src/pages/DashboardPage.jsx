import { useState } from "react";
import { useNavigate } from "react-router";
import { useApi } from "../hooks/useApi";
import { completeQuest, fetchMe, fetchNodes, fetchQuests } from "../lib/api";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Counts calendar days, so something done late last night reads as "Yesterday".
function daysAgoLabel(date) {
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const days = Math.round(
    (startOfDay(new Date()) - startOfDay(new Date(date))) / MS_PER_DAY
  );
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    data: me,
    loading: meLoading,
    error: meError,
    reload: reloadMe,
  } = useApi(fetchMe);
  const {
    data: quests,
    loading: questsLoading,
    error: questsError,
    reload: reloadQuests,
  } = useApi(fetchQuests);
  const { data: nodes, error: nodesError } = useApi(fetchNodes);
  const [completingId, setCompletingId] = useState(null);
  const [completeError, setCompleteError] = useState(null);

  // Only one quest saves at a time, since the API rejects simultaneous changes.
  const handleCompleteQuest = async (quest) => {
    if (quest.completed || completingId) return;
    setCompletingId(quest.id);
    setCompleteError(null);
    try {
      await completeQuest(quest.id);
      await Promise.all([reloadMe(), reloadQuests()]);
    } catch (err) {
      setCompleteError(err.message);
    } finally {
      setCompletingId(null);
    }
  };

  const xpPercent = me ? Math.min(100, Math.round((me.xp / me.xpToNextLevel) * 100)) : 0;
  const questMessage = completeError || questsError;

  // Nodes come back sorted by key, so the first available one is the earliest unlocked skill.
  const masteredCount = nodes?.filter((n) => n.status === "mastered").length ?? 0;
  const nextSkill = nodes?.find((n) => n.status === "available");
  const treePercent = nodes?.length ? Math.round((masteredCount / nodes.length) * 100) : 0;

  return (
    <div className="min-h-screen w-full flex flex-col relative z-10 text-neutral-200">
      <header className="relative w-full p-8 flex justify-between items-start">
        {/* Player Profile Section */}
        <div className="flex flex-col gap-2 items-start">
          {/* Top Row: PFP + Level/XP */}
          <div className="flex items-center gap-6">
            <div className="relative group w-24 h-24 shrink-0">
              <div className="drafting-box absolute inset-0"></div>
              <div className="absolute inset-0 flex items-center justify-center font-heading text-xl text-neutral-400 z-10">
                pfp
              </div>
            </div>

            {/* Level & XP Bar */}
            <div className="flex items-center gap-3 w-full">
              <div className="bg-neutral-800 border border-neutral-600 px-3 py-1 font-heading text-sm tracking-widest uppercase">
                Lv. {me ? me.level : "-"}
              </div>
              <div className="relative h-4 w-48 bg-neutral-800 border border-neutral-700 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                <div
                  className="absolute top-0 left-0 h-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                  style={{ width: `${xpPercent}%` }}
                ></div>
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
            <span className="relative z-10 pl-6 font-heading text-2xl text-white drop-shadow-md tracking-wider">
              {me ? me.displayName : "..."}
            </span>
          </div>
        </div>

        {/* Center Title */}
        <div className="absolute left-1/2 -translate-x-1/2 top-10">
          <h2 className="font-heading text-3xl md:text-4xl text-blue-700 tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] text-center">
            Welcome back, Sovereign
          </h2>
        </div>

        {/* Hamburger Menu -> Logout for now */}
        <div
          className="cursor-pointer group mt-2"
          onClick={() => navigate("/login")}
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
          <h3 className="relative z-10 font-heading text-2xl mb-8 text-center tracking-widest uppercase border-b border-neutral-600 pb-4">
            Daily Quests
          </h3>
          <div className="relative z-10 flex flex-col gap-6 flex-1 overflow-y-auto">
            {questsLoading ? (
              <span className="font-heading text-neutral-400">Loading quests...</span>
            ) : (
              quests?.map((quest) => (
                <button
                  key={quest.id}
                  type="button"
                  onClick={() => handleCompleteQuest(quest)}
                  disabled={quest.completed || completingId !== null}
                  className={`flex items-center gap-4 text-left group/item ${
                    quest.completed ? "opacity-60" : "cursor-pointer"
                  }`}
                >
                  <div
                    className={`w-6 h-6 shrink-0 border-2 flex items-center justify-center transition-colors ${
                      quest.completed
                        ? "border-green-500 bg-green-500/20"
                        : "border-neutral-500 group-hover/item:border-blue-500"
                    }`}
                  >
                    {quest.completed && (
                      <span className="text-green-400 text-sm leading-none">✓</span>
                    )}
                  </div>
                  <span className="font-heading text-lg text-neutral-300 group-hover/item:text-white transition-colors">
                    {quest.title}
                  </span>
                  <span
                    className={`ml-auto text-green-400 font-heading text-sm transition-opacity ${
                      quest.completed ? "opacity-100" : "opacity-0 group-hover/item:opacity-100"
                    }`}
                  >
                    +{quest.xpReward} XP
                  </span>
                </button>
              ))
            )}
            {questMessage && (
              <span className="font-cambria text-sm text-red-400">{questMessage}</span>
            )}
          </div>
        </section>

        {/* Center: Skill Tree Progress */}
        <div className="flex-1 min-w-48 flex flex-col items-center justify-center gap-8 text-center">
          {nodes ? (
            <>
              <div className="flex flex-col items-center gap-3 w-full max-w-48">
                <span className="font-heading text-5xl text-white">
                  {masteredCount}
                  <span className="text-3xl text-neutral-500"> / {nodes.length}</span>
                </span>
                <span className="font-heading text-sm text-neutral-400 tracking-widest uppercase">
                  Skills Mastered
                </span>
                <div className="relative h-2 w-full bg-neutral-800 border border-neutral-700 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                    style={{ width: `${treePercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="font-heading text-blue-400 text-sm tracking-widest uppercase">
                  {nextSkill ? "Next Skill" : "Path Complete"}
                </span>
                <span className="font-heading text-xl text-white">
                  {nextSkill ? nextSkill.name : "Every skill mastered"}
                </span>
              </div>
            </>
          ) : nodesError ? (
            <span className="font-cambria text-sm text-red-400">{nodesError}</span>
          ) : (
            <span className="font-heading text-neutral-400">Loading progress...</span>
          )}

          <button
            onClick={() => navigate("/skill-tree")}
            className="relative group text-white transition-colors duration-200"
          >
            <div className="drafting-box absolute inset-0 bg-blue-800/40 group-hover:bg-blue-700/60"></div>
            <div className="relative z-30 px-8 py-4 font-heading text-xl uppercase tracking-widest">
              Open Skill Tree
            </div>
          </button>
        </div>

        {/* Right Column: Achievements */}
        <section className="w-full max-w-md relative group h-[60vh] flex flex-col p-8">
          <div className="drafting-box absolute inset-0 transition-colors group-hover:bg-neutral-800/80"></div>
          <h3 className="relative z-10 font-heading text-2xl mb-8 text-center tracking-widest uppercase border-b border-neutral-600 pb-4">
            Recent
            <br />
            Achievements
          </h3>
          <div className="relative z-10 flex flex-col gap-8 flex-1 overflow-y-auto">
            {meLoading ? (
              <span className="font-heading text-neutral-400">Loading achievements...</span>
            ) : !me ? (
              <span className="font-cambria text-sm text-red-400">{meError}</span>
            ) : me.recentMasteries.length === 0 ? (
              <span className="font-heading text-neutral-400">
                Master a skill to see it here.
              </span>
            ) : (
              me.recentMasteries.map((mastery) => (
                <div key={mastery.id} className="flex flex-col gap-1">
                  <span className="font-heading text-blue-400 text-sm tracking-widest">
                    MASTERED
                  </span>
                  <span className="font-heading text-xl text-white">{mastery.name}</span>
                  <span className="font-heading text-neutral-500 text-sm mt-1">
                    {daysAgoLabel(mastery.masteredAt)}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
