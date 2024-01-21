import {BrowserRouter, Route, Routes} from "react-router-dom"
import { AuthProvider } from "./context/auth.context.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Ventas from "./pages/Ventas.jsx"
import Servicios from "./pages/Servicios.jsx"
import IndividualProduct from "./pages/IndividualProduct.jsx"
import IndividualService from "./pages/IndividualService.jsx"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/ventas/:id" element={<IndividualProduct />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:id" element={<IndividualService/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
