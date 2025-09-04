import { Routes,Route } from "react-router-dom"
import Home from "./Components/Home/Home"
import ChatPage from "./Components/ChatPage/ChatPage"
import Reset from "./reset"
function App() {


  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/chat" element={<ChatPage/>}/>
      <Route path="/reset" element={<Reset/>}/>
    </Routes>
    </>
  )
}

export default App
