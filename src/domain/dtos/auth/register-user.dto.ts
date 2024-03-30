import { Validators } from "../../../config/validators";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
    // return [error_message, Instance's RegisterUserDto]
  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ["Missing name", undefined];
    if (!email) return ["Missing name", undefined];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing Password"];
    if (password.length < 6) return ["Password too short"];

      return [undefined, new RegisterUserDto(
        name, email, password
    )];
  }
}
