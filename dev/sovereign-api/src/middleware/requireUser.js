import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../auth.js";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

// Identifies the user from their Better-Auth session cookie. The account itself
// lives in Better-Auth's `user` collection; skill tree progress lives in our
// `users` collection, linked by the account's id.
export default asyncHandler(async function requireUser(req, res, next) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (!session) {
    return res.status(401).json({ error: "Please sign in to continue" });
  }

  const userId = session.user.id;
  // Atomic get-or-create: a brand new account fires several requests at once, and
  // two plain findOne-then-create calls could both see "not found" and race to insert.
  const user = await User.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId } },
    { upsert: true, new: true }
  );

  req.account = session.user;
  req.user = user;
  next();
});
