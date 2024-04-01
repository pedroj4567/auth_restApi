import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb/index";
import {
  AuthDatasource,
  RegisterUserDto,
  UserEntity,
  CustomError,
  LoginUserDto,
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
  ) { }
  

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    
    const { email, password } = loginUserDto;
    
    try {
      const user = await UserModel.findOne({ email })
      if (!user) throw CustomError.badRequest("User does not exist")
      const isMatching = this.comparePassword(password, user.password);
      if (!isMatching) throw CustomError.badRequest('Password Incorrect')
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      console.log(error)
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }



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

      // creamos usuario
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
