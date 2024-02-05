import axios from "../api/axios.js"
import { useEffect, useState } from "react"
import Product from "../components/Product.jsx"
import Header from "../components/Header.jsx"
import { useAuth } from "../context/auth.context.jsx"
import { useNavigate } from "react-router-dom"

export default function Ventas() {
  const [products, setProducts] = useState([])
  const {isAuthenticated} = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    async function handleData() {
      const productsData = await axios.get("http://localhost:3000/api/home-ventas")
      console.log(productsData)
      setProducts(productsData.data)
    }

    if(isAuthenticated) {
      handleData()
    } else {
      navigation("/")
    }

  }, [])

  return (
    <main className="bg-[#01021C]">
      <Header/>
      <div className="grid grid-cols-4 p-10 justify-items-center gap-12">
        {
          products.map((product, index) => <Product data={product} key={index}/>)
        }
      </div>
    </main>
  )
}
