import "reflect-metadata";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { UpdateContractDto } from "../../dto/contract.dto";

export const updateContractValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateContractDto = plainToInstance(UpdateContractDto, req.body); // convert plain object to class instance and also do type conversion
  const errors: ValidationError[] = await validate(updateContractDto, {
    skipMissingProperties: true,
  }); // validate the class instance

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat();
    return res.status(400).json({ errors: errorMessages });
  } else {
    next();
  }
};