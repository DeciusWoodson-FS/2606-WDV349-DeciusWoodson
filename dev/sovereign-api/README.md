# sovereign-api

Backend for the Sovereign calisthenics skill-tree app (`dev/sovereign-app`). Express + MongoDB (Mongoose).

## Setup

```bash
npm install
cp .env.example .env   # fill in MONGODB_URI
npm run dev              # http://localhost:4000
```

`MONGODB_URI` can point at a free MongoDB Atlas cluster, or at a local MongoDB
(`mongodb://127.0.0.1:27017/sovereign`). The server only starts listening once the
database connection succeeds, and exits with an error if it can't connect.

`GET /health` should return `{ "ok": true }` once the server is up.
