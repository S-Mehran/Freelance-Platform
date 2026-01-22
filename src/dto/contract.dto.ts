import { 
  IsNumber, 
  IsEnum, 
  IsOptional, 
  IsDateString,
  Min,
  IsInt,
  ValidateIf,
} from "class-validator";
import { Transform } from "class-transformer";
import { contractStatus } from "../enum/contract-status.enum";

// ============================================
// CREATE CONTRACT DTO
// ============================================
export class CreateContractDto {
  
  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return value;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsInt({ message: "Proposal ID must be an integer" })
  proposalId: number;

  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return value;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsInt({ message: "Client ID must be an integer" })
  clientId: number;

  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return value;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsInt({ message: "Freelancer ID must be an integer" })
  freelancerId: number;

  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return value;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsInt({ message: "Post ID must be an integer" })
  postId: number;

  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return value;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsNumber({}, { message: "Agreed price must be a number" })
  @Min(0.01, { message: "Agreed price must be greater than zero" })
  agreedPrice: number;

  @IsDateString({}, { message: "Start date must be a valid date (YYYY-MM-DD or ISO format)" })
  startDate: string;

  @IsDateString({}, { message: "End date must be a valid date (YYYY-MM-DD or ISO format)" })
  endDate: string;
}

// ============================================
// UPDATE CONTRACT DTO
// ============================================
export class UpdateContractDto {
  
  @IsOptional()
  @IsDateString({}, { message: "Start date must be a valid date (YYYY-MM-DD or ISO format)" })
  startDate?: string;

  @IsOptional()
  @IsDateString({}, { message: "End date must be a valid date (YYYY-MM-DD or ISO format)" })
  endDate?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === "" || value === null || value === undefined) return undefined;
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
  })
  @IsNumber({}, { message: "Agreed price must be a number" })
  @Min(0.01, { message: "Agreed price must be greater than zero" })
  agreedPrice?: number;

  // Note: Status should be updated through specific endpoints, not general update
  // But if you want to allow it:
  @IsOptional()
  @IsEnum(contractStatus, { 
    message: `Status must be one of: ${Object.values(contractStatus).join(', ')}` 
  })
  status?: contractStatus;
}

