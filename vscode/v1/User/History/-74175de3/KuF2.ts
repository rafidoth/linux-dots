import str from "./index.js";
import express from "express";
console.log(str);
const app = express();
app.get("/", (req, res) => {
  res.send("Hello World");
});
const port = 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
