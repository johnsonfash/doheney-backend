import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class GoogleDto {
  @IsString()
  @IsNotEmpty()
  google_token: string;
}