import { IsNotEmpty, IsString } from 'class-validator';

export class UserAuthDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
