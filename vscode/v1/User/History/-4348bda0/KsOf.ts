import { Router } from "express";
const router = Router();

router.get("/", (req: any, res: any) => {
  console.log("hellow world");
  res.send("Login route");
});

export default router;
