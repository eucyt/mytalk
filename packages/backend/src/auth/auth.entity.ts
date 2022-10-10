import { Injectable } from '@nestjs/common';
import {
  IsAscii,
  IsEmail,
  IsNotEmpty,
  Length,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserService } from '../user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(email: string, args: ValidationArguments) {
    // If user that has same email exist, return false (= Repelled by validation.)
    // If there is no email arg, return false (= Repelled by validation.)
    return (
      email != null &&
      this.userService.findByEmail(email).then((user) => {
        return !user;
      })
    );
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}

export class RegisterRequest {
  @IsNotEmpty()
  @Length(3, 12)
  displayName!: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUserAlreadyExist({
    message: '$value is already used. Use another email.',
  })
  email!: string;

  @IsNotEmpty()
  @IsAscii()
  @Length(6, 1024)
  password!: string;
}

export class RegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsAscii()
  @Length(6, 1024)
  password!: string;
}

export class LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export class AccessTokenResponse {
  accessToken: string;
  refreshToken: string;
}
