import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import homeRoutes from "./routes/home.routes.js"
import clientRoutes from "./routes/cliente.routes.js"

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())
app.use("/api", authRoutes)
app.use("/api", homeRoutes)
app.use("/api", clientRoutes)

export default app;