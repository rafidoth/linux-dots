import express from "express";
import AuthRoutes from "@/routes/auth_routes";
const app = express();
console.log(AuthRoutes);

app.use(express.json());

app.use("/api/v1/auth", AuthRoutes);

const port = 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
