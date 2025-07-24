const express = require("express");
const app = express();
const AuthRoutes = require("./routes/auth_routes");

app.use(express.json());

app.use("/api/v1/auth", AuthRoutes);

const port = 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
