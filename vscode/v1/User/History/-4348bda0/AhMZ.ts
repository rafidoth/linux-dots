import express from "express";
const router = express.Router();

router.get("/", (req: any, res: any) => {
  console.log("hellow world");
  res.send("Login route");
});

module.exports = router;
