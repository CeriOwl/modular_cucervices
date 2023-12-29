import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { registerProductService, getClient, updateClient } from "../controllers/cliente.controller.js"

const router = Router()

router.post('/cliente/crear', authRequired, registerProductService)
router.post('/cliente/actualizar', authRequired, updateClient)
router.get('/cliente', authRequired, getClient)

export default router