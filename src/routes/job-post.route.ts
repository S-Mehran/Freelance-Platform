import { PostController } from "../controllers/job-post.controller";
import * as express from "express"
import { authentication } from "../middleware/authentication";
import { postAuthorization } from "../middleware/post-authorization";
import { userRoles } from "../enum/user-roles.enum";
const postRouter = express.Router()

postRouter.post('/create', authentication, postAuthorization(userRoles.CLIENT), PostController.createPost)

export default postRouter