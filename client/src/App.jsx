import {BrowserRouter, Route, Routes} from "react-router-dom"
import { AuthProvider } from "./context/auth.context.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Ventas from "./pages/Ventas.jsx"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register" element={<Ventas />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
