import React from 'react'
import LogoHeader from "../assets/logoheader.png"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className="px-8 py-6 border-b flex justify-between">
        <Link to='/' className="max-w-[32rem]">
          <img className="w-full" src={LogoHeader} alt="" />
        </Link>
        <div className="text-white flex gap-3 items-center">
          <Link className="bg-[#457B9D] hover:bg-[#31587A] py-2 px-6 text-[1.2rem] rounded-md transition-colors" to='/servicios'>Servicios</Link>
          <Link className="bg-[#457B9D] hover:bg-[#31587A] py-2 px-6 text-[1.2rem] rounded-md transition-colors" to='/ventas'>Productos</Link>
          <Link to='/' className="bg-[#E63946] transition-colors hover:bg-[#82374F] py-2 px-6 text-[1.2rem] rounded-md">Cerrar Sesión</Link>
        </div>
      </div>
  )
}
