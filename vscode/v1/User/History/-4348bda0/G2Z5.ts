import { Request, Response } from "express";
import { Router } from "express";
import AuthControllers from "../controllers/AuthControllers";
const router = Router();

router.post("/reg", AuthControllers.RegisterUser);

export default router;
