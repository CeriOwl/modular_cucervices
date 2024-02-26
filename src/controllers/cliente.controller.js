import Product from "../models/product.model.js"
import Service from "../models/service.model.js"
import Image from "../models/images.model.js"
import User from "../models/user.model.js"
import app from "../firebase/config.js";
import bcrypt from "bcryptjs"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

export const registerProductService = (req, res) => {
    const {register} = req.body
    const storage = getStorage(app)
    if(register === "product") {
        registerProduct(req, res, storage)
    }else if(register === "service") {
        registerService(req, res, storage)
    }else {
        return res.status(500).json({message: "Datos erroneos"})
    }
}

const registerProduct = async (req, res, storage) => {
    const {name, price, description, pieces} = req.body
    try {
        const new_product = new Product({
            name,
            description,
            price,
            pieces,
            user: req.user.id
        })
        const product_saved = await new_product.save()
        const storageRef = ref(storage, `products/${product_saved._id}`)
        await uploadBytes(storageRef, req.file.buffer, { contentType: req.file.mimetype })
        const get_link = await getDownloadURL(storageRef)
        const new_image = new Image({ link: get_link })
        const image_saved = await new_image.save()
        await Product.findOneAndUpdate(product_saved._id, { image: image_saved._id })
        res.json({
            message: "Producto registrado correctamente"
        })
    } catch(error){
        res.status(500).json(["Error al registrar el producto"])
    }
}

const registerService = async (req, res, storage) => {
    const {name, price, description} = req. body
    try {
        const new_service = new Service({
            name,
            description,
            price,
            user: req.user.id
        })
        const service_saved = await new_service.save()
        const storageRef = ref(storage, `services/${service_saved._id}`)
        await uploadBytes(storageRef, req.file.buffer, { contentType: req.file.mimetype })
        const get_link = await getDownloadURL(storageRef)
        const new_image = new Image({ link: get_link })
        const image_saved = await new_image.save()
        await Service.findOneAndUpdate(service_saved._id, { image: image_saved._id })
        res.json({
            message: "Servicio registrado correctamente"
        })
    } catch(error){
        res.status(500).json(["Error al registrar el servicio"])
    }
}

export const getClient = async (req, res) => {
    const user = await User.findById(req.user.id).populate('image')
    res.json(user)
}

export const updateClient = async (req, res) => {
    const {name, email, password, description, social, tel} = req.body
    const storage = getStorage(app)
    try {
        const image = req.file
        console.log(image)
        //const client = await User.findByIdAndUpdate(req.user.id, req.body, {new: true})
        if(name) {
            await User.findByIdAndUpdate(req.user.id, { name })
        }
        if(email) {
            await User.findByIdAndUpdate(req.user.id, { email })
        }
        if(password !== '') {
            const password_enctyped = await bcrypt.hash(password, 10)
            await User.findByIdAndUpdate(req.user.id, { password: password_enctyped })
        }
        if(image !== undefined) {
            const user = await User.findById(req.user.id)
            const image = await Image.findById(user.image._id)
            console.log("Enter")
            const storageRef = ref(storage, `users/${req.user.id}`)
            await uploadBytes(storageRef, req.file.buffer, { contentType: req.file.mimetype })
            const get_link = await getDownloadURL(storageRef)
            await Image.findByIdAndUpdate(image._id, { link: get_link })
        }
        if(description !== '' || description !== undefined) {
            await User.findByIdAndUpdate(req.user.id, { description })
        }
        if(social !== '' || social !== undefined) {
            await User.findByIdAndUpdate(req.user.id, { social })
        }
        if(tel !== '' || tel !== undefined) {
            await User.findByIdAndUpdate(req.user.id, { tel })
        }
        res.json({
            message: "Usuario actualizado correctamente"
        })
    }catch(error) {
        res.json({
            message: error.message
        })
    }
}