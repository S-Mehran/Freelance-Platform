import * as express from "express"
import { authentication } from "../middleware/authentication";
import { userRoles } from "../enum/user-roles.enum";
import { proposalAuthorization } from "../middleware/proposal-authorization/proposal-authorization";
import { userSpecificProposalAuthorization } from "../middleware/proposal-authorization/authorize-post-ownership-authorization";
import { getFreelancerProposalAuthorization } from "../middleware/proposal-authorization/get-freelancer-proposal-authorization";
import { ProposalController } from "../controllers/proposal.controller";
import { proposalValidator } from "../middleware/validators/proposal.validator";
import { updateProposalValidator } from "../middleware/validators/update-proposal.validator";

const proposalRouter = express.Router()

// Create Proposal Route - With auth and role-based authorization to prevent access errors
proposalRouter.post('/create-proposal', 
    proposalValidator,
    authentication, 
    proposalAuthorization(userRoles.FREELANCER), 
    ProposalController.createProposal)

// Update Proposal Route - Includes ownership check to avoid unauthorized update errors
proposalRouter.put('/update-proposal/:id', 
    updateProposalValidator,
    authentication, 
    userSpecificProposalAuthorization(userRoles.FREELANCER), 
    ProposalController.updateProposal)

proposalRouter.put('/accept-proposal/:id',
    updateProposalValidator,
    authentication, 
    userSpecificProposalAuthorization(userRoles.CLIENT),
    ProposalController.updateProposal
)

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

proposalRouter.get('/get-freelancer-proposal/:id',
    authentication,
    ProposalController.findProposalById
)


export default proposalRouter