import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import * as dotenv from 'dotenv'

dotenv.config()

const {JWT_SECRET, SALT_ROUNDS} = process.env

export default class Encrypt {

  static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(Number(SALT_ROUNDS))
        const hashing = await bcrypt.hash(password, salt)
        return hashing
    }
  static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    console.log(password, hashedPassword)
    const result = await bcrypt.compare(password, hashedPassword)
    return result;
  }

  static async generateToken(payload: any): Promise<string> {
    return await jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  }

  static async generateRefreshToken(payload: any): Promise<string> {
    return await jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null;
    }
  }
}