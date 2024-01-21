import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import UnknownUser from "../assets/unknown.jpg"
import Gmail from "../assets/gmail.png"
import Whatsapp from "../assets/whatsapp.png"

export default function IndividualService() {
  const params = useParams();
  const [service, setService] = useState({
    name: "",
    image: { link: "" },
    price: "",
    pieces: "",
    user: {
        name: "",
        email: ""
    }
  });
  useEffect(() => {
    async function getService() {
      const serviceData = await axios.get(
        `http://localhost:3000/api/home-ser/servicios/${params.id}`
      );
      console.log(serviceData.data);
      setService(serviceData.data); 
    }
    getService();
  }, []);

  return (
    <main className="bg-[#01021C] h-screen">
      <Header/>
      <div className="text-white grid grid-cols-2 justify-items-center items-center mt-12">
        <div className="flex flex-col border rounded-md items-center p-6">
          <h2 className="uppercase font-bold text-[2.7rem]">Servicio</h2>
          <div className="flex flex-col items-center">
            <p className="text-center text-[0.7rem]">{service._id}</p>
            <div className="w-[20rem]">
              <img className="w-full" src={service.image.link} alt="" />
            </div>
            <div className="flex flex-col gap-2 text-[1.5rem]">
              <p>Nombre: {service.name}</p>
              <p>Descripción: {service.description}</p>
              <p>Precio: ${service.price}</p>
            </div>
          </div>
        </div>
        <div className="border rounded-md flex flex-col items-center p-6">
          <h2 className="uppercase font-bold text-[2.7rem]">Contacto</h2>
          <div className="w-[20rem]">
            <img className="w-full h-auto aspect-square rounded-full" src={UnknownUser} alt="" />
          </div>
          <div className="text-[1.5rem]">
            <p>Nombre: {service.user.name}</p>
            <p>Email: {service.user.email}</p>
          </div>
          <div className="flex gap-10">
            <div className="w-16">
              <img className="w-full cursor-pointer" src={Gmail} alt="" />
            </div>
            <div className="w-16">
              <img className="w-full cursor-pointer" src={Whatsapp} alt="" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
