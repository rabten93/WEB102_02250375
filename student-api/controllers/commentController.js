const { comments } = require("../utils/mockData");

exports.getComments = (req, res) => {
  res.status(200).json({
    success: true,
    data: comments
  });
};

exports.getComment = (req, res) => {
  const comment = comments.find(c => c.id == req.params.id);

  res.status(200).json({
    success: true,
    data: comment
  });
};

exports.createComment = (req, res) => {
  const newComment = {
    id: comments.length + 1,
    ...req.body
  };

  comments.push(newComment);

  res.status(201).json({
    success: true,
    data: newComment
  });
};

exports.updateComment = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Comment updated"
  });
};

exports.deleteComment = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Comment deleted"
  });
};