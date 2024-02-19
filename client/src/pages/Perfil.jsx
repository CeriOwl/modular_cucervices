import React, { useEffect, useState } from 'react'
import Header from '../components/Header.jsx'
import { useAuth } from '../context/auth.context.jsx'
import { Link } from 'react-router-dom'

export default function Perfil() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        image: "",
        id: "",
        creation: "",
        updated: "",
        verified: ""
    })

    const {user} = useAuth();

    useEffect(() => {
        
        const formatDates = (date) => {
            const dateObject = new Date(date)
            const formatNumber = (number) => (number < 10 ? `0${number}` : number)
            return `${formatNumber(dateObject.getUTCDate())}-${formatNumber(dateObject.getUTCMonth()+1)}-${dateObject.getFullYear()}`
        }

        const formatVerified = (verified) => verified === true ? "Cuenta verificada" : "Cuenta NO verficada"

        const data = {
            name: user.data.name,
            email: user.data.email,
            image: user.data.image.link,
            id: user.data._id,
            creation: formatDates(user.data.createdAt),
            updated: formatDates(user.data.updatedAt),
            verified: formatVerified(user.data.verified)
        }
        setUserData(data)
    }, [])
  return (
    <main className='bg-[#01021C]'>
        
        <section className='py-12 grid justify-center text-white'>
            <div className='p-5 rounded-xl flex flex-col border items-center gap-y-4'>
                <h1 className='font-black text-[3rem] text-center'>Bienvenido: {userData.name}</h1>
                <p className='font-bold italic text-[1.2rem]'>{userData.verified}</p>
                <div className='w-[20rem] border rounded-full overflow-hidden'>
                    <img className='w-full' src={userData.image} alt="" />
                </div>
                <div className='w-full text-[1.5rem] text-center'>
                    <p>Email: {userData.email}</p>
                    <p>Fecha de creación: {userData.creation}</p>
                    <p>Fecha de actualización: {userData.updated}</p>
                </div>
                <Link to="/update/profile" className=' bg-[#457B9D] w-full text-center font-bold hover:bg-[#31587A] py-2 px-6 text-[1.4rem] rounded-md transition-colors'>Actualizar mi información</Link>
            </div>
        </section>
    </main>
  )
}
