import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SettingsPage } from "./pages/SettingsPage";
import { useThemeStore } from "./store/useThemeStore";
import { AppLayout } from "./layouts/AppLayput";
import { ProfilePage } from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";

export function App(){
  const { theme } = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  
  return (
    <div data-theme={theme}>
      
      <Routes>
        <Route path="/" element={ authUser ? <AppLayout /> : <Navigate to={"/login"} /> }>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/settings" element={ <SettingsPage /> } />
          <Route path="/profile" element={ <ProfilePage /> } />
        </Route>
        
        <Route path="/login" element={ authUser ? <Navigate to={"/"} /> : <LoginPage /> } />
        <Route path="/signup" element={ authUser ? <Navigate to={"/"} /> : <SignUpPage /> } />

      </Routes>

      <Toaster />
    </div>
  )
}