import "reflect-metadata"
import { plainToInstance } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { validate,  ValidationError } from "class-validator";
import { PostDto } from "../dto/job-post.dto";


export const postValidator = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const postDto = plainToInstance(PostDto, req.body);
    const errors: ValidationError[] = await validate(postDto)

    if (errors.length>0){
        const errorMessages = errors.map((error)=> Object.values(error.constraints || {})).flat()
        return res.status(400).json({ errors: errorMessages });
    } else{
        next()
    }
}