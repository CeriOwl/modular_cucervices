import axios from "../api/axios.js"
import { useEffect, useState } from "react"
import Header from "../components/Header.jsx"
import Service from "../components/Service.jsx"
import { useAuth } from "../context/auth.context.jsx"
import { useNavigate } from "react-router-dom"

export default function Servicio() {
  const [services, setServices] = useState([])
  const {isAuthenticated} = useAuth();
  const navigation = useNavigate()

  useEffect(() => {
    async function handleData() {
      const servicesData = await axios.get("http://localhost:3000/api/home-ser")
      console.log(servicesData)
      setServices(servicesData.data)
    }
    if(isAuthenticated) {
      handleData()
    }
    else{
      navigation("/")
    }
  }, [])

  return (
    <main className="bg-[#01021C]">
      <Header/>
      <div className="grid grid-cols-4 p-10 justify-items-center gap-12">
        {
          services.map((service, index) => <Service data={service} key={index}/>)
        }
      </div>
    </main>
  )
}
