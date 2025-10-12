import { IsString, IsEmail, IsOptional, minLength, min } from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}