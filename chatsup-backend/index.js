import "./env.js";
import express from "express";
import http from "http";
import cors from "cors";
import {Server} from "socket.io";
import connectDB from "./src/config/dbconfig.js";
import UserRoutes from "./src/routes/User.routes.js";
import ChatRoutes from "./src/routes/Chat.routes.js";
import Auth from "./src/middlewares/jwtmiddleware.js"
import cookieParser from "cookie-parser";
const app = express();
const server = http.createServer();
const io = new Server(server, {
    cors: {
      origin: "*", // Replace with your frontend's origin
      methods: ["GET", "POST"],
    },
  });


// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res)=>{
res.json("welcome to chat app ");
});

// User Routes

app.use("/api/user",UserRoutes);
app.use("/api/chats",Auth,ChatRoutes);



app.listen(process.env.PORT,(req,res)=>{
    connectDB();
    console.log(`server is running at http://localhost:${process.env.PORT}`);
});