import * as express from "express";
import { authentication } from "../middleware/authentication";
import { authorization } from "../middleware/index";
import { userRoles } from "../enum/user-roles.enum";
import { userRepository } from "../repository";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
//import { AppointmentController } from "../controllers/protected.controller";
//import { protectedValidator } from "../middleware/appointment.validator";

const Router = express.Router();

Router.post(
  "/access-profile",
  authentication,
  authorization([userRoles.CLIENT]),
//  protectedValidator,
 UserController.getUserByEmail
);

export { Router as protectedRouter };