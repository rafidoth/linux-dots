import express from "express";
const database = [];

const app = express();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(422).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {};
  } catch (error) {}
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
