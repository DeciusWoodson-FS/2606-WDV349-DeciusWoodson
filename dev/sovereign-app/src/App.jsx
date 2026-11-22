import { Navigate, Outlet, Route, Routes } from "react-router";
import AuthLayout from "./components/AuthLayout";
import { GuestOnly, RequireAuth } from "./components/AuthGuards";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SkillTreePage from "./pages/SkillTreePage";
import ProfilePage from "./pages/ProfilePage";

// Background and split-screen layout shared by the login and register pages.
function AuthShell() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none bg-noise mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-[120%] h-[120%] -translate-x-1/4 -translate-y-1/4 rotate-[-15deg] bg-neutral-950 -z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-1/3 h-1/2 rotate-25] bg-[#0d1766] opacity-20 -z-10 blur-3xl"></div>

      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </>
  );
}

// Background shared by the signed-in pages.
function AppShell() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none bg-noise mix-blend-overlay z-0"></div>
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-900 relative overflow-hidden font-cambria">
      <Routes>
        <Route element={<AuthShell />}>
          <Route element={<GuestOnly />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>
        <Route element={<AppShell />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/skill-tree" element={<SkillTreePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
        {/* The root and unknown URLs go to the dashboard, which sends signed-out users to login. */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
}
