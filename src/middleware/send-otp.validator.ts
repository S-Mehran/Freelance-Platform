import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { otpSendDto } from "../dto/send-otp.dto";

export const otpValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const verifyDto = plainToClass(otpSendDto, req.body); // convert plain object to class instance and also do type conversion
  const errors: ValidationError[] = await validate(verifyDto); // validate the class instance

  if (errors.length > 0) {
    const errorMessages = errors
      .map((error) => Object.values(error.constraints || {}))
      .flat();
    return res.status(400).json({ errors: errorMessages });
  } else {
    next();
  }
};