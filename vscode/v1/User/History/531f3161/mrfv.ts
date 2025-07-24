type UserType = {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  gender: "Male" | "Female";
  type: "Admin" | "User" | "Mentor";
};

export type { UserType };
