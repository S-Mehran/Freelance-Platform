import "reflect-metadata"
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { validate,  ValidationError } from "class-validator";
import { CreateContractDto } from "../../dto/contract.dto";

export const contractValidator = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const contractDto = plainToInstance(CreateContractDto, req.body);
    const errors: ValidationError[] = await validate(contractDto)

    if (errors.length>0){
        const errorMessages = errors.map((error)=> Object.values(error.constraints || {})).flat()
        return res.status(400).json({ errors: errorMessages });
    } else{
        next()
    }
}