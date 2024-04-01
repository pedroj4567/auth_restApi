import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

export type UserSession = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserSession>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    //   inyeccion de una funcion como dependencia
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserSession> {
    //creamo el usuario
    const user = await this.authRepository.register(registerUserDto);

    //token
    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error Generating token");

    return {
      token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
