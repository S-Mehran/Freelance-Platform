import * as express from "express"
import { authentication } from "../middleware/authentication";
import { userRoles } from "../enum/user-roles.enum";
import { postValidator } from "../middleware/job-post.validator";
import { proposalAuthorization } from "../middleware/proposal-authorization/proposal-authorization";
import { updatePostValidator } from "../middleware/validators/update-post.validator";
import { userSpecificProposalAuthorization } from "../middleware/proposal-authorization/authorize-post-ownership-authorization";
import { getFreelancerProposalAuthorization } from "../middleware/proposal-authorization/get-freelancer-proposal-authorization";
import { ProposalController } from "../controllers/proposal.controller";

const proposalRouter = express.Router()

// 
proposalRouter.post('/create-proposal', 
    authentication, 
    proposalAuthorization(userRoles.FREELANCER), 
    ProposalController.createProposal)

proposalRouter.put('/update-proposal/:id', 
    authentication, 
    userSpecificProposalAuthorization(userRoles.FREELANCER), 
    ProposalController.updateProposal)

proposalRouter.delete('/delete-proposal/:id', 
    authentication, 
    userSpecificProposalAuthorization(userRoles.FREELANCER), 
    ProposalController.deleteProposal)

proposalRouter.get('/proposal/:id', /*authentication, postAuthorization(userRoles.CLIENT),*/ ProposalController.findProposalById)

proposalRouter.get('/get-proposals',/* authentication, postAuthorization(userRoles.CLIENT),*/ ProposalController.getAllProposals)

proposalRouter.get('/get-my-proposals', 
    authentication, 
    getFreelancerProposalAuthorization(userRoles.FREELANCER), 
    ProposalController.getFreelancerProposals)

proposalRouter.get('/my-proposal/:id', 
    authentication, 
    userSpecificProposalAuthorization(userRoles.FREELANCER), 
    ProposalController.findProposalById)

export default proposalRouter