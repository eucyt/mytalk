import { User } from "@/lib/type/userType";

export interface TalkListItem {
  id: number;
  users: User[];
  latestMessage?: Message;
}

export interface Message {
  senderId: number;
  senderName: string;
  content: string;
}
