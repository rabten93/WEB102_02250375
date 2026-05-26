const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Food Ordering API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Invalid input data"
    });
  }

  res.status(201).json({
    message: "User created successfully",
    user: { name, email }
  });
});