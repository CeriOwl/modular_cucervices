import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom"
import { AuthProvider } from "./context/auth.context.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Ventas from "./pages/Ventas.jsx"
import Servicios from "./pages/Servicios.jsx"
import IndividualProduct from "./pages/IndividualProduct.jsx"
import IndividualService from "./pages/IndividualService.jsx"
import Verificacion from "./pages/Verificacion.jsx"
import Perfil from "./pages/Perfil.jsx"
import UpdateProfile from "./pages/UpdateProfile.jsx"
import Error from "./pages/Error.jsx"
import Header from "./components/Header.jsx"

function App() {
  const {pathname} = useLocation()
  return (
    <>
    {
      pathname !== "/" ? <Header/> : ""
    }
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/ventas/:id" element={<IndividualProduct />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:id" element={<IndividualService />} />
          <Route path="/verificacion" element={<Verificacion />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/update/profile" element={<UpdateProfile />} />
          <Route path="*" element={<Error />} />
        </Routes>
  </>
  )
}

export default App
