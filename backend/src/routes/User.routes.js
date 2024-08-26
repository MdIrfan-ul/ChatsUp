import express from "express";
import { getUsers, logout, Signin, Signup } from "../controllers/UserControllers.js";
import { multerErrorHandler, upload } from "../middlewares/profile_middelware.js";
import Auth from "../middlewares/jwtmiddleware.js";

const UserRoutes = express.Router();

UserRoutes.post("/signup", upload,multerErrorHandler,Signup);

UserRoutes.post("/signin",Signin);
UserRoutes.get('/',Auth,getUsers);
UserRoutes.get('/logout',logout);
export default UserRoutes;
