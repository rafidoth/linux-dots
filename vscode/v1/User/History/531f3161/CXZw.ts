import { GenderType, UserType } from "./Enums";

type UserInsert = {
  name: string;
  email: string;
  username: string;
  password: string;
  gender: "M" | "F";
  type: "Admin" | "User" | "Mentor";
};

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  gender: "M" | "F";
  type: "Admin" | "User" | "Mentor";
};

export type { UserInsert, User };
