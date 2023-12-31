import { Router } from "express"
import { login, logout, profile, register } from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js"
import multer from "multer"

const router = Router()
const upload = multer({storage: multer.memoryStorage()})

router.post('/register', upload.single('image'), register)
router.post('/login', login)
router.post('/logout', logout)

export default router