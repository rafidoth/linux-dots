const express = require("express");
const app = express();
const AuthRoutes = require("./routes/auth_routes");

const port = 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
