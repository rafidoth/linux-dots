import express from "express";

const router = express();
app.get("/", (req, res) => {
  res.send("Hello World");
});
