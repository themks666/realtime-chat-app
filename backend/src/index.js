import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.route.js";
import MessageRouter from "./routes/message.route.js";
import { connectDB } from "./lib/connect.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,            
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthRouter);
app.use("/api/messages", MessageRouter);

app.listen(PORT, async () => {
    await connectDB()
  console.log("Server runnning on port 3000");
});
