import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  RegisterUser,
  RegisterUserDto,
} from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { LoginUser } from "../../domain/use-cases/auth/login-user.use-case";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";

export class AuthController {
  // DI
  constructor(private readonly authRepository: AuthRepository) {}

  // funcion para manejar los erores
  private handlerError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error " });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });
    // implementacion temporal
    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handlerError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if (error) return res.status(400).json({ error });

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => {
        this.handlerError(error, res);
      });
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) => {
        res.json({
          userSession: req.body.user ?? null,
        });
      })
      .catch((error) => {
        res.status(500).json({ error: "Server Internal Error " });
      });
  };
}
