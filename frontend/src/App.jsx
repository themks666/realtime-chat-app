import ChatPage from "./pages/ChatPage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"

function App() {

  return (
    <>
    <Routes>
      <Route path="/sign-in" element={<LoginPage/>}></Route>
      <Route path="/chat" element={<ChatPage/>}></Route>
      <Route path="/sign-up" element={<SignUpPage/>}></Route>
    </Routes>
</>
  )
}

export default App
