//Implement dto for freelancer and client. e.g. review be between 0 and 5

import { IsString, IsEmail, IsOptional, IsEnum, Length } from "class-validator";
import { userRoles } from "../enum/user-roles.enum";

export class PostDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 30, {message: "Password must be between 8 and 30 characters long"})
  password: string;

  @IsOptional()
  @IsEnum(userRoles, { message: "Role must be one of: admin, freelancer, client" })
  role: userRoles;
}