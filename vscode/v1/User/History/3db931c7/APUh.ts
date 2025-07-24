import { Request, Response } from "express";

const RegisterUser = async (req: Request, res: Response) => {
  // check request body has all required fields
  try {
    // Registration logic here
    const { name, email, username, password, gender, type } = req.body;
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const AuthControllers = { RegisterUser };
export default AuthControllers;
