const { followers } = require("../utils/mockData");

exports.getFollowers = (req, res) => {
  res.status(200).json({
    success: true,
    data: followers
  });
};

exports.getFollower = (req, res) => {
  const follower = followers.find(f => f.id == req.params.id);

  res.status(200).json({
    success: true,
    data: follower
  });
};

exports.createFollower = (req, res) => {
  const newFollower = {
    id: followers.length + 1,
    ...req.body
  };

  followers.push(newFollower);

  res.status(201).json({
    success: true,
    data: newFollower
  });
};

exports.deleteFollower = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Follower removed"
  });
};