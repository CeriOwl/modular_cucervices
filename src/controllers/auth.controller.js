import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import Image from "../models/images.model.js"
import { createAccessToken } from "../libs/jwt.js"
import app from "../firebase/config.js";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../config.js"

export const register = async (req, res) => {
    const {name, email, password} = req.body
    // storage Firebase
    const storage = getStorage(app)
    try{
        const user_found = await User.findOne({email})
        if (user_found) {
            return res.status(400).json({
                error: "Email en uso"
            })
        }

        const encrypted_password = await bcrypt.hash(password, 10)
        const new_user = new User({
            name,
            email,
            password: encrypted_password,
            verified: false,
        })
        // Save in mongoDB
        const user_saved = await new_user.save()
        // Save in firebase
        const storageRef = ref(storage, `users/${user_saved._id}`)
        await uploadBytes(storageRef, req.file.buffer, { contentType: req.file.mimetype })
        const get_link = await getDownloadURL(storageRef)
        const new_image = new Image({link: get_link})
        const image_saved = await new_image.save()
        await User.findByIdAndUpdate(user_saved._id, {image: image_saved._id})
        const token = await createAccessToken({id: user_saved._id})
        res.cookie("token", token)
        res.json({
            data: await User.findOne({email}).populate("image")
        })
    }catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try{
        const user_found = await User.findOne({email})
        if (!user_found) {
            return res.status(400).json({
                error: ["Usuario no encontrado"]
            })
        }
        const is_match = await bcrypt.compare(password, user_found.password)
        if (!is_match) {
            return res.status(400).json({
                error: ["Contraseña incorrecta"]
            })
        }
        
        const token = await createAccessToken({id: user_found._id})
        res.cookie("token", token)
        res.json({
            data: await User.findOne({email}).populate("image")
        })
    }catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.status(200).json({message: "Log out"})
}

export const verifyToken = (req, res) => {
    const {token} =  req.cookies
    if(!token) return res.status(400).json({message: "No autorizado"})
    
    jwt.verify(token, SECRET_KEY, async (err, user) => {
        if(err) return res.status(401).json({message: "No autorizado"})

        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json({message: "No autorizado"})

        return res.json({
            id: userFound._id,
            name: userFound.name,
            email: userFound.email
        })
    })
}