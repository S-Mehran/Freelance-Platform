import {Request, Response, NextFunction} from "express"
import { proposalRepository, userRepository } from "../../repository"
import { userRoles } from "../../enum/user-roles.enum"

export const userSpecificProposalAuthorization = (role: string) => {
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
        if (!userData || userData.role !== role) {
            return res.status(403).json({message: `Sign up as ${userRoles.FREELANCER} to access this resource`})
        }

        const freelancerId = userData.freelancer.id

        const proposalData = await proposalRepository.findById(Number(req.params.id))
        
        console.log(proposalData)

        if (!proposalData) {
            return res.status(404).json({message: "Proposal not Found"})
        }
        if (freelancerId!==proposalData.freelancer.id) {
            return res.status(403).json({message: `Forbidden`})
        }
        

        console.log("auth6", req.body)
    next()

    }
}