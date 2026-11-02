import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

// PLACEHOLDER AUTH: trusts an `x-user-id` header instead of a real session.
// Replace with real session/JWT verification (e.g. Better-Auth) before shipping.
// Until then, any request can claim any identity by setting the header, so
// this must never be trusted for anything sensitive.
export default asyncHandler(async function requireUser(req, res, next) {
  const userId = req.header("x-user-id");
  if (!userId) {
    return res.status(401).json({ error: "Missing x-user-id header" });
  }

  // Atomic get-or-create: the frontend fires several requests for a brand
  // new user concurrently, and two plain findOne-then-create calls can both
  // see "not found" and race to insert the same userId.
  const user = await User.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId } },
    { upsert: true, new: true }
  );

  req.user = user;
  next();
});
