import express from "express";
import Database from "./database.mjs";

const app = express();
const database = new Database();

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
    database.saveUser({ name, email, password: hashedPassword });

    return res.status(201).json({
      message: "User registered successfully",
      id: (await database.getTotalUsers()) - 1,
    });
  } catch (error) {}
});

app.post("/api/auth/login", async (req, res) => {});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
