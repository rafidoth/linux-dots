const exp = require("express");
const router = exp.Router();
router.get("/", (req: any, res: any) => {
  console.log("hellow world");
  res.send("Login route");
});

module.exports = router;
