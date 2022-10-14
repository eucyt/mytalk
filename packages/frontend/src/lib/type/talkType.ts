export interface Talk {
  id: number;
  users: UserInTalk[];
}

interface UserInTalk {
  name: string;
}
