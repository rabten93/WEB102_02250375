const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Missing credentials"
    });
  }

  res.status(200).json({
    message: "Login successful",
    token: "fake-jwt-token"
  });
});

module.exports = router;