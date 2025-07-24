import { UserType } from "types/UserType";
import { v4 as uuid } from "uuid";
import { create_user } from "models/UsersModel";

const registerUser = (
  name: string,
  email: string,
  username: string,
  password: string,
  gender: "M" | "F",
  type: "Admin" | "User" | "Mentor"
) => {
  const user: UserType = {
    id: uuid(),
    name: name,
    email: email,
    username: username,
    password: password,
    gender: gender,
    type: type,
  };
  await create_user(user);
};

export { registerUser };
