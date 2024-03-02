import React, { useEffect, useState } from 'react'
import axios from "../api/axios.js"
import PostedUser from "../components/PostedUser.jsx"

export default function Posted() {
  const [data, setData] = useState([])
    useEffect(() => {
      async function getData() {
        try{
          const data = await axios.get("http://localhost:3000/api/cliente/products")
          setData(data.data.result)
        }catch(error){
          console.log(error)
        }
      }
      getData()
    }, [])
    return (
    <main className='bg-[#01021C]'>
      {
        data.length > 0 ? 
        <section className='grid grid-cols-3 gap-12 pt-12 px-6'>
        {
          data.map(element => <PostedUser data={element} />)
        }
        </section>
        :
        <section className=' grid items-center justify-center'>
          <h1 className='text-white py-[300px] font-black uppercase text-[80px]'>¿Está un poco vacío aquí, no?</h1>    
        </section>
      }
    </main>
  )
}
