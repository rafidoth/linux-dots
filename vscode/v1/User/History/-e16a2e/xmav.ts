import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function handler(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    await jwtVerify(token, secret);
    // Proceed with handling the request
    res.status(200).json({ data: "Protected data" });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
