export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function apiFetch(path, options = {}) {
  let res;
  try {
    // credentials: "include" sends the Better-Auth session cookie, which is how
    // the API knows who is signed in.
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    // fetch only rejects when no response came back, such as the API being down.
    throw new Error("Can't reach the server. Please try again.");
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export const fetchMe = () => apiFetch("/api/me");
export const fetchNodes = () => apiFetch("/api/nodes");
export const masterNode = (key) => apiFetch(`/api/nodes/${key}/master`, { method: "POST" });
export const fetchQuests = () => apiFetch("/api/quests");
export const completeQuest = (key) => apiFetch(`/api/quests/${key}/complete`, { method: "POST" });
