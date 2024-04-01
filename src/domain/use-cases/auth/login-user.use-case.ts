import { JwtAdapter } from "../../../config";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import { UserSession } from "./register-user.use-case";

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto) : Promise<UserSession>
}
 
type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {

     }
    async execute(loginUserDto: LoginUserDto): Promise<UserSession> {
        //validamos los datos 
        const user = await this.authRepository.login(loginUserDto)

        const token = await this.signToken({ id: user.id }, '2h');
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