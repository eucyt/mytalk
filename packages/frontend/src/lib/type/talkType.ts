export interface TalkListItem {
  id: number;
  users: UserInTalk[];
}

export interface UserInTalk {
  name: string;
}

export interface Message {
  senderName: string;
  content: string;
}

export interface Talk {
  messages: Message[];
  users: UserInTalk[];
}
