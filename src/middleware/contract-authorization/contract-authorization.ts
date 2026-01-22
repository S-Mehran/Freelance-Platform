import {Request, Response, NextFunction} from "express"
import { contractRepository, proposalRepository, userRepository } from "../../repository"
import { userRoles } from "../../enum/user-roles.enum"

export const ContractAuthorization = (roles: string[]) => {
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
            req.user = {
                id: userData.freelancer.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                role: userData.role,
            }
        }

        else if (userData.role===userRoles.CLIENT) {
            req.user = {
                id: userData.client.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                role: userData.role,
            }
        }

        if (req.user.id!==req.body.clientId) {
            return res.status(403).json({message: "You are not allowed to access this resource"})
        }
        
    next()

    }
}