import { Request, Response } from "express";
import { userRepository,
  clientRepository,
  freelancerRepository
 } from "../repository/index";
import { mailService } from "../service/mail.service";
import { userRoles } from "../enum/user-roles.enum";
import { Client } from "../entity/client";
import { Freelancer } from "../entity/freelancer";
export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    const users = await userRepository.findAll();
    res.json(users);
  }

  //const {patientId} = req.body
  //patient = findbypatientId
  //createAppointment(...req.body, patient)
  static async getUserByEmail(req: Request, res: Response) {
    const {email} = req.body
    const user = await userRepository.findByEmail(email)
    console.log("User by email", (await user).firstName)
    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }
    res.status(200).json(user)
  }

  static async createUser(req: Request, res: Response) {
    const user = await userRepository.createUser(req.body);
    if (user.role===userRoles.CLIENT) {
      let newClient = new Client()
      newClient.user = user
      await clientRepository.createClient(newClient)
    }
    if (user.role===userRoles.FREELANCER) {
      let newFreelancer = new Freelancer()
      newFreelancer.user = user
      await freelancerRepository.createFreelancer(newFreelancer)
    }
    res.status(201).json(user);
  }

  static async updateUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const user = await userRepository.updateUser(userId, req.body);
    res.status(200).json(user);
  }

  static async deleteUser(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const isDeleted = await userRepository.delete(userId);
    if (!isDeleted) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(null);
    }
  }
}