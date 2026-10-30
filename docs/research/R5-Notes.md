# Project & Portfolio

- **Research Notes - 359 MS 1**
- **Woodson Decius**
- **10.30.2026**

<br>

## Topic - Project Discovery & The Business Case

This document contains general notes related to project discovery, evaluating whether an idea is worth building, and pitching it clearly. This research serves as the basis for re-confirming Sovereign's scope, writing a change order, and preparing for a "Kick Off" before backend development begins.

<br>

## Sub-Topic 1 - The Discovery Process

Research here was conducted on the Discovery phase of software development, and the key questions that should be answered before a single line of code is written.

# Key findings:

- Discovery is about answering the high-level questions first: where the idea came from, what has already been tried, who benefits most, and what's on the horizon. Knowing future features ahead of time matters because they shape architecture decisions now. For Sovereign, knowing that real authentication and equipment-based adaptation are coming affects how the User model and routes are structured today.

- Success needs to be measurable. Ranking the core objectives, prioritizing features to fit them, and defining what "it worked" looks like keeps a project from overcommitting. Just as important is asking what failure looks like and who could be negatively impacted on release, which surfaces risks early when they're cheaper to fix.

- Technical and compliance questions belong in Discovery too: deployment, who owns third-party accounts, long-term maintenance, and requirements like accessibility or data privacy are much harder to bolt on later.

<br>

## Sub-Topic 2 - Evaluating an Idea

Research here was conducted on how the industry evaluates startup ideas, using Jared Friedman's (Y Combinator) Startup School talk as the starting point.

# Key findings:

- The most common mistake is building a "solution in search of a problem", starting from something cool rather than a real, painful problem. Other traps are "tarpit" ideas that look easy but have failed repeatedly, jumping on the first idea without evaluating it, and waiting forever for the perfect one.

- Good ideas can be checked against a set of questions: Is the founder well suited to it? Is the problem painful with no good existing fix? Would you or people you know use it? Has something recently changed that makes it possible now? Would you want to work on it for years?

- Competition isn't automatically a bad sign. An existing market proves there is demand, and what matters is having a distinct insight the competitors are missing.

<br>

## Sub-Topic 3 - The 30-Second Pitch

Research here was conducted independently on the "elevator pitch", the concept of explaining a project clearly in roughly 30 seconds (about 75 words).

# Key findings:

- A strong pitch generally follows a simple structure: a hook, the problem, the solution, what makes it different, and a closing that invites a follow-up conversation rather than a hard ask.

- Clarity is the real test. If an idea can't be explained in two or three plain sentences without jargon, it's a sign the goals aren't clear enough yet and more planning is needed.

- It helps to keep a few versions ready: a one-line tagline, the 30-second pitch, and a longer version for when there's time to go into detail.

### Sovereign's Pitch

**Tagline:** Sovereign turns bodyweight training into an RPG skill tree.

**30-Second Pitch:** Most fitness apps are built around adding weight to a bar, but calisthenics athletes progress by mastering harder movements, like going from a pushup to a full planche. Those apps can't track that, so athletes end up juggling YouTube videos and notes. Sovereign turns that progression into a game-style skill tree: you master a skill, earn XP, level up, and unlock the next one, alongside daily quests that build habits. Ever wanted your training to feel like leveling up a character?

<br>

## Sub-Topic 4 - Building a Business Case

This section applies the research above to Sovereign, as a business case for continuing it into a Beta.

# Key findings:

- **The problem is real and specific:** Popular trackers like Strong and Hevy are built around external weight, while calisthenics progress is measured in leverage and skill progressions. My primary research from the proposal (conversations with bodyweight athletes at my gym) supports this, and a crowded fitness-app market shows demand exists. Sovereign's insight is the progression structure, not just the logging.

- **I'm well suited to build it:** I have direct access to the target audience through my gym, and the gamified, anime-inspired direction comes from games I know well, like Final Fantasy, Kingdom Hearts, and Metaphor. That covers the "would you or people you know use it" test and the "work on it for years" test.

- **Success has to be measurable:** For the Beta, success looks like a user being able to complete a daily quest, master a skill, and see new nodes unlock. Longer term it means retention, such as how many users come back weekly and keep advancing nodes.

- **Failure and risk:** The biggest risks are scope creep (too many features before the core loop is solid) and user safety, since advanced holds like the planche can cause injury if attempted too early. Prerequisite-locked progressions directly address that second risk, and real authentication is required before any user data can be trusted.

<br>

## Reference Links

**Resource 1: Title**  
[The Principles of Project Management - Getting Started](https://learning.oreilly.com/library/view/the-principles-of/9780980285864/Text/ch02.html)

**Resource 2: Title**  
[Discovery: Can You Answer Software's Key Kickoff Questions?](https://envylabs.com/insights/software-development-discovery-process/)

**Resource 3: Title**
[How to Get and Evaluate Startup Ideas - Jared Friedman, Y Combinator](https://www.youtube.com/watch?v=Th8JoIan4dg)

**Resource 4: Title**
[How to Write an Elevator Pitch](https://www.startupsavant.com/write-an-elevator-pitch)

<br>

**Note:**

Of the research conducted this week, I found the Discovery questions and the idea evaluation talk to be the most insightful. Last month I focused heavily on the look and feel of Sovereign, and going through these questions made me step back and ask whether the core loop of mastering a skill, earning XP, and unlocking the next node actually holds up on its own. Writing the 30-second pitch was a good test of that. Being able to explain Sovereign in a few sentences tells me the idea is clear, and it reinforced my decision to focus this month on building the backend that powers that loop before adding new features.
