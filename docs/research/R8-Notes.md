# Project & Portfolio

- **Research Notes - 359 MS 4**
- **Woodson Decius**
- **11.17.2026**

<br>

## Topic - Clean Code, Organization & Finishing Well

This document contains general notes related to writing clean code, organizing CSS, prioritizing the last stretch of a project with the 80/20 rule, and writing useful comments. This research serves as the basis for the Beta release, where Sovereign gets deployed, cleaned up, and documented for future employers and developers.

<br>

## Sub-Topic 1 - Writing Clean Code

Research here was conducted on Chapter 1 of Clean Code by Robert C. Martin, which explains what clean code is and why it matters.

# Key findings:

- Bad code slows everything down over time. The chapter's section on "the total cost of owning a mess" describes how every quick, messy change makes the next change harder, until a team spends most of its time working around the mess instead of building features. Putting off cleanup rarely works, because "later" usually turns into never.

- Developers are authors. We spend far more time reading code than writing it, so code should be written for the next person who reads it, which is often our future self.

- The Boy Scout Rule: leave the code a little cleaner than you found it. Small improvements every time you touch a file keep a codebase from slowly rotting, without needing a big rewrite.

- Applying this to Sovereign, a few spots don't meet that standard yet:
  - The XP percentage calculation is copied into three pages.
  - The menu button and header markup are repeated across the Dashboard, Skill Tree, and Profile pages.
  - The Login and Register forms repeat the same input styling seven times.

  Each of these should live in one place, so a future change only has to be made once.

<br>

## Sub-Topic 2 - Organizing CSS

Research here was conducted on MDN's guide to organizing CSS as a codebase grows.

# Key findings:

- Consistency matters more than any single rule. Pick one naming style, one color format, and one indentation style, and stick to them. Formatting one property per line and grouping styles from general to specific (base styles, utilities, sitewide layout, then individual components) makes a stylesheet easy to scan.

- Comment the decisions that aren't obvious and use searchable section headings. Avoid overly specific selectors, because a simple reusable class like `.box` is easier to work with than `article.main p.box`.

- Methodologies like BEM, OOCSS, SMACSS, and ITCSS give structure to large projects, but they can be overkill for small ones. Tools like Sass and native CSS custom properties let a value like a color be changed in one place.

- Applying this to Sovereign: most styling uses Tailwind's utility classes, and my custom styles in `index.css` are already grouped into sections like fonts, typography, and Metaphor-inspired UI elements. A review turned up three things to clean up:
  - The `.clip-star` class is never used.
  - A Tailwind class on the login background is mistyped as `rotate-25]`, so that rotation never applies.
  - My colors, like the blue title and the green XP bar, are repeated as raw values throughout the pages. Defining them once as theme colors would make the look consistent and easy to change.

<br>

## Sub-Topic 3 - The 80/20 Rule

Research here was conducted on the Pareto principle, which says roughly 80% of results come from 20% of the causes.

# Key findings:

- The idea comes from economist Vilfredo Pareto, who noticed in 1896 that about 20% of the population owned 80% of the land in Italy. In software, a common example is that 80% of crashes come from 20% of the reported bugs.

- It's a pattern, not an exact formula, and it doesn't mean 20% of the effort is enough. It means finding the work with the biggest impact and putting full effort into that. The risk is neglecting important tasks that don't seem urgent, which timeboxing can help prevent.

- Applying this to my Beta milestone, the highest-impact 20% is getting Sovereign deployed and making sure sign-in, the Skill Tree, and daily quests work on the live site. If those fail during the showcase, nothing else matters. Polish like animations comes after that. Deployment is also where new problems are most likely, such as session cookies across domains and page refreshes on Vercel, so I'm doing it first to leave time to fix them.

<br>

## Sub-Topic 4 - Writing Comments

Research here was conducted on Refine's guide to code comments, including what makes a comment helpful and which comments do more harm than good.

# Key findings:

- Good comments explain **why**, not **what**. They capture context the code can't show, explain trade-offs so nobody "optimizes" away a deliberate choice, and warn about non-obvious constraints. If a comment is needed to explain what every line does, the code should be renamed or rewritten instead.

- Bad comments include redundant ones that repeat the code, commented-out code (Git already keeps the history), and "zombie" comments that are no longer true. The article also points out that AI-generated comments tend to describe what code does rather than why, so they should be trimmed down to the useful parts.

- Applying this to Sovereign: most of my backend comments explain a reason, like why the auth handler has to come before `express.json()`, or why a user's progress is created with a single atomic operation. Reviewing the code still turned up a few to fix:
  - A **zombie comment** in `seed.js` says the node data mirrors the hardcoded arrays in the Skill Tree page. Those arrays were removed when the Skill Tree was connected to the API, so the comment is now wrong.
  - The comment at the top of `AuthLayout.jsx` has typos and describes images that are still placeholders.
  - Some JSX comments, like "Email Input" above the email input, only repeat what the code already says.

<br>

## Reference Links

**Resource 1: Title**  
[Clean Code - Chapter 1](https://learning.oreilly.com/library/view/clean-code-a/9780136083238/chapter01.xhtml#ch1lev1sec1)

**Resource 2: Title**  
[Organizing your CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Organizing)

**Resource 3: Title**  
[The Pareto Principle (80/20 Rule)](https://asana.com/resources/pareto-principle-80-20-rule)

**Resource 4: Title**  
[Code Comments](https://refine.dev/blog/code-comments/)

<br>

**Note:**

Of the research conducted this week, I found the clean code and comment research to be the most insightful. Going back through my own code with fresh eyes, I found a comment that had quietly become wrong, a CSS class that never worked because of a typo, and the same logic copied into several pages. None of these break the app, but they're exactly what a future employer or teammate would notice first. The 80/20 rule also helped me plan this final milestone. Getting the app deployed and the core features working on the live site comes first, and the cleanup and polish fill the time that's left.
