import { PostController } from "../controllers/job-post.controller";
import * as express from "express"
import { authentication } from "../middleware/authentication";
import { userRoles } from "../enum/user-roles.enum";
import { postValidator } from "../middleware/job-post.validator";
import { proposalAuthorization } from "../middleware/proposal-authorization/proposal-authorization";
import { updatePostValidator } from "../middleware/validators/update-post.validator";
import { userSpecificProposalAuthorization } from "../middleware/proposal-authorization/authorize-post-ownership-authorization";
import { getFreelancerProposalAuthorization } from "../middleware/proposal-authorization/get-freelancer-proposal-authorization";

const postRouter = express.Router()

// 
postRouter.post('/create-proposal', 
    postValidator, 
    authentication, 
    proposalAuthorization(userRoles.FREELANCER), 
    PostController.createPost)

postRouter.put('/update-proposal/:id', 
    updatePostValidator, 
    authentication, 
    userSpecificProposalAuthorization(userRoles.FREELANCER), 
    PostController.updatePost)

postRouter.delete('/delete-proposal/:id', 
    authentication, 
    userSpecificProposalAuthorization(userRoles.FREELANCER), 
    PostController.deletePost)

postRouter.get('/proposal/:id', /*authentication, postAuthorization(userRoles.CLIENT),*/ PostController.findPostById)
postRouter.get('/get-proposals',/* authentication, postAuthorization(userRoles.CLIENT),*/ PostController.getAllPosts)

postRouter.get('/get-my-proposals', 
    authentication, 
    getFreelancerProposalAuthorization(userRoles.FREELANCER), 
    PostController.getClientPosts)

postRouter.get('/my-proposal/:id', 
    authentication, 
    userSpecificProposalAuthorization(userRoles.FREELANCER), 
    PostController.findPostById)

export default postRouter