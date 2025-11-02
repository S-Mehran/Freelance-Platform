import { NextFunction, Request, Response } from "express";
import Encrypt from "../helpers/encrypt.helper";

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  // if (!header) {
  //   return res.status(401).json({ message: "Unauthorized" });
  // }
  console.log("auth")
  // const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  console.log("auth2")
  const decode = Encrypt.verifyToken(token);
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }
 console.log("auth3")
  req.headers["user"] = decode;
  next();
};