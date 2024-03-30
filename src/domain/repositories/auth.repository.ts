import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  // TODO : ABSTRACT LOGIN()

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
 