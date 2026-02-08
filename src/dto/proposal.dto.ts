// dtos/proposal.dto.ts
import { 
  IsString, 
  IsNumber, 
  IsEnum, 
  IsOptional,
  IsInt,
  Min,
  Max,
  Length,
  IsNotEmpty,
} from "class-validator";
import { Transform } from "class-transformer";
import { bidType } from "../enum/bid-type.enum";
import { proposalStatus } from "../enum/proposal-status.enum";

export class CreateProposalDto {
  

  @IsString({ message: "Cover letter must be a string" })
  @IsNotEmpty({ message: "Cover letter is required" })
  @Length(50, 2000, { message: "Cover letter must be between 50 and 2000 characters" })
  coverLetter: string;

  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return value;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsNumber({}, { message: "Bid amount must be a number" })
  @Min(1, { message: "Bid amount must be at least 1" })
  bidAmount: number;

  @IsEnum(bidType, { 
    message: `Bid type must be one of: ${Object.values(bidType).join(', ')}` 
  })
  bidType: bidType;

  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return value;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsInt({ message: "Estimated delivery days must be an integer" })
  @Min(1, { message: "Estimated delivery days must be at least 1" })
  @Max(365, { message: "Estimated delivery days cannot exceed 365" })
  estimatedDeliveryDays: number;

  @IsOptional()
  @IsString({ message: "Attachment path must be a string" })
  attachment?: string;
}

export class UpdateProposalDto {
  
  @IsOptional()
  @IsString({ message: "Cover letter must be a string" })
  @Length(50, 2000, { message: "Cover letter must be between 50 and 2000 characters" })
  coverLetter?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return undefined;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsNumber({}, { message: "Bid amount must be a number" })
  @Min(1, { message: "Bid amount must be at least 1" })
  bidAmount?: number;

  @IsOptional()
  @IsEnum(bidType, { 
    message: `Bid type must be one of: ${Object.values(bidType).join(', ')}` 
  })
  bidType?: bidType;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return undefined;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsInt({ message: "Estimated delivery days must be an integer" })
  @Min(1, { message: "Estimated delivery days must be at least 1" })
  @Max(365, { message: "Estimated delivery days cannot exceed 365" })
  estimatedDeliveryDays?: number;

  @IsOptional()
  @IsString({ message: "Attachment path must be a string" })
  attachment?: string;

  @IsOptional()
  @IsEnum(proposalStatus, { 
    message: `Status must be one of: ${Object.values(proposalStatus).join(', ')}` 
  })
  status?: proposalStatus;
}