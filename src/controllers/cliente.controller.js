import Product from "../models/product.model.js"
import Service from "../models/service.model.js"
import User from "../models/user.model.js"

export const registerProductService = (req, res) => {
    const {register} = req.body
    if(register === "product") {
        registerProduct(req, res)
    }else if(register === "service") {
        registerService(req, res)
    }else {
        return res.status(500).json({message: "Datos erroneos"})
    }
}

const registerProduct = async (req, res) => {
    const {name, price, description, pieces} = req. body
    try {
        const new_product = new Product({
            name,
            description,
            price,
            pieces,
            user: req.user.id
        })
        await new_product.save()
        res.json({
            message: "Producto registrado correctamente"
        })
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}

const registerService = async (req, res) => {
    const {name, price, description} = req. body
    try {
        const new_service = new Service({
            name,
            description,
            price,
            user: req.user.id
        })
        await new_service.save()
        res.json({
            message: "Servicio registrado correctamente"
        })
    } catch(error){
        res.status(500).json({ message: error.message })
    }
}

export const getClient = async (req, res) => {
    const user = await User.findById(req.user.id)
    res.json(user)
}

export const updateClient = async (req, res) => {
    try {
        const client = await User.findByIdAndUpdate(req.user.id, req.body, {new: true})
        res.json({
            message: "Usuario actualizado correctamente"
        })
    }catch(error) {
        res.json({
            message: error.message
        })
    }
}