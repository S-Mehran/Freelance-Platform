import { Request, Response } from "express";
import { clientRepository, freelancerRepository, userRepository } from "../repository/index";
import Encrypt from "../helpers/encrypt.helper";
import { mailService } from "../service/mail.service";
import { userRoles } from "../enum/user-roles.enum";
import { Freelancer } from "../entity/freelancer";
import { Client } from "../entity/client";


const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const {MODE} = process.env
export class AuthController {
  static async registerUser(req: Request, res: Response) {
    const user = await userRepository.createUser(req.body);
    if (user.role===userRoles.FREELANCER) {
      let newFreelancer = new Freelancer()
      newFreelancer.user = user
      await freelancerRepository.createFreelancer(newFreelancer)
    }
    if (user.role===userRoles.CLIENT) {
      let newClient = new Client()
      newClient.user = user
      await clientRepository.createClient(newClient)
    }
    const userWithOtp = await userRepository.generateOtp(user.email)
    if (MODE!=="development"){
    const sendOtp = await mailService.sendOtpMail(user.email, userWithOtp.otpCode)
  }
    return res.status(201).json(user);
  }
  
  static async sendOtp(req: Request, res: Response) {
    const {email} = req.body
    const user = await userRepository.generateOtp(email)
    const sentOtp = await mailService.sendOtpMail(email, user.otpCode)
    return res.status(200).json({message: "email sent successfully"})
  }

  static async confirmOtp(req: Request, res: Response) {
    const {email, otp} = req.body
    const result = await userRepository.confirmOtp(email, otp)
    if (result===false) {
      return res.status(401).json({message: "Invalid OTP"})
    }
    return res.status(200).json({message: "User Verified"});
  }

  static async resetPassword(req: Request, res: Response) {
    const {email, newPassword, confirmPassword} = req.body
    const user = await userRepository.updatePassword(email, newPassword, confirmPassword)
    if (!user) {
      return res.status(401).json({message: "Invalid Email or Passwords does not match"})
    }
    return res.status(200).json({message: user});

  }

  static async loginUser(req: Request, res: Response) {
    console.log("Request Recieved")
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);
    // if (user) {
    //   return res.status(401).json({ message: `Password: ${user.password}` });
    // }
    if (!user || !(await Encrypt.comparePassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = await Encrypt.generateToken({ id: user.id });
    const refreshToken = await Encrypt.generateRefreshToken({ id: user.id });
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure:false,
    })
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure:false,
    })
    return res.status(200).json({ user });
  }


    static async profile(req: Request, res: Response) {
    const user = req.headers["user"] as any;

    const foundUser = await userRepository.findById(user.id);

    if (foundUser) {
      return res.status(200).json({message: foundUser});
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  }


  static async refreshToken(req: Request, res: Response) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
      const payload = await Encrypt.verifyToken(refreshToken);
      const newToken = await Encrypt.generateToken({ id: payload.id });
      const newRefreshToken = await Encrypt.generateRefreshToken({
        id: payload.id,
      });
      return res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }


    static async logout(req: Request, res: Response) {
      console.log("Loggin out")
      res.clearCookie(ACCESS_TOKEN_KEY);
      res.clearCookie(REFRESH_TOKEN_KEY);
      return res.status(200).json({ message: "Logged out successfully" });
    }
}