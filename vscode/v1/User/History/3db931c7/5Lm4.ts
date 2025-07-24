import { Request, Response } from "express";
// import { registerUser } from "../services/UserService.js";

const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password, gender, type } = req.body;
    // await registerUser(name, email, username, password, gender, type);
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const AuthControllers = { RegisterUser };
export default AuthControllers;
