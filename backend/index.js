// import express from "express"
// import dotenv from "dotenv"
// dotenv.config()
// import connectDB from "./config/db.js"
// import authRouter from "./routes/auth.routes.js"
// import cookieParser from "cookie-parser"
// import cors from "cors"
// import userRouter from "./routes/user.routes.js"
// import websiteRouter from "./routes/website.routes.js"
// import billingRouter from "./routes/billing.routes.js"
// import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"

// // 🛡️ Safety net: catch anything that would otherwise silently kill the process
// process.on('unhandledRejection', (reason) => {
//     console.error('🔴 Unhandled Rejection:', reason)
// })
// process.on('uncaughtException', (err) => {
//     console.error('🔴 Uncaught Exception:', err)
// })

// const app = express()
// app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebhook)

// const port = process.env.PORT || 5000

// app.use(express.json())
// app.use(cookieParser())
// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))
// app.use("/api/auth",authRouter)
// app.use("/api/user",userRouter)

// app.use("/api/website",websiteRouter)
// app.use("/api/billing",billingRouter)

// const server = app.listen(port , ()=>{
//     console.log("server is started")
//     connectDB()
// })

// // 🛡️ Prevent Node's default request timeout from killing long AI generations
// server.timeout = 180000 // 3 minutes
// server.keepAliveTimeout = 180000
// server.headersTimeout = 185000




import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"
import billingRouter from "./routes/billing.routes.js"
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"

// 🛡️ Safety net
process.on('unhandledRejection', (reason) => {
    console.error('🔴 Unhandled Rejection:', reason)
})
process.on('uncaughtException', (err) => {
    console.error('🔴 Uncaught Exception:', err)
})

const app = express()

// 1. 🎯 THE ONLY WEBHOOK ENDPOINT (Must stay above express.json())
app.post(
    "/api/billing/webhook", 
    express.raw({ type: "application/json" }), 
    stripeWebhook
)

const port = process.env.PORT || 5000

// 2. ⚙️ GLOBAL MIDDLEWARES (Safe for all other JSON routes)
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// 3. 📂 ROUTERS
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/website", websiteRouter)
app.use("/api/billing", billingRouter) // This handles POST /api/billing/ for checkouts

const server = app.listen(port , ()=>{
    console.log(`Server started on port ${port}`)
    connectDB()
})

// 🛡️ Prevent timeouts for long AI generations
server.timeout = 180000 
server.keepAliveTimeout = 180000
server.headersTimeout = 185000
