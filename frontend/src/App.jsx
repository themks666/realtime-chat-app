import { useEffect } from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { Navigate, Route, Routes } from "react-router-dom";
import LoaderPage from "./components/LoaderPage";
import Sidebar from "./components/SideBar";
import HomePage from "./pages/LandingPage";

function App() {
  const { verifyUser, authUser, isVerifying } = useAuthStore();

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  if (isVerifying) return <LoaderPage />;

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {authUser && <Sidebar />}

      <div className="flex-1 h-full overflow-y-auto">
        <Routes>
          {/*
          <Route
            path="/"
            element={authUser ? <><HomePage></HomePage></> : <Navigate to="/sign-in" />}
          /> */}
          <Route
            path="/sign-in"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={authUser ? <ChatPage /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/sign-up"
            element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
