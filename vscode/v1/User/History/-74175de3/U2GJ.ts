const routes = require("./routes/routes");

const port = 3010;
routes.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
