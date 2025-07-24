const exp = require("express");
const router = exp.Router();
router.get("/", (req: any, res: any) => {
  res.send("Login route");
});

module.exports = router;
