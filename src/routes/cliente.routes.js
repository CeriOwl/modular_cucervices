import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"
import { registerProductService, getClient, updateClient, productsPosted, productsPostedIndividual, productsPostedIndividualUpdate, deletePosted } from "../controllers/cliente.controller.js"
import multer from "multer"

const router = Router()
const upload = multer({storage: multer.memoryStorage()})

router.post('/cliente/crear', authRequired, upload.single('image'), registerProductService)
router.get('/cliente', authRequired, getClient)
router.get("/cliente/products", authRequired, productsPosted)
router.get("/cliente/products/:id", authRequired, productsPostedIndividual)
router.post("/cliente/products/update", upload.single('image'), authRequired, productsPostedIndividualUpdate)
router.post("/delete/:id", authRequired, deletePosted)

export default router