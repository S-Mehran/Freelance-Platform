import { Request, Response } from "express";
import { userRepository } from "../repository/index";
import Encrypt from "../helpers/encrypt.helper";
import { mailService } from "../service/mail.service";

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    const user = await userRepository.createUser(req.body);
    const userWithOtp = await userRepository.generateOtp(user.email)
    const sendOtp = await mailService.sendOtpMail(user.email, userWithOtp.otpCode)
    res.status(201).json(user);
  }
  
  static async sendOtp(req: Request, res: Response) {
    const {email} = req.body
    const user = await userRepository.generateOtp(email)
    const sentOtp = await mailService.sendOtpMail(email, user.otpCode)
    res.status(200).json({message: "email sent successfully"})
  }

  static async confirmOtp(req: Request, res: Response) {
    const {email, otp} = req.body
    const result = await userRepository.confirmOtp(email, otp)
    if (result===false) {
      return res.status(401).json({message: "Invalid OTP"})
    }
    res.status(200).json({message: "User Verified"});
  }

  static async resetPassword(req: Request, res: Response) {
    const {email, newPassword, confirmPassword} = req.body
    const user = await userRepository.updatePassword(email, newPassword, confirmPassword)
    if (!user) {
      return res.status(401).json({message: "Invalid Email or Passwords does not match"})
    }
    res.status(200).json({message: user});

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
    res.status(200).json({ user });
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
      res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
    } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  }
}