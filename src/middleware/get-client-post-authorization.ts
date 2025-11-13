import {Request, Response, NextFunction} from "express"
import { postRepository, userRepository } from "../repository"
import { userRoles } from "../enum/user-roles.enum"
import { User } from "../entity"

export const getClientPostAuthorization = (role: string) => {
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
        if (userData && userData.role !== role) {
            return res.status(403).json({message: `Sign up as ${userRoles.CLIENT} to see your job posts`})
        }

        const clientId = userData.client.id

        req.params.id = clientId as any

        console.log("Req params", req.params)
    next()

    }
}