const express = require("express");
const router = express.Router();

const {
  getFollowers,
  getFollower,
  createFollower,
  deleteFollower
} = require("../controllers/followerController");

router.route("/")
  .get(getFollowers)
  .post(createFollower);

router.route("/:id")
  .get(getFollower)
  .delete(deleteFollower);

module.exports = router;