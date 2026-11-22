import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useSlowLoading } from "../hooks/useSlowLoading";
import { SESSION_EXPIRED_EVENT } from "../lib/api";
import { authClient } from "../lib/authClient";

function StatusScreen({ children, slow = false }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8 text-center">
      <span className="font-heading text-lg text-neutral-400">{children}</span>
      {slow && (
        <span className="font-cambria text-neutral-500 max-w-sm">
          The server is waking up after a quiet period. This can take up to a minute.
        </span>
      )}
    </div>
  );
}

// Signed-in pages: anyone without a session is sent to the login page, which
// remembers where they were headed so it can send them back after signing in.
export function RequireAuth() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const location = useLocation();
  const slow = useSlowLoading(isPending);

  // If the API rejects a request because the session has expired, check the session
  // again; once it comes back empty, the redirect below sends the user to log in.
  useEffect(() => {
    const recheck = () => refetch();
    window.addEventListener(SESSION_EXPIRED_EVENT, recheck);
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, recheck);
  }, [refetch]);

  if (isPending) return <StatusScreen slow={slow}>Loading...</StatusScreen>;
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
  const slow = useSlowLoading(isPending);

  if (isPending) return <StatusScreen slow={slow}>Loading...</StatusScreen>;
  if (session) {
    return <Navigate to={location.state?.from?.pathname || "/dashboard"} replace />;
  }
  return <Outlet />;
}
