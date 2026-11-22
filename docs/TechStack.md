# Tech Stack

Fill out the headings below with your Tech Stack information. List the tools and technology you would like to use for your final project. Explain your reasoning for this as well. For example, how does the proposed tool or technology provide value to your overall portfolio of work?

## Application Design

What tool(s) will you use to create click-through designs of the application? List any UI kits you would like to utilize as well.

Tool(s): Figma.
Reasoning: I will use Figma to create a wireframe prototype. I'll be taking inspiration from corporate UI kits (like Material UI), to design a custom, highly stylized, high-contrast interface inspired by RPG gaming menus. Creating these visual components in Figma first allows me to map out complex UI states—such as locked, in-progress, and mastered progression nodes—before writing any code.

## Front End Framework

List your approach for front end development. For example, React is an often used front-end solution for projects in addition to using moduleCSS, PropTypes, and an ESLint style guide.

Tool(s): [React](https://react.dev/learn/build-a-react-app-from-scratch), [Tailwind CSS](https://tailwindcss.com/), [TanStack Router](https://tanstack.com/router/latest).
Reasoning: React will be the core UI library via Vite for optimal build speeds. To execute the complex aesthetic planned in the design phase, I'll utilize Tailwind CSS for utility-first styling. I'll also be implementing TanStack Router. This provides 100% type-safe, file-based routing, ensuring that dynamic route parameters (like specific skill nodes or user IDs) are strictly validated.

## State Management

What is your proposed solution for managing data? This could mean utilizing a database, local-storage, and in general state management libraries for the application (e.g. Redux).

Tool(s): [Zustand](https://zustand.docs.pmnd.rs/learn/getting-started/introduction), [TanStack Query](https://tanstack.com/query/latest), [MongoDB](https://www.mongodb.com/).
Reasoning: Modern React relies on separating synchronous UI state from asynchronous database state. For the global client state (e.g., toggling the equipment filter between rings and a pull-up bar), I will use Zustand because it's exceptionally lightweight and avoids the massive boilerplate of Redux. For server state (fetching user profiles and skill tree progression), I will use TanStack Query to handle all caching, loading states, and background revalidation.

## Node

Node is often used to serve both an API and to render a front-end. This includes using best practices, npm, and npx. What do you propose?

Tool(s): [Node.js](https://nodejs.org/en), [npm](https://www.npmjs.com/), custom env configuration.
Reasoning: Node.js will serve as the runtime environment for the backend API. I'll utilize npm for dependency management and ensure best practices by securely managing configuration variables like database URIs and authentication secrets via .env files.

## Express

Express is a popular framework to power an API. Describe your idea for building similar functionality offered by express: e.g. middleware, routes, controllers, sending and receiving JSON data.

Tool(s): [Express.js](https://expressjs.com/en/), [Better-Auth](https://better-auth.com/).
Reasoning: Express will be used to construct a robust RESTful API. The architecture will strictly separate concerns: using controllers to handle the core logic (validating experience point gains or unlocking dependencies), specialized routing files to maintain clean code, and middleware for error handling and request validation. Moreover, authentication will be handled by integrating the Better-Auth library via Express, seamlessly managing secure sessions and protecting API endpoints.

## SQL/Postgres/Sequelize

A popular solution for relational database work is to utilize Sequelize as an ORM. Are you familiar with migrations, models, and seeding? What tools and solutions do you propose for your application? For example, utilizing an ORM to build out models with full validated CRUD.

Tool(s): [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/docs/).
Reasoning: While I understand the boons of relational databases, migrations, and ORMs like Sequelize, I propose using a NoSQL approach via MongoDB and the Mongoose library for Sovereign. The core feature of this app is a dynamic "Skill Tree" where users track multi-layered, heavily nested workout progressions. Because user routines and skill dependencies are highly flexible and vary drastically based on equipment, a document-based NoSQL structure is much more natural and performant than rigid relational SQL tables.
