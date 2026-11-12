# Project & Portfolio

- **Research Notes - 359 MS 3**
- **Woodson Decius**
- **11.12.2026**

<br>

## Topic - Security, Risk & Innovation

This document contains general notes related to assessing a project's strengths and risks with a SWOT analysis, the most common web application security risks, automated code scanning, and the legal side of creativity and innovation. This research serves as the basis for the Security & Compliance milestone, where Sovereign gets real authentication, protected pages, and input validation.

<br>

## Sub-Topic 1 - SWOT Analysis

Research here was conducted on SWOT analysis, a planning tool that looks at a project's strengths, weaknesses, opportunities, and threats.

# Key findings:

- Strengths and weaknesses are internal, things I can control like my skills and my implementation choices. Opportunities and threats are external, like tech trends, competitors, and security risks. Splitting them this way makes it clear which problems I can fix directly and which ones I can only plan around.

- A SWOT is only useful if it leads to action. The suggested process ends with an action plan (goals, owners, deadlines, and success metrics) and treats the SWOT as a living document that gets reviewed and updated.

### Sovereign's SWOT

- **Strengths:** A distinct visual style inspired by Metaphor, a working core loop (mastering nodes, XP, leveling, and daily quests) running on real data, and a clean API split into routes, controllers, and middleware.
- **Weaknesses:** No real authentication yet, since the API trusts a placeholder `x-user-id` header. Only the Push branch exists for the Beta, it's a solo project with limited time, and the layout isn't built for phones yet.
- **Opportunities:** Calisthenics needs no gym membership, and most fitness RPG apps look alike, so a game-quality skill tree can stand out. The metrics from my R6 notes (activation, retention, drop-off) could guide improvements after the Beta.
- **Threats:** Established fitness and habit apps, security risks once the app is public, and outdated or vulnerable dependencies. This week's font issue also showed a licensing risk: a demo font had been shipping in the app.

**Action from this SWOT:** the biggest weakness, no real authentication, is exactly what this milestone fixes. The dependency threat is addressed in Sub-Topic 4.

<br>

## Sub-Topic 2 - OWASP Top 10

Research here was conducted on the OWASP Top 10, the OWASP Foundation's list of the most critical web application security risks. The current version is the 2025 edition.

# Key findings:

- The 2025 list is: A01 Broken Access Control, A02 Security Misconfiguration, A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection, A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Security Logging and Alerting Failures, and A10 Mishandling of Exceptional Conditions.

- Several of these apply directly to Sovereign right now:
  - **A01 Broken Access Control and A07 Authentication Failures:** anyone can send any `x-user-id` header and act as another user. Replacing that header with a real Better-Auth session is the main goal of this milestone.
  - **A02 Security Misconfiguration:** the API currently allows requests from any website with an open `cors()` call. Once the frontend has a real address, CORS should only allow that origin.
  - **A03 Software Supply Chain Failures:** covered by the dependency audit in Sub-Topic 4.
  - **A05 Injection:** route keys are converted to numbers before they reach MongoDB, which helps, but the new login and registration forms will need proper input validation.
  - **A10 Mishandling of Exceptional Conditions:** the API already has a central error handler that returns a generic message instead of crashing or leaking details, and the frontend shows readable errors when the API is down.

- OWASP also keeps a separate Top 10 for LLM and generative AI applications, led by Prompt Injection and Sensitive Information Disclosure. Sovereign doesn't use AI features, so it doesn't apply yet, but it would matter for a post-Beta idea like an AI coach that suggests the next skill.

<br>

## Sub-Topic 3 - Code Scanning with CodeQL

Research here was conducted on CodeQL, GitHub's code analysis engine for finding vulnerabilities and errors.

# Key findings:

- CodeQL treats code like data. It builds a database from the codebase, then runs queries against it to find problems, and the results show up as code scanning alerts on GitHub. The default queries are open source and maintained by GitHub and the security community.

- JavaScript is supported, which covers both `sovereign-api` and `sovereign-app`. Default setup chooses the languages and triggers automatically, while advanced setup adds a workflow file that can be customized.

- Code scanning, secret scanning, push protection, and dependency review are available by default for public repositories, and my repository is public. Dependabot alerts are available on every plan. Private repositories would need a paid GitHub product for most of these, so Sovereign can use the full set for free as long as the repository stays public.

<br>

## Sub-Topic 4 - Alternatives to CodeQL

Research here was conducted on other tools that provide similar code scanning and dependency checking.

# Key findings:

- **Semgrep:** Uses readable, pattern-based rules that developers can write themselves. Its free plan covers code scanning and dependency scanning for up to 10 contributors and 10 private repositories, and the command-line tool is available on the free tier. It's lighter than CodeQL, which makes it good for quick custom rules but less thorough at tracing bugs across files.
- **Snyk:** Covers code scanning, open source dependencies, infrastructure, and containers. The free plan has monthly test limits (100 Snyk Code tests a month) and 5 projects, and it integrates with code editors.
- **SonarQube:** The Community Edition is free and focuses on code quality as well as security. Custom rules are possible but harder to write than Semgrep's, and its commercial editions are priced separately.
- **npm audit:** Built into npm and free. It doesn't scan my own code, but it checks every installed package against known vulnerabilities, which covers the supply chain risk from Sub-Topic 2.

### Running npm audit on Sovereign

I ran `npm audit` on both projects:

- **sovereign-api:** 2 vulnerabilities (1 high, 1 moderate), both in packages that Express depends on: `body-parser` and `qs`. Both are denial-of-service issues, and since they run on the live server, they should be fixed by updating Express's dependencies.
- **sovereign-app:** 12 vulnerabilities (7 high, 5 moderate), mostly in development tools like ESLint, Vite, and PostCSS. These run on my computer during development rather than in the user's browser, so the risk is lower, but they should still be updated.

**How this affects my plans:** I'll turn on CodeQL default setup and Dependabot alerts on the GitHub repository since they're free for public repos, and fix the API's `npm audit` findings during this milestone. Semgrep is a good backup if the repository ever becomes private.

<br>

## Sub-Topic 5 - Creativity & Innovation

Research here was conducted on the Electronic Frontier Foundation's Creativity & Innovation issues, focusing on fair use and intellectual property.

# Key findings:

- The EFF argues that copyright, patents, and trademarks are meant to balance rewarding creators with the public's ability to build on their work, and that limits like fair use keep that balance. They believe the system has drifted, with unproven infringement claims silencing lawful work and weak patent lawsuits threatening small companies.

- This applies to Sovereign in two ways. First, the design is inspired by Metaphor: ReFantazio. Taking inspiration from a game's style is normal, but copying its actual art, logos, or assets would not be, so all of Sovereign's art needs to be my own, like the hand-drawn images planned for the login and register pages.

- Second, this week showed that licensing matters even for small details. The Juana font in the app turned out to be a demo version, which is meant for testing, not for a public app. I replaced it with Abril Fatface, which uses the SIL Open Font License, and I still need to confirm the license for the Frontage font before the Beta goes public.

<br>

## Reference Links

**Resource 1: Title**  
[What is a SWOT Analysis?](https://www.figma.com/resource-library/what-is-a-swot-analysis/)

**Resource 2: Title**  
[OWASP Top Ten](https://owasp.org/www-project-top-ten/)

**Resource 3: Title**  
[OWASP Top 10 for LLMs & Gen AI Apps](https://genai.owasp.org/llm-top-10/)

**Resource 4: Title**  
[About Code Scanning with CodeQL](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning-with-codeql)

**Resource 5: Title**  
[GitHub Security Features](https://docs.github.com/en/code-security/getting-started/github-security-features)

**Resource 6: Title**  
[Semgrep Pricing](https://semgrep.dev/pricing)

**Resource 7: Title**  
[Snyk Plans](https://snyk.io/plans/)

**Resource 8: Title**  
[Semgrep vs CodeQL vs SonarQube Comparison](https://reintech.io/blog/semgrep-vs-codeql-vs-sonarqube-static-analysis-comparison)

**Resource 9: Title**  
[EFF - Creativity & Innovation](https://www.eff.org/issues/innovation)

**Resource 10: Title**  
[EFF - Intellectual Property](https://www.eff.org/issues/intellectual-property)

<br>

**Note:**

Of the research conducted this week, I found the OWASP Top 10 and the dependency audit to be the most insightful. Mapping the list onto Sovereign showed that my biggest risk, the placeholder user ID, sits at the top of the list as Broken Access Control, which confirms that authentication is the right priority for this milestone. Running `npm audit` was also eye-opening. I hadn't added any risky code myself, but the packages I depend on still had 14 known vulnerabilities between the two projects, which is exactly what OWASP means by supply chain failures. Turning on free tools like CodeQL and Dependabot will help me catch these problems as they happen instead of finding them by accident.
