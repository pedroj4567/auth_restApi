import { Request, Response } from "express";

export class AuthController {
  // ID
  constructor() {}

  registerUser = (req: Request, res: Response) => {
    res.json("Register user controller");
  };

  loginUser = (req: Request, res: Response) => {
    res.json("login user controller");
  };
}
