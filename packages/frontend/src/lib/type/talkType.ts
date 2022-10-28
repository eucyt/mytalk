export interface TalkListItem {
  id: number;
  users: UserInTalk[];
}

interface UserInTalk {
  name: string;
}

interface Message {
  senderName: string;
  content: string;
}

export interface Talk {
  messages: Message[];
  users: UserInTalk[];
}
