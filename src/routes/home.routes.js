import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import {getProducts, getProduct, getServices, getService} from "../controllers/home.controller.js"

const router = Router()
router.get('/home-ventas', authRequired, getProducts)
router.get('/home-ventas/producto/:id', authRequired, getProduct)
router.get("/home-ser", authRequired, getServices)
router.get("/home-ser/servicios/:id", authRequired, getService)


export default router