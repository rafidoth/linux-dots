import { Request, Response } from "express";
import { Router } from "express";
import { RegisterUser } from "../controllers/AuthControllers";
const router = Router();

router.post("/reg", RegisterUser);

export default router;
