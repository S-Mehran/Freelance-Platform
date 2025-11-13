import { Repository } from "typeorm";
import { User } from "../entity/index";
import Encrypt from "../helpers/encrypt.helper";
const {MODE} = process.env
export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['client', 'freelancer'],
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(user: User): Promise<User> {
    const payload = {
      ...user,
      password: await Encrypt.hashPassword(user.password),
    };

    const newUser = this.userRepository.create(payload);
    //Replace this code with cascade:true in entity
  // switch (newUser.role) {
  //   case userRoles.FREELANCER:
  //     const freelancer = new Freelancer()

  //     freelancer.id = payload.id
  //     newUser.freelancer = new Freelancer();

  //     break;

  //   case userRoles.CLIENT:
  //     newUser.client = new Client();
  //     break;
  // }

    await this.userRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;

    this.userRepository.merge(user, userData);
    await this.userRepository.save(user);
    return user;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userRepository.delete({ id });
    return result.affected !== 0;
  }
  
  async generateOtp(email: string): Promise<User | null> {
    let otp = Math.floor(100000 + Math.random() * 900000).toString();
    if (MODE==="development") {
      otp = "000000"
    }
    const user = await this.userRepository.findOneBy({email})
    if (!user) return null

    user.otpCode = otp
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000)
    await this.userRepository.save(user);
    return user;
  }

  async confirmOtp(email: string, otp:string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({email})
    if (!user) return false

    if (user.otpCode!==otp) {
      return false
    }
    const currTime = new Date(Date.now())
    if (user.otpExpiresAt<currTime){
      return false
    }
    return true
  }

  async updatePassword(email:string, newPassword: string, confirmPassword: string): Promise<User|null>{
    const user = await this.userRepository.findOneBy({email})
    if (!user) return null
    if (newPassword!==confirmPassword) {
      return null
    }
    const hashedPassword = await Encrypt.hashPassword(confirmPassword)
    user.password = hashedPassword
    //this.userRepository.merge()
    await this.userRepository.save(user)
    return user
  }
}