import { Router } from "express"
import { login, logout, register } from "../controllers/auth.controller.js"
import {validateSchema} from "../middlewares/validator.middleware.js"
import {loginSchema, registerSchema} from "../schemas/auth.schema.js"
import multer from "multer"

const router = Router()
const upload = multer({storage: multer.memoryStorage()})


router.post('/register', validateSchema(registerSchema), upload.single('image'), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)

export default router