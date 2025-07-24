const express = require("express");
const routes = require("./src/routes/routes");
console.log(routes);

const app = express();
app.get("/", (req, res) => {
  res.send("Hello World");
});
const port = 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
