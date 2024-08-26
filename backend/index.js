import "./env.js";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/dbconfig.js";
import UserRoutes from "./src/routes/User.routes.js";
import Auth from "./src/middlewares/jwtmiddleware.js"
import cookieParser from "cookie-parser";
import MessageRoutes from "./src/routes/Message.routes.js";

import {app,server} from "./socket/socket.js";



// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));  // Increase the JSON payload limit
app.use(express.urlencoded({ limit: '10mb', extended: true }));  // Increase URL-encoded payload limit
app.use(express.static('uploads'));
app.use(cookieParser());

app.get('/',(req,res)=>{
res.json("welcome to chat app ");
});

// User Routes

app.use("/api/user",UserRoutes);
app.use("/api/messages",Auth,MessageRoutes);



server.listen(process.env.PORT,(req,res)=>{
    connectDB();
    console.log(`server is running at http://localhost:${process.env.PORT}`);
});