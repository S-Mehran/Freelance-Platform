import { Repository } from "typeorm";
import { User } from "../entity/index";
import Encrypt from "../helpers/encrypt.helper";
import { Freelancer } from "../entity/freelancer";
import { userRoles } from "../enum/user-roles.enum";
import { Client } from "../entity/client";

export class UserService {
  constructor(private userRepository: Repository<User>) {}


}