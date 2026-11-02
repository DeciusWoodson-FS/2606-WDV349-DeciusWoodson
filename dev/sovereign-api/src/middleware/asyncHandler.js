// Express 4 doesn't forward a rejected promise from an async handler to the
// error middleware on its own — wrap handlers with this so a thrown error
// becomes a 500 response instead of an unhandled rejection that kills the process.
export default function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
