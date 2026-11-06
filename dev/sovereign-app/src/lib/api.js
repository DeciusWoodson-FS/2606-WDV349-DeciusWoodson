const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const USER_ID_KEY = "sovereign-user-id";

// PLACEHOLDER AUTH: the backend has no real login yet, just a per-device id
// sent as `x-user-id`. Replace this with a real session once auth exists.
function getUserId() {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
}

async function apiFetch(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-user-id": getUserId(),
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
