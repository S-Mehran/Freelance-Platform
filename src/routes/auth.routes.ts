import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { userValidator, loginValidator, otpValidator } from "../middleware/index";
import { resetPasswordValidator } from "../middleware/validators/reset-password.validator";
import { confirmOtpValidator } from "../middleware/validators/confirm-otp.validator";
import { authentication } from "../middleware/authentication";
const Router = express.Router();

Router.post("/login", loginValidator, AuthController.loginUser);
Router.post("/register", userValidator, AuthController.registerUser);
Router.post("/send-otp", otpValidator, AuthController.sendOtp)
Router.post("/confirm-otp", confirmOtpValidator, AuthController.confirmOtp)
Router.post("/reset-password", resetPasswordValidator, AuthController.resetPassword)
Router.get("/profile", authentication, AuthController.profile);
Router.get("/logout", authentication, AuthController.logout);


export { Router as authRouter };
