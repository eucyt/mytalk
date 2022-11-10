export interface Me extends User {
  email: string;
}

export interface User {
  id: number;
  displayName: string;
}
