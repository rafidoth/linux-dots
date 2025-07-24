import express from "express";

const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
  } catch (error) {}
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
