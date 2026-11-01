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

`npm run seed` upserts by `key`, so it's safe to re-run: it updates existing nodes and
quests instead of duplicating them.
