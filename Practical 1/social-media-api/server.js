const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

dotenv.config();

const formatResponse = require("./middleware/formatResponse");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(formatResponse);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Social Media API"
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});