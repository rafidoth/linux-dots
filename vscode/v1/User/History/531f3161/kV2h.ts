import { GenderType, UserType } from "./Enums";

type UserPayload = {
  name: string;
  email: string;
  username: string;
  password: string;
  gender: GenderType;
  type: UserType;
};

type UserRecord = {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  type: UserType;
  gender: GenderType;
};

export type { UserPayload, UserRecord };
