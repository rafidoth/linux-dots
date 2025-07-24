import express from "express";
import AuthRoutes from "./routes/auth_routes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1/auth", AuthRoutes);
console.log("Hello World", process.env.PORT);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
