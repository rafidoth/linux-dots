import { UserType } from "types/UserType";

const registerUser = (
  name: string,
  email: string,
  username: string,
  password: string,
  gender: "M" | "F",
  type: "Admin" | "User" | "Mentor"
) => {
  const user: UserType = {
    name: name,
    email: email,
    username: username,
    password: password,
    gender: gender,
    type: type,
  };
};

// const { name, email, username, password, gender, type } = req.body;
