# Change Order

- **Sovereign: Calisthenics Engine**
- **Woodson Decius**
- **10.30.2026**

<br>

This document reviews the original scope of work from WDV349 ([Project Proposal](./ProjectProposal.md) and [Tech Stack](./TechStack.md)), estimates the work remaining, and proposes changes to the scope for the Beta release at the end of this month.

<br>

## 1. Scope Confirmation

The Project Proposal and Tech Stack documents still summarize the core of Sovereign: a gamified calisthenics tracker built around an RPG-style skill tree, where users master bodyweight progressions, complete daily quests, earn XP, and level up. The target market, persona, problem statement, pain points, and competition are unchanged, and the research from R5 reinforced that the problem is real and the core loop is worth building.

The following parts of the original scope are **confirmed** for the Beta:

- **Interactive Skill Canvas:** a pannable skill tree where locked nodes stay grayed out until their prerequisite nodes are mastered.
- **Daily Quest Tracker:** a dashboard checklist of daily quests that award XP toward the user's level.
- **Slide-Out Skill Panel:** clicking a node opens a detail panel with the movement name, target muscles, description, and its locked / available / mastered status.
- **Sovereign REST API:** Node.js and Express handling prerequisite checks, XP, and leveling, stored in MongoDB with Mongoose. As described in the Tech Stack, the API will separate routes, controllers, and middleware.
- **Better-Auth:** real registration, login, and protected API routes using the MongoDB adapter.
- **Design:** the high-contrast, anime and RPG-inspired interface built with React, Vite, and Tailwind CSS.

<br>

## 2. Work Remaining

**Completed (WDV349):**

- Figma wireframes and visual direction
- Login and Register pages (UI only, no authentication yet)
- Dashboard UI with level/XP display and daily quests (static data)
- Skill tree page with draggable panning, hexagon nodes, connections, and a detail panel (static data, Push branch only)

**Remaining for the Beta:**

| Area                                                                        | Status                  | Rough Estimate         |
| --------------------------------------------------------------------------- | ----------------------- | ---------------------- |
| Backend API (server, MongoDB, models, seed, skill tree and quest routes)    | Drafted, not yet merged | ~15% of remaining work |
| Connect the Dashboard and Skill Tree to the API                             | Not started             | ~15%                   |
| Authentication with Better-Auth (Login, Register, protected routes, logout) | Not started             | ~25%                   |
| URL-based routing                                                           | Not started             | ~5%                    |
| Profile page and filling the dashboard's empty space                        | Not started             | ~15%                   |
| Deployment (Vercel frontend, hosted API, MongoDB Atlas)                     | Not started             | ~15%                   |
| Testing, accessibility, and polish                                          | Ongoing                 | ~10%                   |

Overall, I estimate the project is roughly **35% complete**, with about **65% of the work remaining**. Most of the visual design is done; most of the remaining work is the backend, authentication, and deployment. The plan by milestone:

1. **Project Discovery:** change order, project views, and the core API (server, models, seed data, skill tree routes)
2. **Application Design:** daily quest routes, connecting the frontend to the API, profile page, and dashboard layout
3. **Development (Security & Compliance):** Better-Auth, protected routes, input validation, and replacing the placeholder user ID
4. **Delivery (Beta):** deployment, testing, and the Beta presentation

<br>

## 3. Proposed Changes

**1. Equipment-Reactive Filter moved to post-Beta**
The equipment toggle (floor, rings, parallettes, pull-up bar) changes which nodes are shown, which means every node needs equipment data and every branch needs an alternate path. That adds a lot of content and logic before the core loop is proven. For the Beta, every user sees the same tree. The filter will be added after the Beta, once the tree structure is stable.

**2. Skill tree limited to the Push branch for the Beta**
The original scope lists Push, Pull, Core, Legs, and Dynamics. The Beta will ship the complete Push branch (8 nodes, ending in the Full Planche apex node), with the Pull branch as a stretch goal. The remaining branches will be added after the Beta. Because nodes are stored as seed data in MongoDB, new branches can be added without changing the frontend.

**3. Simplified mastery and quests**
In Use Case 2, the user enters a hold time before marking a node as mastered. For the Beta, mastering a node will be a single "Mark as Mastered" action that checks prerequisites and awards XP. Hold-time logging is moved to post-Beta. Daily quests will also be a fixed set of four quests that reset every day, and custom user-created habits are moved to post-Beta. The "Equip to Routine" action in the skill panel is also moved to post-Beta, since routines aren't part of the Beta.

**4. New: Profile page and dashboard improvements**
A profile page is being added to the scope, showing the user's display name, level, XP, and mastered skills, with basic customization like a display name and profile picture. The dashboard's empty center space will be filled with progress information (such as nodes mastered and next available skill) instead of only a button to the skill tree.

**5. Tech stack changes**

- **TanStack Router replaced with React Router:** TanStack Router was chosen mainly for its type-safe routing, but Sovereign is written in JavaScript, not TypeScript, so that benefit doesn't apply. React Router is simpler and well documented, and real URL routes are needed for protected pages once authentication is added. Navigation currently uses a `useState` route switcher.
- **Zustand removed:** Zustand was planned for global client state like the equipment toggle. With the equipment filter moved to post-Beta, there isn't enough shared client state to justify another library.
- **TanStack Query moved to post-Beta:** for the Beta, the frontend will use a small `fetch`-based API client with loading and error states. TanStack Query can be added later if caching and background refetching become necessary.
- **Temporary placeholder user ID:** until Better-Auth is integrated in the Security & Compliance milestone, the API will identify users with a clearly flagged placeholder `x-user-id` header. This is for development only and will be removed before the Beta.
- **Deployment added:** the frontend will be deployed on Vercel and the database hosted on MongoDB Atlas. The API host (such as Render or Vercel Functions) will be decided in the Delivery milestone.
