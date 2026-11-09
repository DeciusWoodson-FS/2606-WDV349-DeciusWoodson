import { useState } from "react";
import { useNavigate } from "react-router";
import { useApi } from "../hooks/useApi";
import { fetchMe, fetchNodes, masterNode } from "../lib/api";

export default function SkillTreePage() {
  const navigate = useNavigate();
  const {
    data: nodeData,
    loading,
    error: nodesError,
    reload: reloadNodes,
  } = useApi(fetchNodes);
  const { data: me, error: meError, reload: reloadMe } = useApi(fetchMe);
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [mastering, setMastering] = useState(false);
  const [masterError, setMasterError] = useState(null);

  // Panning State Hooks
  const [isDragging, setIsDragging] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const nodes = nodeData ?? [];
  const error = masterError || nodesError || meError;

  // Edges are derived from each node's prerequisites, as returned by the API.
  const connections = nodes.flatMap((node) =>
    node.prerequisites.map((prereqId) => [prereqId, node.id])
  );

  const activeNode = nodes.find((n) => n.id === activeNodeId) || null;

  const handleMaster = async () => {
    if (!activeNode || activeNode.status !== "available") return;
    setMastering(true);
    setMasterError(null);
    try {
      await masterNode(activeNode.id);
      await Promise.all([reloadNodes(), reloadMe()]);
    } catch (err) {
      setMasterError(err.message);
    } finally {
      setMastering(false);
    }
  };

  const xpPercent = me ? Math.min(100, Math.round((me.xp / me.xpToNextLevel) * 100)) : 0;

  return (
    <div className="min-h-screen w-full flex flex-col relative z-10 text-neutral-200 overflow-hidden font-cambria">
      {/* Header - Stays static on top of the panning canvas */}
      <header className="absolute top-0 left-0 right-0 z-40 w-full p-8 flex justify-between items-start pointer-events-none">
        {/* Player Profile Section (Matches Dashboard) */}
        <div className="flex items-center gap-6 pointer-events-auto">
          <div className="relative group w-16 h-16 shrink-0">
            <div className="drafting-box absolute inset-0"></div>
            <div className="absolute inset-0 flex items-center justify-center font-heading text-xs text-neutral-400 z-10">
              pfp
            </div>
          </div>
          <div className="flex flex-col gap-1 w-48">
            <div className="bg-neutral-800 border border-neutral-600 px-2 py-0.5 font-heading text-xs tracking-widest uppercase inline-block w-fit">
              Lv. {me ? me.level : "-"}
            </div>
            <div className="relative h-2 w-full bg-neutral-800 border border-neutral-700 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
              <div
                className="absolute top-0 left-0 h-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Center Title */}
        <div className="absolute left-1/2 -translate-x-1/2 top-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-2 border border-neutral-600 pointer-events-auto">
            <span className="font-heading text-sm">icon</span>
          </div>
          <h2 className="font-heading text-2xl text-blue-700 tracking-wide drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Skill Tree
          </h2>
        </div>

        {/* Hamburger Menu -> Back to Dashboard */}
        <div
          className="cursor-pointer group mt-2 pointer-events-auto"
          onClick={() => navigate("/dashboard")}
        >
          <div className="flex flex-col gap-2">
            <div className="w-10 h-1 bg-white group-hover:bg-blue-500 transition-colors"></div>
            <div className="w-10 h-1 bg-white group-hover:bg-blue-500 transition-colors"></div>
            <div className="w-10 h-1 bg-white group-hover:bg-blue-500 transition-colors"></div>
          </div>
        </div>
      </header>

      {/* --- DRAGGABLE PANNING CANVAS --- */}
      <div
        className="absolute inset-0 z-0 overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Background Skill Tree image */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <img
            src="/Tree.png"
            alt="Skill Tree Background"
            className="w-full h-full max-w-5xl object-contain opacity-30 mix-blend-screen scale-[1.3] translate-y-12"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Everything inside this div moves when panned */}
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-0 ease-linear origin-center z-10"
          style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
        >
          {/* Connecting Lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {connections.map(([startId, endId], i) => {
              const start = nodes.find((n) => n.id === startId);
              const end = nodes.find((n) => n.id === endId);
              if (!start || !end) return null;
              return (
                <line
                  key={i}
                  x1={`${start.x}%`}
                  y1={`${start.y}%`}
                  x2={`${end.x}%`}
                  y2={`${end.y}%`}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
              );
            })}
          </svg>

          {/* The Hexagon Nodes */}
          {nodes.map((node) => {
            const isMasteredApex = node.isApex && node.status === "mastered";
            return (
              <div
                key={node.id}
                onClick={(e) => {
                  // Prevent click if user is dragging
                  if (!isDragging) {
                    setActiveNodeId(node.id);
                    setMasterError(null);
                  }
                  e.stopPropagation();
                }}
                className={`absolute cursor-pointer pointer-events-auto transition-transform hover:scale-110 flex items-center justify-center group w-24 h-24 -ml-12 -mt-12 clip-hex ${
                  isMasteredApex
                    ? "bg-yellow-500"
                    : node.status === "mastered"
                      ? "bg-neutral-200"
                      : node.status === "available"
                        ? "bg-blue-600"
                        : "bg-neutral-700"
                }`}
                style={{ left: `${node.x}%`, top: `${node.y}%`, zIndex: 10 }}
              >
                {/* Inner Hexagon Container */}
                <div
                  className={`w-[calc(100%-4px)] h-[calc(100%-4px)] clip-hex flex items-center justify-center p-2 text-center ${
                    isMasteredApex
                      ? "bg-yellow-400 text-neutral-900"
                      : node.status === "mastered"
                        ? "bg-neutral-300 text-neutral-900"
                        : node.status === "available"
                          ? "bg-blue-800 text-white"
                          : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  <span className="font-heading text-[10px] uppercase leading-tight tracking-wider select-none pointer-events-none">
                    {node.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* --- STATIC SIDE PANELS (Float above the panning canvas) --- */}
      <main className="absolute inset-0 z-30 flex-1 w-full px-12 pb-8 flex justify-between pointer-events-none mt-24">
        {/* Left Side Panel */}
        <section className="w-full max-w-sm relative group h-[70vh] flex flex-col p-8 self-center pointer-events-auto shadow-2xl">
          <div className="drafting-box absolute inset-0 transition-colors group-hover:bg-neutral-900/90 bg-neutral-950/80"></div>
          <div className="relative z-10 flex flex-1 items-center justify-center text-center">
            <span className="font-heading text-lg text-neutral-400">
              {activeNode
                ? `Target Muscle: ${activeNode.muscleGroup}`
                : `Visual of muscle group being targeted`}
            </span>
          </div>
        </section>

        {/* Center Space left open for skill Tree */}
        <div className="flex-1 pointer-events-none"></div>

        {/* Right Side Panel */}
        <section className="w-full max-w-sm relative group h-[70vh] flex flex-col p-8 self-center pointer-events-auto shadow-2xl">
          <div className="drafting-box absolute inset-0 transition-colors group-hover:bg-neutral-900/90 bg-neutral-950/80"></div>
          <div className="relative z-10 flex flex-col gap-4 flex-1 items-center justify-center text-center">
            {loading ? (
              <span className="font-heading text-lg text-neutral-400">Loading skill tree...</span>
            ) : !nodeData ? (
              <span className="font-heading text-lg text-red-400">{error}</span>
            ) : activeNode ? (
              <>
                <h3 className="font-heading text-2xl text-white uppercase tracking-widest">
                  {activeNode.name}
                </h3>
                <p className="font-cambria text-neutral-400">
                  {activeNode.status === "locked"
                    ? "Prerequisites not met. Keep grinding previous tiers to unlock this form."
                    : activeNode.description}
                </p>
                {activeNode.status === "available" && (
                  <button
                    onClick={handleMaster}
                    disabled={mastering}
                    className="mt-6 border border-blue-500 text-blue-400 px-6 py-2 font-heading uppercase hover:bg-blue-900/50 transition-colors disabled:opacity-50"
                  >
                    {mastering ? "Saving..." : "Mark as Mastered"}
                  </button>
                )}
                {activeNode.status === "mastered" && (
                  <span className="mt-6 font-heading text-green-400 uppercase tracking-widest text-sm">
                    Mastered
                  </span>
                )}
                {error && (
                  <span className="font-cambria text-sm text-red-400">{error}</span>
                )}
              </>
            ) : (
              <span className="font-heading text-lg text-neutral-400">
                Select a node to view exercise description
              </span>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
