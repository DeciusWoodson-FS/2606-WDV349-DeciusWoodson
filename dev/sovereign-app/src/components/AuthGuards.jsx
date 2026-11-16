import { Navigate, Outlet, useLocation } from "react-router";
import { authClient } from "../lib/authClient";

function StatusScreen({ children }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8 text-center">
      <span className="font-heading text-lg text-neutral-400">{children}</span>
    </div>
  );
}

// Signed-in pages: anyone without a session is sent to the login page, which
// remembers where they were headed so it can send them back after signing in.
export function RequireAuth() {
  const { data: session, isPending, error } = authClient.useSession();
  const location = useLocation();

  if (isPending) return <StatusScreen>Loading...</StatusScreen>;
  if (error && !session) {
    return <StatusScreen>Can't reach the server. Please try again.</StatusScreen>;
  }
  if (!session) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}

// Login and register: a signed-in user is sent on to the page they were headed
// for before logging in, or the dashboard. This also runs the moment sign-in succeeds.
export function GuestOnly() {
  const { data: session, isPending } = authClient.useSession();
  const location = useLocation();

  if (isPending) return <StatusScreen>Loading...</StatusScreen>;
  if (session) {
    return <Navigate to={location.state?.from?.pathname || "/dashboard"} replace />;
  }
  return <Outlet />;
}
