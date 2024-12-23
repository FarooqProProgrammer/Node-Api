import express from "express"
import AuthController from "../controller/auth-controller.js";
const authRoute = express.Router();


authRoute.post("/register",AuthController.Register)
authRoute.post("/login",AuthController.Login)


export default authRoute