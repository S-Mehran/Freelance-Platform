import {Request, Response, NextFunction} from "express"
import { clientRepository, userRepository } from "../../repository"
import { userRoles } from "../../enum/user-roles.enum"
import { User } from "../../entity"
import { Freelancer } from "../../entity/freelancer"

export const proposalAuthorization = (role: string) => {
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
            return res.status(403).json({message: `Sign up as ${userRoles.FREELANCER} to send a proposal`})
        }
            console.log("Does it stop here", userData.freelancer)

        req.body = {...req.body, freelancerId: userData.freelancer.id}
        console.log("auth6", req.body)
    next()

    }
}