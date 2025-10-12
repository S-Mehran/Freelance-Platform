import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { userValidator, loginValidator, otpValidator } from "../middleware/index";
const Router = express.Router();

Router.post("/login", loginValidator, AuthController.loginUser);
Router.post("/register", userValidator, AuthController.registerUser);
Router.post("/verify", AuthController.sendOtp)
Router.post("/confirm-otp", AuthController.confirmOtp)
Router.post("/forgot-password", AuthController.forgotPassword)

export { Router as authRouter };
