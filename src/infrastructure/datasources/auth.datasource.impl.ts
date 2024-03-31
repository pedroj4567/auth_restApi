import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb/index";
import {
  AuthDatasource,
  RegisterUserDto,
  UserEntity,
  CustomError,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

// TYPE FUNCTIONS
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    // inyeccion de funciones como dependencia
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { email, name, password } = registerUserDto;

    try {
      // verificar si el correo existe
      const emailExist = await UserModel.findOne({ email });
      if (emailExist) throw CustomError.badRequest("Credentials not validate");
      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
      });

      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
