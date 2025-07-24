const exp = require("express");
const router = exp.Router();
router.get("/", (req, res) => {
  res.send("Login route");
});

module.exports = router;
