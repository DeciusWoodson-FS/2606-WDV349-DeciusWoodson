# [Sovereign: Calisthenics Engine]

## Application Definition Statement

_A clear high-level summary should be used to introduce the concept. This should be similar to an elevator pitch or a conversational reply to "What are you building?”. You will explore the audience and their demographics, the problem they are having, and your solution in subsequent sections in more detail but touch on them here._

_Clarity over quantity should be the focus, to that end, creating visuals/charts to explain the more complex data or logical points could help to reinforce your Application’s Definition Statement._

Sovreign is a gamified, fullstack fitness application built specifically for bodyweight and calisthenics athletes who find traditional weightlifting trackers inadequate. Instead of tracking arbitrary numbers or weight plates, Sovereign transforms bodyweight mastery into a visual, interactive role-playing game (RPG) skill tree. Users create accounts to track their progress across core disciplines (Push, Pull, Core, Legs, and Dynamics), logging daily workouts and holistic habits to earn experience points, level up, and unlock advanced progression nodes (e.g., advancing from a Planche leans to a Tuck Planche). Designed with striking, high-contrast anime-inspired user interface using React and Tailwind CSS, the platform will dynamically adapt depending on the user's available equipment, such as gymnastic rings, a pull-up bar, parallettes, and so on. This offers a structured, rewarding and customizable approach to bodyweight training.

## Target Market

_Using Primary and Secondary research, describe the people most likely to be utilizing your application. What are their ages, education level, employment sector, income level, hobbies, or any other defining characteristics that set them apart from other groups of people? Identifying specific groups will help drive application design choices._

_Primary Research is research that you have conducted yourself and is not based on secondary sources. Examples of Primary Research include surveys, interviews, and focus groups. This doesn't have to be formal in nature and can include discussions you have with individuals that are likely users of your application. Secondary Research is research that has been conducted by others and is based on their findings. Examples of Secondary Research include market research reports, industry publications, and news articles._

The target market for Sovereign consists of fitness enthusiasts, street workout practitioners, and calisthenics athletes aged 16 and up. This demographic heavily overlaps with students, adults who wish to start calisthenics or already have experience, and gamers who naturally resonate with gamification mechanics, RPG leveling systems, and stylized anime/gaming aesthetics.

**- Primary Research**: Informal discussions with bodyweight practitioners from my local gym highlighted a consistent frustration: mainstream fitness apps like Strong, Hevy, and Liftoff are built exclusively around tracking external weights (e.g., adding 5 lbs to a barbell) and fail to capture the progression of bodyweight exercises, which rely on shifting leverage and mastering static holds like the Planche and Front Lever.

**- Secondary Research**: Market trends show a surge in home-based, minimal-equipment workouts as gym memberships can be rather costly, alongside a demand for gamified productivity and lifestyle applications such as [Habitica](https://habitica.com/static/home). Calisthenics althletes represent a dedicated subculture within fitness that relies heavily on digital communities, YouTube tutorials, and specific progression lists, yet lacks unified, interactive logging infrastructure.

## User Profile / Persona

_User profiles are a snapshot of an actual person and helps to open a window into the mind of an actual user and will provide insight while tailoring and refining interaction details to best fit your ideal users within your Target Market._

Name: Leo Vane

Age: 24

Occupation: Medical Student

Hobbies: Anime, fighting games, physical training, Cave diving.

Goals: Master advanced bodyweight skills like the muscle-up and the full planche while working out primarily from a home setup.

Frustrations: Tired of using generic note-taking apps or spreadsheets to track hold times and exercise variations. Finds existing fitness apps completely irrelevant to bodyweight training and boring to look at. Wants a system that makes the slow, grueling grind of calisthenics progression feel visually rewarding and clearly mapped out.

## Use Cases

_A 'Use Case' describes how a user may interact with your application. It provides a series of steps to reach a desired result. If a user wants to listen to some music during a workout, how many clicks would it take to do that? Begin with a simple question like that and then map out the different steps to reach the desired goal. Use cases help us think through how our application will be used._

_Use Cases help drive design decisions as well as testing procedures. During development we regularly test and confirm the work in progress matches up with our Use Cases. This provides valuable insight into how our application is addressing the needs of the user and allows us to correct missteps early. This [article](https://www.softwaretestinghelp.com/use-case-testing/) gives additional background Use Cases and Use Case Testing._

Use Cases
Use Case 1: Checking Off a Daily Quest (Logging a Workout)
Goal: A user wants to log their daily routine and complete their "Daily Quest."

Steps:

- User logs into Sovereign and land directly on their Dashboard.

- The user views their active daily template (e.g., an intense bodyweight routine tracking physical sets, hitting a daily protein goal, or a cold shower habit).

- The user executes their training session, tapping checkboxes next to each completed movement and habit.

- Upon checking the final item, an animated success screen triggers, granting the user account Experience Points and updating their overall account level.

Use Case 2: Unlocking a New Node on the Skill Tree
Goal: A user achieves a milestone hold time and wants to unlock the next advanced progression tier.

Steps:

- User navigates to the Skill Tree view from the main sidebar.

- The user pans across the interactive canvas and clicks on the active node they have been training (e.g., "10-Second Solid L-Sit").

- In the side-draw modal that appears, the user inputs their successful hold time and clicks "Mark as Mastered."

- The current node flashes with a mastering aura, and the visual path connects forward, unlocking the previously grayed-out "Tuck Planche" node for future tracking.

## Problem Statement

_In a few sentences explain the problem your target market is seeing that requires this project to be built. This will identify why is your application needed and needs to be supported by Primary Research._

Mainstream fitness tracking apps ignore the mechanics of progressive bodyweight training. While traditional weightlifting relies on linear periodization (adding external weight), calisthenics requires tracking leverage changes, form, and static hold durations across specific exxercise progressions, Because the market lacks a specialized, interactive platform built for this ecosystem, calisthenics athletes are forced to resort to boring spreadsheets, notes apps, or rigid video platforms such as youtube with no real way to track progression metrics.

## Pain Points

_Explain your audience’s pain points that are contributing to their defined problem and their impact on the user. Primary Research should support your explanations._

- Standard applications require filling out "Weight" and "Reps" fields, which do not translate to static holds (e.g., a 15-second full planche/maltesse hold) or minimal-equipment adjustments.

- Progress in calisthenics is slow and incremental. Without explicit, visual indicators of how a minor variation (like a pseudo-planche push-up) leads to a major skill (like a full planche), users lose motivation and suffer from training stagnation.

- Competitor applications are typically video players hosting rigid, non-interactive workout templates, rather than dynamic tools that adapt to a user's changing home or gym environments.

## Solution Statement

_How is your project going to solve the problem outlined above? Consider the competing products in your market space. What makes your solution different from other’s attempts to solve the problem? How are you able to better solve the defined problem for your audience than your competition?_

Sovereign solves these friction points by completely re-imagining fitness tracking through the lens of an RPG skill-tree interface. By breaking calisthenics down into interconnected data nodes, the application provides a visual roadmap for bodyweight mastery. It completely removes traditional weight fields, replacing them with dynamic duration trackers and form-variation metrics. Unlike generic apps, Sovereign incorporates an equipment-reactive filter, instantly altering the visible nodes based on whether a user has access to a doorway pull-up bar, gymnastics rings, or just a flat floor. By introducing a striking, gamified visual design layer built using Tailwind CSS, it turns a repetitive physical grind into a rewarding psychological loop.

## Competition

_What competing products exist to solve this or a similar problem? Identify and summarize competing products and how their approach to solving your identified problem differ from your own._

**Direct Competition**
THENX / Heria Pro: These are video-centric platforms focused heavily on follow-along content. They act as video subscription networks rather than interactive databases or customized progression tracking engines. Sovereign wins by focusing entirely on giving the user interactive control over their specific data tracking and skill roadmaps.

Calistree: A functional application that utilizes an explicit progression system. However, its user interface is clinical, dry, and text-heavy. Sovereign beats it by providing a highly stylized, high-contrast visual environment that prioritizes an engaging developer-grade layout and responsive, game-like feedback loops.

**Indirect Competition**
Hevy / Strong: Exceptional applications for standard bodybuilding and powerlifting. However, their databases and logging logic are fundamentally hardcoded around barbell and dumbbell movements, making them completely incompatible with advanced calisthenics tracking.

## Features & Functionality

_Define key features and functionality intended to provide solutions to specific problems and pain points you have identified. These key items should be specifically defined in response to problems / pain points._

_A good way to identify a Key Feature is to use the phrase 'In order to [solve this problem] I need to [do this]'. For example, 'In order to listen to music while I workout I need to be able to create a playlist'._

_Features and functionality should be prioritized based on their importance to the user. This will help you focus on the most important features first and then add additional features as time allows._

- Interactive Skill Canvas: Built using modular React positioning, this features a pannable, multi-branch skill tree organizing bodyweight progressions (Push, Pull, Core, Dynamics). In order to keep progression clear, locked nodes remain grayed out until their exact prerequisite nodes are mastered.

- Equipment-Reactive UI Toggle: A quick filter on the dashboard. In order to accommodate minimal home setups, toggling between specific items (e.g., Floor vs. Gymnastics Rings or Parallettes) instantly rewrites the skill paths to hide unavailable movements.

- Daily Quest Tracker: A consolidated homepage hub. In order to drive consistent user engagement, it transforms standard routines into gamified checklists that compile reps, physical sets, and custom healthy habits (like protein minimums) into unified daily goals.

- Slide-Out Skill Modals: A responsive detail panel. In order to prevent the user from losing their place on the visual tree, clicking any node slides out a clean panel housing movement guidelines, required targets, and an "Equip to Routine" action.

## Integrations

_Use of an API is expected. This can be 3rd party APIs, your own API, or a combination of data sets. Identify which integrations are planned for and outline how you will use them transformatively. For 3rd party APIs provide links to their respective documentation and verify that your intended use complies with their Terms of Service._

- Better-Auth Integration: Sovereign will implement Better-Auth linked via a MongoDB adapter. This securely automates token management, user registration, and secure session state across the client and database without polluting the repository with manual, custom cryptographic boilerplate.

- Sovereign REST API: A highly structured backend built using Node.js and Express. This internal API will handle complex calculations regarding node dependency verification, account leveling math, and user-to-routine relational mappings inside MongoDB.
