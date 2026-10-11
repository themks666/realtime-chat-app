import { useEffect } from "react";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuthStore } from "./store/useAuthStore";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "lucide-react";
import LoaderPage from "./components/LoaderPage";

function App() {
  const { verifyUser, authUser,isVerifying } = useAuthStore();
  useEffect(() => {
    verifyUser();
  }, []);
  if(isVerifying) return <LoaderPage></LoaderPage>
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <>Home Page</> : <Navigate to="/sign-in" />}
        ></Route>
        <Route
          path="/sign-in"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to="/sign-in" />}
        ></Route>
        <Route
          path="/sign-up"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
