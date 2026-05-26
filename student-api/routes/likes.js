const express = require("express");
const router = express.Router();

const {
  getLikes,
  getLike,
  createLike,
  deleteLike
} = require("../controllers/likeController");

router.route("/")
  .get(getLikes)
  .post(createLike);

router.route("/:id")
  .get(getLike)
  .delete(deleteLike);

module.exports = router;