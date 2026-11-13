import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";
import { API_BASE } from "./api";

// Talks to the API's Better-Auth routes under /api/auth. The session itself is an
// HttpOnly cookie, so the frontend never stores or reads a token directly.
export const authClient = createAuthClient({
  baseURL: API_BASE,
  plugins: [usernameClient()],
});

// The name to show for the signed-in user, keeping the casing they signed up with.
export function displayNameOf(session) {
  return session?.user.displayUsername || session?.user.name || null;
}
