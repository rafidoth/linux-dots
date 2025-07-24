import { Request, Response } from "express";
const express = require("express");
const routes = require("./routes/route");
console.log(routes);

const app = express();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
const port = 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
