//Implement dto for freelancer and client. e.g. review be between 0 and 5
import { IsString, IsOptional, IsEnum, Length, IsNumber, 
  IsArray, 
  ArrayNotEmpty,
  ArrayMinSize,
  IsNumberString,
 } from "class-validator";
import { Transform } from "class-transformer";
import { levelOfExpertise } from "../enum/level-of-expertise.enum";
import { projectType } from "../enum/project-type.enum";

export class PostDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  summary: string;

  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return value;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsNumber({}, { message: "Price must be a number" })
  price: number;

  @IsEnum(levelOfExpertise, { message: "Options are entry level, intermediate and expert" })
  levelOfExpertiseRequired: levelOfExpertise;

  @IsOptional()
  @IsArray({ message: "Skills must be provided as an array" })
  @ArrayMinSize(1, { message: "At least one skill must be specified" })
  skillsRequired: string[]

  @IsEnum(projectType, { message: "Project option not valid" })
  projectType: projectType;

}

export class UpdateJobPostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return undefined;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsNumber({}, { message: "Price must be a number" })
  price?: number;

  @IsOptional()
  @IsEnum(levelOfExpertise, {
    message: "Options are entry level, intermediate, and expert",
  })
  levelOfExpertiseRequired?: levelOfExpertise;

  @IsOptional()
  @IsArray({ message: "Skills must be provided as an array" })
  @ArrayMinSize(1, { message: "At least one skill must be specified" })
  skillsRequired?: string[];

  @IsOptional()
  @IsEnum(projectType, { message: "Project option not valid" })
  projectType?: projectType;
}
