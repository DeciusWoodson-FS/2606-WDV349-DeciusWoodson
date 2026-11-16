// These rules match the API's Better-Auth settings. Checking them here gives instant,
// readable feedback; the API still checks everything again, since it can't trust the browser.
const USERNAME_PATTERN = /^[A-Za-z0-9_.]{3,30}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;
const MAX_PASSWORD = 128;

function passwordProblem(password) {
  if (password.length < MIN_PASSWORD) return `Passwords need at least ${MIN_PASSWORD} characters.`;
  if (password.length > MAX_PASSWORD) return `Passwords can't be longer than ${MAX_PASSWORD} characters.`;
  return null;
}

// Returns a message describing the first problem, or null if the form is ready to send.
export function validateRegistration({ username, email, password, confirmPassword }) {
  if (!username || !email || !password || !confirmPassword) return "Please fill in every field.";
  if (username.length < 3 || username.length > 30) {
    return "Usernames need to be between 3 and 30 characters.";
  }
  if (!USERNAME_PATTERN.test(username)) {
    return "Usernames can only use letters, numbers, underscores (_), and dots (.).";
  }
  if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address.";
  return passwordProblem(password) ?? (password !== confirmPassword ? "Passwords don't match." : null);
}

export function validateLogin({ identifier, password }) {
  if (!identifier || !password) return "Please enter your email or username and your password.";
  return null;
}

// Better-Auth's error codes, rewritten in plain language. Sign-in failures share one
// message so the form never reveals whether an email or username has an account.
const MESSAGES = {
  INVALID_EMAIL_OR_PASSWORD: "That email or username and password don't match.",
  INVALID_USERNAME_OR_PASSWORD: "That email or username and password don't match.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_USERNAME: "Usernames can only use letters, numbers, underscores (_), and dots (.).",
  USERNAME_TOO_SHORT: "Usernames need to be between 3 and 30 characters.",
  USERNAME_TOO_LONG: "Usernames need to be between 3 and 30 characters.",
  USERNAME_IS_ALREADY_TAKEN: "That username is taken. Please try another.",
  USER_ALREADY_EXISTS: "An account with that email already exists. Try signing in instead.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "An account with that email already exists. Try signing in instead.",
  PASSWORD_TOO_SHORT: `Passwords need at least ${MIN_PASSWORD} characters.`,
  PASSWORD_TOO_LONG: `Passwords can't be longer than ${MAX_PASSWORD} characters.`,
};

export function authErrorMessage(error) {
  if (MESSAGES[error.code]) return MESSAGES[error.code];
  // A field failed the API's own format checks, such as a malformed email.
  if (error.code === "VALIDATION_ERROR") {
    return error.message?.includes("email")
      ? "Please enter a valid email address."
      : "Please check your details and try again.";
  }
  // Better-Auth reports a status of 0 when no response came back at all.
  if (!error.status) return "Can't reach the server. Please try again.";
  if (error.status === 429) return "Too many attempts. Please wait a moment and try again.";
  return error.message || "Something went wrong. Please try again.";
}
