import { GenderType, UserType } from "./Enums";

type UserInsert = {
  name: string;
  email: string;
  username: string;
  password: string;
  gender: GenderType;
  type: UserType;
};

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  type: UserType;
  gender: GenderType;
};

export type { UserInsert, User };
