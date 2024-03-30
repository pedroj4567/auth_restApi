import {
  AuthDatasource,
  RegisterUserDto,
  UserEntity,
  CustumError,
} from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, name, password } = registerUserDto;

    try {
      // verificar si el correo existe

      //   HASH de contrasenia

      //   mapeo de repuesta de nuesta entidad

      return new UserEntity("1", name, email, password, ["ROLE_ADMIN"]);
    } catch (error) {
      if (error instanceof CustumError) {
        throw error;
      }

      throw CustumError.internalServer();
    }
  }
}
