import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { createAccessToken } from "../libs/jwt.js"

export const register = async (req, res) => {
    const {name, email, password} = req.body
    try{
        const encrypted_password = await bcrypt.hash(password, 10)  
        const new_user = new User({
            name,
            email,
            password: encrypted_password,
            verified: false
        })
        const user_saved = await new_user.save()
        const token = await createAccessToken({id: user_saved._id})
        res.cookie("token", token)
        res.json({
            message: "Usuario registrado correctamente"
        })
    }catch(error) {
        res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try{
        const user_found = await User.findOne({email})
        if (!user_found) {
            return res.status(400).json({
                message: "Usuario no encontrado"
            })
        }
        const is_match = await bcrypt.compare(password, user_found.password)
        if (!is_match) {
            return res.status(400).json({
                message: "Contraseña incorrecta"
            })
        }
        
        const token = await createAccessToken({id: user_found._id})
        
        res.cookie("token", token)
        res.json({
            id: user_found._id,
            verified: user_found.verified
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

export const profile = async (req, res) => {
    const user_found = await User.findById(req.user.id)
    if(!user_found) {
        return res.status(400).json({
            message: "User not found"
        })
    }else {
        return res.json({
            id: user_found._id,
            username: user_found.username,
            email: user_found.email
        })
    }
}