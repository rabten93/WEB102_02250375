const express = require("express");
const router = express.Router();

const {
  getVideos,
  createVideo,
  likeVideo,
} = require("../controllers/videoController");

const { protect } = require("../middleware/auth");

router.get("/", getVideos);
router.post("/", protect, createVideo);
router.post("/:id/like", protect, likeVideo);

module.exports = router;