import { app } from "./routes/routes.js";

const port = 3010;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
