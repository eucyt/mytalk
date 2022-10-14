import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTalkRequest {}

export class CreateTalkInvitationRequest {
  @IsNotEmpty()
  @IsEmail()
  inviteeEmail!: string;
}
