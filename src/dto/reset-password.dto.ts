import { IsString, IsEmail, Length } from "class-validator";

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 30, {message: "Password must be between 8 and 30 characters long"})
  newPassword: string;

  @IsString()
  @Length(8, 30, {message: "Password must be between 8 and 30 characters long"})
  confirmPassword: string;
}