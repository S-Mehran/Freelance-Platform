import {Request, Response, NextFunction} from "express"
import { contractRepository, postRepository, proposalRepository, userRepository } from "../../repository"
import { userRoles } from "../../enum/user-roles.enum"

export const userSpecificContractAuthorization = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log("auth4", req.headers['user'])
        const user = req.headers["user"] as any
        console.log(user)
        if (!user) {
            return res.status(404).json({
            message: "Authorization Failed. User not found"})
        }
        console.log("auth5")
        
        const userData = await userRepository.findById(user.id)
        console.log("User Data", userData)
        if (userData && !roles.includes(userData.role)) {
            return res.status(403).json({message: `You are not allowed to access this resource`})
        }

        if (userData.role===userRoles.FREELANCER) {
            console.log("freelancer", req.params.id)
            if (req.params.id) {
            const contract = await contractRepository.findById(Number(req.params.id))
            if (!contract) {
                return res.status(404).json({message: "Contract Not Found"})
            }
            if (contract.freelancerId!==userData.freelancer.id) {
                return res.status(403).json({message: "Forbidden"})
            }
        }
        console.log('Works till here')
            req.user = {
                id: userData.freelancer.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                role: userData.role,
            }
        }

        else if (userData.role===userRoles.CLIENT) {
            console.log("client", req.params.id)
            //will check for mismatch between contract's client id and userData client id when 
            //a specfic contract is being retrieved for which req.params.id will be provided
            if (req.params.id) {
            const contract = await contractRepository.findById(Number(req.params.id))
            if (!contract) {
                return res.status(404).json({message: "Contract Not Found"})
            }
            if (contract.clientId!==userData.client.id) {
                return res.status(403).json({message: "Forbidden"})
            }
        }
            console.log("works till here")
            req.user = {
                id: userData.client.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                role: userData.role,
            }
            console.log("Req dot user", req.user)
        }

        console.log(req.user)
        
    next()

    }
}