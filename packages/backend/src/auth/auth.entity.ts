import {
  IsAscii,
  IsEmail,
  Length,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user/user.service';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userService: UserService) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(email: string, args: ValidationArguments) {
    return this.userService.findByEmail(email).then((user) => {
      return !user;
    });
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
  @Length(3, 12)
  displayName!: string;

  @IsEmail()
  @IsUserAlreadyExist({
    message: '$value is already used. Use another email.',
  })
  email!: string;

  @IsAscii()
  @Length(6, 1024)
  password!: string;
}

export class RegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export class LoginRequest {
  @IsEmail()
  email!: string;

  @IsAscii()
  @Length(6, 1024)
  password!: string;
}

export class LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export class AccessTokenRequest {
  refreshToken: string;
}

export class AccessTokenResponse {
  accessToken: string;
}
