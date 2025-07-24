type UserType = {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  gender: "M" | "F";
  type: "Admin" | "User" | "Mentor";
};

export type { UserType };
