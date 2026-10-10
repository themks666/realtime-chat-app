import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.route.js"
import MessageRouter from "./routes/message.route.js"
dotenv.config()

const app = express()


app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/auth", AuthRouter)
app.use("/api/messages", MessageRouter)


app.listen(3000, ()=>{console.log("Server runnning on port 3000");
})