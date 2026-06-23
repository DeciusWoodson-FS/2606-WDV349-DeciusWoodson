import React, { useState } from "react";
import AuthLayout from "./components/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState("login");

  return (
    <div className="min-h-screen w-full flex flex-col bg-neutral-900 relative overflow-hidden font-cambria">
      {/* Route Switcher */}
      {currentRoute === "dashboard" ? (
        <>
          {/* Dashboard specific background */}
          <div className="absolute inset-0 pointer-events-none bg-noise mix-blend-overlay z-0"></div>
          <DashboardPage navigateTo={setCurrentRoute} />
        </>
      ) : (
        <>
          {/* Auth Layout specific backgrounds */}
          <div className="absolute inset-0 pointer-events-none bg-noise mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-[120%] h-[120%] -translate-x-1/4 -translate-y-1/4 rotate-[-15deg] bg-neutral-950 -z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-1/3 h-1/2 rotate-25 bg-[#0d1766] opacity-20 -z-10 blur-3xl"></div>

          <AuthLayout currentView={currentRoute}>
            {currentRoute === "login" ? (
              <LoginPage navigateTo={setCurrentRoute} />
            ) : (
              <RegisterPage navigateTo={setCurrentRoute} />
            )}
          </AuthLayout>
        </>
      )}
    </div>
  );
}
