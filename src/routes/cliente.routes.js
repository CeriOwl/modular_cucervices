import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { registerProductService, getClient, updateClient } from "../controllers/cliente.controller.js"
import multer from "multer"

const router = Router()
const upload = multer({storage: multer.memoryStorage()})

router.post('/cliente/crear', authRequired, upload.single('image'), registerProductService)

router.get('/cliente', authRequired, getClient)

export default router