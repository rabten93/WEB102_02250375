const { likes } = require("../utils/mockData");

exports.getLikes = (req, res) => {
  res.status(200).json({
    success: true,
    data: likes
  });
};

exports.getLike = (req, res) => {
  const like = likes.find(l => l.id == req.params.id);

  res.status(200).json({
    success: true,
    data: like
  });
};

exports.createLike = (req, res) => {
  const newLike = {
    id: likes.length + 1,
    ...req.body
  };

  likes.push(newLike);

  res.status(201).json({
    success: true,
    data: newLike
  });
};

exports.deleteLike = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Like removed"
  });
};