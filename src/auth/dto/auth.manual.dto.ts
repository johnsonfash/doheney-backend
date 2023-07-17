import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ManualDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDto extends ManualDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
