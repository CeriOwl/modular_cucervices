import axios from "../api/axios.js"
import { useEffect, useState } from "react"
import Product from "../components/Product.jsx"
import { useAuth } from "../context/auth.context.jsx"
import { useNavigate } from "react-router-dom"

export default function Ventas() {
  const [isProduct, setIsProduct] = useState(undefined)
  const [products, setProducts] = useState([])
  const {isAuthenticated} = useAuth();
  console.log(isAuthenticated)
  const navigation = useNavigate();

  useEffect(() => {
    async function handleData() {
      const productsData = await axios.get("http://localhost:3000/api/home-ventas")
      console.log(productsData.data)
      if(productsData.data.length > 0) {
        setProducts(productsData.data)
        setIsProduct(true)
      }else {
        setIsProduct(false)
      }
    }
    
    if(isAuthenticated) {
      handleData()
    } else {
      navigation("/")
    }

  }, [])

  return (
    <main className="bg-[#01021C]">
      <div className="grid grid-cols-4 p-10 justify-items-center gap-x-12">
        {
          isProduct !== false ? products.map((product, index) => <Product data={product} key={index}/>) : ""
        }
      </div>
    </main>
  )
}
