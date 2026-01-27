import * as express from "express"
import { authentication } from "../middleware/authentication";
import { userRoles } from "../enum/user-roles.enum";
import { createContract,
    updateContract,
    deleteContract,
    getAllContractsByClientId,
    getContractInformation,
    getContractsByFreelancerIdAndStatus,
    getAllContractsByFreelancerId,
    getContractsByClientIdAndStatus,
    getContractsByStatus,
    updateContractStatus,
    acceptContract,
    rejectContract,
    completeContract,
    submitContract,
    cancelContract
 } from "../controllers/contract.controller";
import { ContractAuthorization } from "../middleware/contract-authorization/contract-authorization";
import { userSpecificContractAuthorization } from "../middleware/contract-authorization/contract-ownership-authorization";
import { contractValidator } from "../middleware/validators/contract.dto";
import { updateContractValidator } from "../middleware/validators/update-contract.dto";

const contractRouter = express.Router()

// Create Contract Routes - With auth and role-based authorization to prevent access errors
contractRouter.post('/create-contract', 
    contractValidator,
    authentication, 
    ContractAuthorization([userRoles.CLIENT]), 
    createContract)

contractRouter.put('/update-contract/:id', 
    updateContractValidator,
    authentication, 
    userSpecificContractAuthorization([userRoles.CLIENT]), 
    updateContract)

contractRouter.delete('/delete-contract/:id',
    authentication, 
    userSpecificContractAuthorization([userRoles.CLIENT]), 
    deleteContract)

//just for the reminder. some status changed can only be executed by freelancer and some by client. Add that in authorization layer. Or better separate contract status updates 
contractRouter.put('/update-status/:id', 
    updateContractValidator,
    authentication, 
    userSpecificContractAuthorization([userRoles.CLIENT, userRoles.FREELANCER]), 
    updateContractStatus)


contractRouter.put('/accept-contract/:id', 
    updateContractValidator,
    authentication, 
    userSpecificContractAuthorization([userRoles.FREELANCER]), 
    acceptContract)

contractRouter.get('/cancel-contract/:id',
    updateContractValidator,
    authentication,
    userSpecificContractAuthorization([userRoles.CLIENT]),
    cancelContract
)

contractRouter.put('/reject-contract/:id', 
    updateContractValidator,
    authentication, 
    userSpecificContractAuthorization([userRoles.FREELANCER]), 
    rejectContract)


contractRouter.put('/submit-contract/:id',
    updateContractValidator,
    authentication,
    userSpecificContractAuthorization([userRoles.FREELANCER]),
    submitContract
)
contractRouter.put('/complete-contract/:id', 
    updateContractValidator,
    authentication, 
    userSpecificContractAuthorization([userRoles.CLIENT]), 
    completeContract)



contractRouter.get('/get-client-contracts', 
    authentication,
    userSpecificContractAuthorization([userRoles.CLIENT]),
    getAllContractsByClientId)

contractRouter.get('/get-freelancer-contracts', 
    authentication,
    userSpecificContractAuthorization([userRoles.FREELANCER]),
    getAllContractsByFreelancerId)

contractRouter.get('/get-client-contracts-with-status',     
    authentication,
    userSpecificContractAuthorization([userRoles.CLIENT]),
    getContractsByClientIdAndStatus)

contractRouter.get('/get-freelancer-contracts-with-status', 
    authentication,
    userSpecificContractAuthorization([userRoles.FREELANCER]),
    getContractsByFreelancerIdAndStatus)

contractRouter.get('/get-contract-info/:id', 
    authentication,
    userSpecificContractAuthorization([userRoles.CLIENT, userRoles.FREELANCER]),
    getContractInformation)



export default contractRouter