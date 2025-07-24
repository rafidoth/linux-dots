import { UserType } from "types/UserType";

const registerUser = (
  name: string,
  email: string,
  username: string,
  password: string,
  gender: string,
  type: string
) => {
  const user: UserType = {
    name: name,
    email: email,
    username: username,
    password: password,
    gender: gender,
  };
};

// const { name, email, username, password, gender, type } = req.body;
