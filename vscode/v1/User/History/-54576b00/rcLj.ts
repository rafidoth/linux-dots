import express from "express";

const server = express();

const PORT = process.env.PORT || 4000;

// middlewares
server.use(express.json());

server.listen(PORT, () => {
  console.log(`Server is running at localhost:${PORT}`);
});
