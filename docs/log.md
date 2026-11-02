# Log ...🚀

# Project & Portfolio

### Woodson Decius

![Degree Program](https://img.shields.io/badge/degree-web%20development-blue.svg)&nbsp;

<br>

## 📢 &nbsp; Weekly Stand Up

Each week I will summarize my milestone activity and progress by writing a stand-up. A stand-up is meant to be a succinct update on how things are going. Use these prompts as a guide on what to write about:

⚙️ Overview - What I worked on this past week
<br>
🌵 Challenges - What problems did I have & how I'm addressing them
<br>
🏆 Accomplishments - What is something I "leveled up" on this week
<br>
🔮 Next Steps - What I plan to prioritize and do next

<br>

### Week 1

⚙️ Overview - What I worked on this past week: This week I worked on setting up enviornment on GitHub, and conducting research for my application, techstack, and general workflow.
<br>
🌵 Challenges - What problems did I have & how I'm addressing them: One thing I stuggled with was adopting the new workflow and getting everything set up. It was first time setting up a proper project board as well as issues connected to said project board, from here, I'll be doing a bit more reading on git workflows and industry standards.
<br>
🏆 Accomplishments - What is something I "leveled up" on this week: I believe getting everything set up as well as getting the project board and issues set up is an accomplishment. So far everything is organized and laid out, I have a good feel for how to proceed.  
<br>
🔮 Next Steps - What I plan to prioritize and do next: Next week will be focused on branding and design, I'll creating a custom wireframe to get an idea of what I want the application to look like.

### Week 2

⚙️ Overview - What I worked on this past week: This week I worked on my figma wireframe for Sovereign as well as researching and discovering my own brand and how to make my application stand out amongst the sea of RPG like gym applications.
<br>
🌵 Challenges - What problems did I have & how I'm addressing them: The biggest issue I faced so far this week was actually discovering my own brand and design for the app. After looking at similar applications in the space, I found that a lot of the RPG apps look similar. The use simple round buttons and basic animations for leveling up. I want to make my application more visually stunning and immersive, the issue was finding out "how" I would do so and what aesthetic I would use. I"m rectifying this by looking for more inspiration across games aand find what works best.
<br>
🏆 Accomplishments - What is something I "leveled up" on this week: Aside from doing the research on wireframing and structure, I dont't feel as though I accomplished much this week, all things considered.
<br>
🔮 Next Steps - What I plan to prioritize and do next: Next is to create the front-end of the application itself and slowly refine the aesthetics of the application over time, the rest of this month will solely be focused on creating the front-end as well as pages for the sign up/login screens.

### Week 3

⚙️ Overview - What I worked on this past week: This week I worked on creating the basic frontend for Sovereign. I created the login page, registration page, and a mock dashboard that will become more dynamic once the backend is created.
<br>
🌵 Challenges - What problems did I have & how I'm addressing them: The main issues I faced this week was figuring out how to get my unique styles to work properly. Getting the lines to extend past the limits of the text boxes and adding the hovering crosshair proved more difficult than I expected, but it turned out far better than I expected.
<br>
🏆 Accomplishments - What is something I "leveled up" on this week: Managing to get everything looking good so far. Next week will be the real challenge as I'll be working on the skill tree and it's basic functions.
<br>
🔮 Next Steps - What I plan to prioritize and do next: Next week will be finishing off the skill tree page and refining the smaller details. If there's time, I plan to draw out and work on the profile page.

### Week 4

⚙️ Overview - What I worked on this past week: This week I finalized the bsic appearance of the skill tree page and used static data to show what the function of the skill tree itself would be like in daily use. It definitely isn't the final product, but, I'm still happy it turned out as well as it did.
<br>
🌵 Challenges - What problems did I have & how I'm addressing them: The biggest challenge I faced this week was creating the skill tree itself, as well as the hexagon nodes. I did a lot of research and experimentation to get everything as close to my vision as possible. Refinements still need to be made, but for now, I can move forward.
<br>
🏆 Accomplishments - What is something I "leveled up" on this week: Creating the Skill Tree and making it draggable on the screen was definitely a great accomplishment for me. I want Sovereign to feel like a true gamified workout application. Often in most games like Final Fantasy, Kingdom Hearts, and Metaphor (the game that inspired the aesthetics of Sovereign), players are usually able to pan around the skill trees and nodes in order to focus in on a skill and read the descriptions. I wanted to give Sovereign users that same ability, so I focused on implementing that feature while creating the page.
<br>
🔮 Next Steps - What I plan to prioritize and do next: Next I plan to refine the pages and styling. I'd like to fill the empty spaces on the dashboard as opposed to having just a button leading to the skill tree. I'd also like to add a customizable profile page for users. I'd also like to start working on the backend and look at deployment on Vercel.

<br>

### Week 5

⚙️ Overview - What I worked on this past week: This week I kicked off the new month by revisiting Sovereign's scope. I researched the Discovery process, how to evaluate an idea, and the 30-second pitch, then used that to write a business case and a pitch for Sovereign in my R5 notes. From there I wrote a Change Order confirming the Beta scope, and updated my project with Table, Roadmap, and Board views. Once the planning was done, I started the backend: I scaffolded the sovereign-api with Express and a health check, connected it to MongoDB, added error handling, created the Node and Quest models with seed data, and built the skill tree routes that handle node status, prerequisite unlocks, XP, and leveling.
<br>
🌵 Challenges - What problems did I have & how I'm addressing them: The biggest challenge was deciding what to cut. Going back through my proposal, I realized features like the equipment filter and the full five-branch skill tree were too much for a Beta, so I moved them to post-Beta and focused on the Push branch and the core loop. I also found my Tech Stack doc no longer matched the code (TanStack Router, Zustand, and TanStack Query were never installed), so I documented those changes in the Change Order. Real authentication also isn't in place yet, so the API uses a clearly flagged placeholder user ID until Better-Auth is integrated in the Security & Compliance milestone.
<br>
🏆 Accomplishments - What is something I "leveled up" on this week: Getting the skill tree's core logic working on the backend. Mastering a node now checks its prerequisites, awards XP, handles level-ups, and returns the nodes it unlocks, and the Full Planche only opens up after all three of its prerequisites are mastered. I also kept the work in small, focused commits and separated the API into routes, controllers, and middleware, which made each piece easier to test and review before merging it into dev.
<br>
🔮 Next Steps - What I plan to prioritize and do next: Next week I'll build the daily quest routes and connect the Dashboard and Skill Tree to the API so they show real progress instead of static data. I'll also start on the profile page, fill the empty space on the dashboard, and switch to URL-based routing with React Router to prepare for protected pages once authentication is added.
