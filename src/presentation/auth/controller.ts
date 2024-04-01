import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

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
    this.authRepository
      .register(registerUserDto!)
      .then(async (user) => {
        res.json({
          user,
          token: await JwtAdapter.generateToken({ id: user.id }),
        });
      })
      .catch((error) => {
        this.handlerError(error, res);
      });
  };

  loginUser = (req: Request, res: Response) => {
    res.json("login user controller");
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
