import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

for (const name of ["MONGODB_URI", "BETTER_AUTH_SECRET", "BETTER_AUTH_URL"]) {
  if (!process.env[name]) {
    throw new Error(`${name} is not set. Copy .env.example to .env and fill it in.`);
  }
}

// The frontend's address. Only this origin may call the auth routes from a browser.
export const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// Better-Auth talks to MongoDB through the official driver rather than Mongoose.
// It stores its data in its own `user`, `session`, and `account` collections, so
// it never touches the `users` collection that holds skill tree progress.
const client = new MongoClient(process.env.MONGODB_URI);

export const auth = betterAuth({
  // BETTER_AUTH_SECRET and BETTER_AUTH_URL are read from the environment.
  // Transactions aren't enabled because a local standalone MongoDB doesn't support them.
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
  // Usernames are unique (3-30 letters, numbers, underscores, or dots) and can be
  // used to sign in instead of an email. `displayUsername` keeps the original casing.
  plugins: [username()],
  trustedOrigins: [clientOrigin],
});
