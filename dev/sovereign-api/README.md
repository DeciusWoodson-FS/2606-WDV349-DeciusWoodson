# sovereign-api

Backend for the Sovereign calisthenics skill-tree app (`dev/sovereign-app`). Express + MongoDB (Mongoose).

## Setup

```bash
npm install
cp .env.example .env   # fill in MONGODB_URI
npm run seed            # loads the 8 skill nodes and 4 daily quests
npm run dev              # http://localhost:4000
```

`MONGODB_URI` can point at a free MongoDB Atlas cluster, or at a local MongoDB
(`mongodb://127.0.0.1:27017/sovereign`). The server only starts listening once the
database connection succeeds, and exits with an error if it can't connect.

`GET /health` should return `{ "ok": true }` once the server is up.

## Data model

- **Node** — one of the 8 skill-tree exercises. Has a `key` (matches the frontend's
  numeric node id), `prerequisites` (node keys that must be mastered first), and display
  fields (`name`, `muscleGroup`, `description`, `x`, `y`, `isApex`).
- **Quest** — one of the 4 daily quests (`key`, `title`, `xpReward`).
- **User** — created on first request for a given `x-user-id`. Tracks `level`, `xp`,
  `masteredNodeKeys`, `masteries` (each node key with its `masteredAt` date), and
  `completedQuestKeys` (cleared when the calendar day rolls over). Level N takes N × 100 XP to clear; leftover XP carries over.

Node status (`locked` / `available` / `mastered`) is computed per request from the
requesting user's `masteredNodeKeys`. It's never stored on the Node itself, since it
differs per user.

`npm run seed` upserts by `key`, so it's safe to re-run: it updates existing nodes and
quests instead of duplicating them.

## Auth (placeholder)

`src/middleware/requireUser.js` trusts an `x-user-id` request header instead of a real
session — there is no login/password check yet. Any request can claim any identity by
setting that header, so **do not treat this as real auth**. It exists so the skill tree
routes can be built and tested before Better-Auth is integrated in the Security &
Compliance milestone.

```bash
curl http://localhost:4000/api/nodes -H "x-user-id: test-user-1"
```

## Routes

Logic lives in `src/controllers/`; files in `src/routes/` only map URLs to controllers.

| Method | Route                    | Description |
|--------|--------------------------|-------------|
| GET    | `/health`                | Health check, no user required |
| GET    | `/api/nodes`             | All nodes with this user's `status` (locked/available/mastered) |
| POST   | `/api/nodes/:key/master` | Master a node if its prerequisites are met. Awards XP (100, or 300 for the apex node), handles level-ups, and returns which nodes just unlocked. |
| GET    | `/api/quests`            | Today's quests with this user's `completed` flag |
| POST   | `/api/quests/:key/complete` | Complete a quest for today. Awards its XP and handles level-ups. |
| GET    | `/api/me`                | The user's level, XP, XP needed for the next level, mastered nodes, and `recentMasteries` (the 5 newest, with names and dates) |

All `/api` routes require the `x-user-id` header and return `401` without it.
