import { IsEmail, IsString, Length } from "class-validator";

export class ConfirmOtpDto {
  @IsEmail({}, { message: "Please provide a valid email address" })
  email: string;

  @IsString()
  @Length(4, 6, { message: "OTP must be between 4 and 6 characters long" })
  otp: string;
}
