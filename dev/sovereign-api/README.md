# sovereign-api

Backend for the Sovereign calisthenics skill-tree app (`dev/sovereign-app`). Express + MongoDB (Mongoose).

## Setup

```bash
npm install
cp .env.example .env
npm run dev              # http://localhost:4000
```

`GET /health` should return `{ "ok": true }` once the server is up.
