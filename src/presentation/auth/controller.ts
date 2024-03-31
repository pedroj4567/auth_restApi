import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";

export class AuthController {
  // DI
  constructor(private readonly authRepository: AuthRepository) { }
  
  // funcion para manejar los erores
  private handlerError = (error: unknown, res: Response) => { 
    if (error instanceof CustomError) { 
      return res.status(error.statusCode).json({error: error.message})
    }
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error ' })
  }



  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });
    // implementacion temporal
    this.authRepository
      .register(registerUserDto!)
      .then(user => res.json(user))
      .catch((error) => {
        this.handlerError(error, res)
      });
  };

  loginUser = (req: Request, res: Response) => {
    res.json("login user controller");
  };
}
