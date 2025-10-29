import { IsEmail, } from "class-validator";

export class otpSendDto {
  @IsEmail()
  email: string;
}