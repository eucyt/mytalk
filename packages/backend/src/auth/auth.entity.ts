import { IsAscii, IsEmail, Length } from 'class-validator';

export class RegisterRequest {
  @IsEmail()
  email!: string;

  @IsAscii()
  @Length(6, 1024)
  password!: string;
}

export class RegisterResponse {
  id: number;
  email: string;
}
