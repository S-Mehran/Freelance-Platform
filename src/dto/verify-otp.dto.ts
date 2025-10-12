import { IsString, IsEmail, IsOptional, minLength, min } from "class-validator";

export class otpVerifyDto {
  @IsEmail()
  email: string;
}