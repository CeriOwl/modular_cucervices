import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import UnknownUser from "../assets/unknown.jpg"
import Gmail from "../assets/gmail.png"
import Whatsapp from "../assets/whatsapp.png"

export default function IndividualProduct() {
  const params = useParams();
  const [product, setProduct] = useState({
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
    async function getProduct() {
      const productData = await axios.get(
        `http://localhost:3000/api/home-ventas/producto/${params.id}`
      );
      console.log(product.data);
      setProduct(productData.data); 
    }
    getProduct();
  }, []);

  return (
    <main className="bg-[#01021C] h-screen">
      <div className="text-white grid grid-cols-2 justify-items-center items-center mt-12">
        <div className="flex flex-col border rounded-md items-center p-6">
          <h2 className="uppercase font-bold text-[2.7rem]">Producto</h2>
          <div>
            <p className="text-center text-[0.7rem]">{product._id}</p>
            <div className="w-[20rem]">
              <img className="w-full" src={product.image.link} alt="" />
            </div>
            <div className="flex flex-col gap-2 text-[1.5rem]">
              <p>Nombre: {product.name}</p>
              <p>Precio: ${product.price}</p>
              <p>Disponible: {product.pieces}</p>
            </div>
          </div>
        </div>
        <div className="border rounded-md flex flex-col items-center p-6">
          <h2 className="uppercase font-bold text-[2.7rem]">Contacto</h2>
          <div className="w-[20rem]">
            <img className="w-full h-auto aspect-square rounded-full" src={UnknownUser} alt="" />
          </div>
          <div className="text-[1.5rem]">
            <p>Nombre: {product.user.name}</p>
            <p>Email: {product.user.email}</p>
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
