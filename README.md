# Project & Portfolio 🚀

### Woodson Decius

![Degree Program](https://img.shields.io/badge/degree-web%20development-blue.svg)

<br>

[Log](./docs/log.md)

# Sovereign

**Live Beta:** [sovereign-one-sigma.vercel.app](https://sovereign-one-sigma.vercel.app)

## Table of Contents

- [General Information](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Deployment](#deployment)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Documentation](#documentation)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## General Information

Sovereign is a calisthenics fitness application that uses Role-Playing Game (RPG) elements, like leveling up, achievements, and a skill tree, to turn bodyweight training into an engaging journey of mastery. Mainstream fitness trackers focus on reps and weights, but calisthenics progress happens through skill progressions, like working from a standard pushup all the way to a full planche. Sovereign maps those progressions onto a game-style skill tree, so athletes can see exactly where they are and what to work toward next, and beginners get a clear starting line.

## Technologies Used

- ![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB) React 19 with Vite and React Router
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white) Tailwind CSS 4
- ![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white) Node.js 22
- ![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB) Express 4
- ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white) MongoDB with Mongoose, hosted on MongoDB Atlas
- Better-Auth for accounts and sessions
- Vercel (frontend) and Render (API) for hosting

## Features

- **Accounts:** register with a unique username, then sign in with either your email or username. Passwords are hashed, and the session is kept in a secure cookie.
- **Skill Tree:** the complete Push branch, eight nodes from the Standard Pushup up to the Full Planche. Each node shows its target muscles and form cues, and mastering one unlocks the next. The tree can be dragged to pan around.
- **Leveling:** mastering a node awards XP (300 for the Full Planche apex node), and each level takes a little more XP than the last.
- **Daily Quests:** four quests that can each be completed once per day for 50 XP, and reset the next day.
- **Dashboard:** your level, XP, daily quests, skills mastered, the next skill to work on, and your most recent achievements.
- **Profile:** your name, level, XP to the next level, and every skill you've mastered.
- **Protected pages:** the Dashboard, Skill Tree, and Profile require signing in, and every account's progress is kept separate.

## Project Structure

```
dev/
  sovereign-app/   Frontend: React, Vite, and Tailwind
  sovereign-api/   Backend: Express, MongoDB, and Better-Auth
docs/              Proposal, change order, research notes, test plan, and weekly log
```

Each project has its own `package.json` and is installed and run separately. The API's routes, data model, and auth setup are documented in [dev/sovereign-api/README.md](./dev/sovereign-api/README.md).

## Setup

### Prerequisites

- [Node.js](https://nodejs.org) 22 or newer
- A MongoDB database: either [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

### 1. Clone the repository

```bash
git clone https://github.com/DeciusWoodson-FS/2606-WDV349-DeciusWoodson.git
```

```bash
cd 2606-WDV349-DeciusWoodson
```

### 2. Set up the API

```bash
cd dev/sovereign-api
```

```bash
npm install
```

```bash
cp .env.example .env
```

Open `.env` and fill it in:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | Your database address, ending in `/sovereign`. For a local database: `mongodb://127.0.0.1:27017/sovereign` |
| `MONGODB_TRANSACTIONS` | `false` for a local database, `true` for Atlas |
| `BETTER_AUTH_SECRET` | A random secret of at least 32 characters. Generate one with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | `http://localhost:4000` |
| `CLIENT_ORIGIN` | `http://localhost:5173` |

Load the skill tree nodes and daily quests into the database, then start the API:

```bash
npm run seed
```

```bash
npm run dev
```

The API runs at `http://localhost:4000`. Visiting `http://localhost:4000/health` should show `{"ok":true}`.

### 3. Set up the frontend

In a second terminal, from the repository root:

```bash
cd dev/sovereign-app
```

```bash
npm install
```

```bash
npm run dev
```

The app runs at `http://localhost:5173`. It connects to the API at `http://localhost:4000` by default. To use a different address, copy `.env.example` to `.env` and change `VITE_API_URL`.

Keep both terminals running while you work. The API restarts on its own when its files change, and the frontend updates in the browser as you save.

### Other commands

| Where | Command | What it does |
|-------|---------|--------------|
| `dev/sovereign-app` | `npm run lint` | Checks the frontend code with ESLint |
| `dev/sovereign-app` | `npm run build` | Builds the frontend for production into `dist/` |
| `dev/sovereign-api` | `npm start` | Runs the API without restarting on changes, as it runs in production |

## Usage

1. Create an account on the Register page, then you'll land on the Dashboard.
2. Open the Skill Tree, select the Standard Pushup, and read its form cues.
3. Once you can perform it, click **Mark as Mastered** to earn XP and unlock the next skills.
4. Check off your daily quests on the Dashboard as you complete them.
5. Track your level, mastered skills, and recent achievements on the Dashboard and Profile.

## Deployment

The Beta is hosted on three services:

- **Frontend:** [Vercel](https://vercel.com), building `dev/sovereign-app`. Its `vercel.json` forwards `/api` requests to the API, so the site and API share one address and the session cookie keeps working.
- **API:** [Render](https://render.com), running `dev/sovereign-api` with `npm start`.
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas).

On Render, `BETTER_AUTH_URL` and `CLIENT_ORIGIN` are both set to the Vercel production address, and `MONGODB_TRANSACTIONS` is `true`. Sign-in only works from that production address. Render's free plan pauses the API when it isn't being used, so the first visit after a quiet period can take up to a minute.

## Project Status

Project is: **Beta.** The core features are complete and deployed, and every test in the [test plan](./docs/TestPlan.md) passes on the live site.

## Room for Improvement

Planned after the Beta, as described in the [Change Order](./docs/ChangeOrder.md):

- The remaining skill tree branches: Pull, Core, Legs, and Dynamics
- An equipment filter (floor, rings, parallettes, pull-up bar) that changes which skills are shown
- Logging hold times before marking a skill as mastered
- Custom daily quests and workout routines
- Profile pictures and display name editing
- Signing in with Google
- Animations for completing quests and leveling up
- Daily quests that reset at the user's local midnight instead of the server's

## Documentation

- [Project Proposal](./docs/ProjectProposal.md)
- [Tech Stack](./docs/TechStack.md)
- [Change Order](./docs/ChangeOrder.md)
- [Test Plan](./docs/TestPlan.md)
- [Research Notes](./docs/research/)
- [Wireframes](./docs/designs/)
- [Weekly Log](./docs/log.md)

## Acknowledgements

- Many thanks to Full Sail University

## Contact

Created by Woodson Decius. Find me on GitHub at [DeciusWoodson-FS](https://github.com/DeciusWoodson-FS).
