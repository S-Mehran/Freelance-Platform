import {Request, Response, NextFunction} from "express"
import { userRepository } from "../repository"
import { userRoles } from "../enum/user-roles.enum"

export const postAuthorization = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            console.log("auth4")
        const user = req.headers.user
        if (!user) {res.status(404).json({
            message: "Authorization Failed. User not found"})
        }
        console.log("auth5")
        const userData = await userRepository.findById(user.id)
        if (userData && userData.role !== role) {
            res.status(403).json({message: `Sign up as ${userRoles.CLIENT} to post job`})
        }
        console.log("auth6")
    next()
    }catch(error) {
    res.status(500).json({message: "Error authorizing user"})
    }
    }
}