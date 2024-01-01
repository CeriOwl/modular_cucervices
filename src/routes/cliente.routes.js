import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { registerProductService, getClient, updateClient } from "../controllers/cliente.controller.js"
import multer from "multer"

const upload = multer({storage: multer.memoryStorage()})
const router = Router()

router.post('/cliente/crear', authRequired, upload.single('image'), registerProductService)
router.post('/cliente/actualizar', authRequired, upload.single('image'), updateClient)
router.get('/cliente', authRequired, getClient)

export default router