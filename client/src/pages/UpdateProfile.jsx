import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/auth.context'

export default function UpdateProfile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    description: "",
    image: "",
    socialMedia: "",
    phoneNumber: ""
  })

  const {user} = useAuth()
  const {register, formState: {errors}, handleSubmit, setValue} = useForm()

  useEffect(() => {
    const loadInfo = () => {
      setValue("name", user.data.name)
      setValue("email", user.data.email)
    }
    loadInfo()
  }, [])

  return (
    <main className='bg-[#01021C] h-screen'>
      <Header />
      <section className='grid justify-center mt-6'>
        <div className='border p-6 rounded-md'>
          <h1 className='text-white uppercase text-center font-black text-[1.7rem]'>Actualiza tu información</h1>
          <form className='text-white text-[1.2rem] flex flex-col gap-y-2' method="post">
            <div className='flex flex-col'>
              <label htmlFor="name">Nombre</label>
              <input className='text-black px-2 py-1 rounded-sm' type="text" name="name" id="name" {...register("name")} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="email">Email</label>
              <input className='text-black px-2 py-1 rounded-sm' type="email" name="email" id="email" {...register("email")} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="password">Contraseña</label>
              <input className='text-black px-2 py-1 rounded-sm' type="password" name="" id=""/>
            </div>
            <div>
              <input className='' type="file" name="" id="" {...register("image")}/>
            </div>
            <div className=''>
              <button className='w-full bg-[#457B9D] hover:bg-[#31587A] py-1 px-6 text-[1.2rem] rounded-md transition-colors'>Actualizar</button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
