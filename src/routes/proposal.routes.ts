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

// Create Proposal Route - With auth and role-based authorization to prevent access errors
proposalRouter.post('/create-proposal', 
    authentication, 
    proposalAuthorization(userRoles.FREELANCER), 
    ProposalController.createProposal)

// Update Proposal Route - Includes ownership check to avoid unauthorized update errors
proposalRouter.put('/update-proposal/:id', 
    authentication, 
    userSpecificProposalAuthorization(userRoles.FREELANCER), 
    ProposalController.updateProposal)

// Delete Proposal Route - Secure deletion with auth to fix permission-related bugs
proposalRouter.delete('/delete-proposal/:id', 
    authentication, 
    userSpecificProposalAuthorization(userRoles.FREELANCER), 
    ProposalController.deleteProposal)

// Additional GET routes for fetching proposals
proposalRouter.get('/proposal/:id', ProposalController.findProposalById)

proposalRouter.get('/get-proposals', ProposalController.getAllProposals)

proposalRouter.get('/get-my-proposals', 
    authentication, 
    getFreelancerProposalAuthorization(userRoles.FREELANCER), 
    ProposalController.getFreelancerProposals)

proposalRouter.get('/my-proposal/:id', 
    authentication, 
    userSpecificProposalAuthorization(userRoles.FREELANCER), 
    ProposalController.findProposalById)


proposalRouter.get('/get-post-proposals/:id',
    authentication,
    ProposalController.getPostProposals
)

export default proposalRouter