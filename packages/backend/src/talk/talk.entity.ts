import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTalkRequest {}

export class CreateTalkInvitationRequest {
  @IsNotEmpty()
  // TODO: is exist?
  talkId!: number;

  @IsNotEmpty()
  @IsEmail()
  inviteeEmail!: string;
}
