import express from "express";
import AuthRoutes from "./routes/auth_routes.js";
const app = express();

app.use(express.json());

app.use("/api/v1/auth", AuthRoutes);

const port = process.env.PORT || 3019;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
