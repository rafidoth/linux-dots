import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
  res.send("Login route");
});

module.exports = router;
