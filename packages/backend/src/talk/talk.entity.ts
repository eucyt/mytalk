import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTalkRequest {}

export class InviteToTalkRequest {
  @IsNotEmpty()
  @IsEmail()
  inviteeEmail!: string;
}

export class CreateMessageRequest {
  @IsNotEmpty()
  @IsString()
  message!: string;
}
