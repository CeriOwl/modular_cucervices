import {z} from "zod"
export const registerSchema = z.object({
    email: z.string({
        required_error: "Email es requerido"
    }).email({
        message: "Email inválido"
    }),
    name: z.string({
        required_error: "Nombre es requerido"
    }),
    password: z.string({
       required_error: "Contraseña es requerida" 
    }).min(6, {
        message: "El password debe contener minimo 6 carácteres"
    }),
    image: z.any({
        required_error: "Imagen es requerida"
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email es requerido"
    }).email({
        message: "Email inválido"
    }),
    password: z.string({
        required_error: "Contraseña es requerida"
    }).min(6, {
        message: "Contraseña debe de tener mínimo 6 carácteres"
    })
})