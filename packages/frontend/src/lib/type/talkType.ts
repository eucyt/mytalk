import { User } from "@/lib/type/userType";

export interface TalkListItem {
  id: number;
  users: User[];
}

export interface Message {
  senderId: number;
  senderName: string;
  content: string;
}
