import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
export class VerifyUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  code: string;
}
export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
