import { PostController } from "../controllers/job-post.controller";
import * as express from "express"
import { authentication } from "../middleware/authentication";
import { postAuthorization } from "../middleware/post-authorization";
import { userRoles } from "../enum/user-roles.enum";
import { postValidator } from "../middleware/job-post.validator";
import { updatePostValidator } from "../middleware/validators/update-post.validator";
import { updatePostAuthorization } from "../middleware/update-post-authorization";
import { getClientPostAuthorization } from "../middleware/get-client-post-authorization";
const postRouter = express.Router()

// 
postRouter.post('/create-post', postValidator, authentication, postAuthorization(userRoles.CLIENT), PostController.createPost)
postRouter.put('/update-post/:id', updatePostValidator, authentication, updatePostAuthorization(userRoles.CLIENT), PostController.updatePost)
postRouter.delete('/delete-post/:id', authentication, updatePostAuthorization(userRoles.CLIENT), PostController.deletePost)
postRouter.get('/post/:id', /*authentication, postAuthorization(userRoles.CLIENT),*/ PostController.findPostById)
postRouter.get('/get-posts',/* authentication, postAuthorization(userRoles.CLIENT),*/ PostController.getAllPosts)
postRouter.get('/get-my-posts', authentication, getClientPostAuthorization(userRoles.CLIENT), PostController.getClientPosts)
postRouter.get('/my-post/:id', authentication, updatePostAuthorization(userRoles.CLIENT), PostController.findPostById)

export default postRouter