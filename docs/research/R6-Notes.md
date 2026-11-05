# Project & Portfolio

- **Research Notes - 359 MS 2**
- **Woodson Decius**
- **11.04.2026**

<br>

## Topic - Metrics, Validation & Agile Planning

This document contains general notes related to validating an idea in development using metrics, A/B testing, and use case testing, as well as planning work with Agile techniques. This research serves as the basis for deciding how to measure whether Sovereign is working, and how to test it as the frontend and backend come together.

<br>

## Sub-Topic 1 - The Story Behind Success

Research here was conducted on Google Marketing Platform's success stories, looking at how companies use analytics and measurement tools to validate ideas and drive results.

# Key findings:

- The pattern across these case studies is that results come from measuring real user behavior, not from guessing. None of the case studies are fitness related, but the closest to Sovereign are the app-focused ones. McDonald's Hong Kong used Google Analytics 4 in its app and reported a 550% increase in in-app orders.

- Measurement doesn't have to be a big-company effort. 412 Food Rescue, a nonprofit, cut its reporting time in half with Google Analytics, which shows that even a small team benefits from having its key numbers in one place.

- BookIt focused on moving new users through its funnel, and that strategy applies directly to Sovereign. My funnel would be: a user registers, completes a first daily quest, masters a first node, and comes back the next week. Tracking where users drop off would show me which step needs work.

<br>

## Sub-Topic 2 - A/B Testing

Research here was conducted on A/B testing, comparing two versions of a page or feature with randomly split groups of users to see which performs better against a chosen metric.

# Key findings:

- What to test and why matters as much as how. Every test should start with a clear problem, a hypothesis, and a goal metric. Testing without a hypothesis is one of the most common mistakes, along with ending a test too early and relying on a single metric.

- Results need enough users to be trusted. A difference should be statistically significant (typically at a 95% confidence level), and it also has to be large enough to be worth the cost of the change. Small samples can be misleading.

- For Sovereign, a good first test would be the dashboard's center space: does showing the next available skill lead more users to open the Skill Tree than a plain button? A small Beta won't have enough users for a statistically reliable result, so early on I would treat this as direction and pair it with direct feedback, then run a proper test once there are more users.

<br>

## Sub-Topic 3 - Use Case Testing

Research here was conducted on use cases and use case testing, a black-box technique for checking that users can complete their goals in an application.

# Key findings:

- A good use case focuses on what the user does and sees, not on what happens inside the system. It includes a short description, actors, preconditions, a main flow, alternate flows, exception flows, and postconditions. My original use cases only covered the main flow, so they were missing what happens when something goes wrong.

- Test cases come straight from the use case. Each step becomes a test step, and the expected result is what the user should be able to see or do. Testing starts with the main flow, then moves on to the alternate and exception flows. It can reveal missing requirements, but it doesn't prove overall quality on its own.

### Sovereign's Use Case: Mastering a Skill Node

This updates Use Case 2 from my proposal to match the Change Order, which removed hold-time entry for the Beta.

- **Actor:** A logged-in user
- **Preconditions:** The user is on the Skill Tree page, and the API is running.
- **Main Flow:** The user selects an available node, the detail panel opens, and the user clicks "Mark as Mastered".
- **Postconditions:** The node shows as mastered, XP and level update, and any newly unlocked nodes become available without a page reload.
- **Alternate Flow:** The user selects a locked node. The panel shows its details, but the node can't be mastered yet.
- **Exception Flows:** The node's prerequisites aren't met, the node is already mastered, or the API can't be reached. In each case the user sees a readable message and their progress doesn't change.

<br>

## Sub-Topic 4 - Your First Plan

Research here was conducted on Agile planning from The Agile Samurai, focusing on how a first project plan is built and how a team tracks its progress against it.

# Key findings:

- A plan starts with a master story list: the features the customer wants, prioritized by the customer and estimated by the team. My GitHub Project Board, Milestones, and Issues serve this same purpose for Sovereign.

- Velocity is how much a team actually finishes each iteration, and a burndown chart makes that visible, with the slope of the line showing the team's velocity. That means plans can be based on real numbers rather than hope.

- Applying this to my own work, I finished 6 tasks in Milestone 1 and have 11 listed for Milestone 2. That's nearly double my last velocity, so the lowest priority items, like the profile page, may need to move to the next milestone.

<br>

## Sub-Topic 5 - Metrics for Sovereign

This section applies the research above to Sovereign, defining what I would measure once real users are in the application.

# Key findings:

- **Activation:** The percentage of new users who complete a first daily quest and master a first node. This shows whether the core loop is clear to someone new.

- **Retention:** How many users come back the next week. This is the most important number for Sovereign, since calisthenics progress is slow and the application only works if people stick with it.

- **Engagement:** Daily quests completed per user and nodes mastered per week. These show whether the gamification is actually motivating people.

- **Drop-off:** Which node users stall on the longest. This could point to a progression that is too big of a jump, which would be useful for improving the skill tree itself.

Much of this can come from data the API already stores, such as mastered nodes and level. Adding an analytics tool like Google Analytics would be a post-Beta decision, and it would need to be disclosed in a privacy policy.

<br>

## Reference Links

**Resource 1: Title**  
[The Story Behind Success](https://marketingplatform.google.com/about/resources/success-stories/)

**Resource 2: Title**  
[A/B Testing](https://www.browserstack.com/guide/a-b-testing)

**Resource 3: Title**
[Use Cases](https://www.softwaretestinghelp.com/use-case-testing/)

**Resource 4: Title**
[Your First Plan](https://learning.oreilly.com/library/view/the-agile-samurai/9781680500066/f_0056.html)

<br>

**Note:**

Of the research conducted this week, I found use case testing and the Agile planning material to be the most insightful. Rewriting my use case showed me that I had only planned for things going right, while the backend already has to handle things going wrong, like unmet prerequisites. Those exception flows give me a clear way to test the Skill Tree as I connect it to the API this week. Looking at velocity was also a reality check. Comparing what I finished last milestone to what I've planned for this one made it clear I need to prioritize the core loop first, and be ready to move lower priority work if needed.
