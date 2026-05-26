const dataStore = require("../models");

const getAllComments = (req, res) => {
  res.status(200).json(dataStore.comments);
};

const getCommentById = (req, res) => {
  const id = parseInt(req.params.id);
  const comment = dataStore.comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  res.status(200).json(comment);
};

const createComment = (req, res) => {
  const { videoId, userId, text } = req.body;

  if (!videoId || !userId || !text) {
    return res.status(400).json({ error: "videoId, userId and text are required" });
  }

  const newComment = {
    id: dataStore.comments.length + 1,
    videoId: Number(videoId),
    userId: Number(userId),
    text,
    likes: []
  };

  dataStore.comments.push(newComment);
  res.status(201).json(newComment);
};

const updateComment = (req, res) => {
  const id = parseInt(req.params.id);
  const comment = dataStore.comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  comment.text = req.body.text || comment.text;

  res.status(200).json(comment);
};

const deleteComment = (req, res) => {
  const id = parseInt(req.params.id);
  const index = dataStore.comments.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Comment not found" });
  }

  dataStore.comments.splice(index, 1);
  res.status(204).send();
};

const likeComment = (req, res) => {
  const id = parseInt(req.params.id);
  const { userId } = req.body;

  const comment = dataStore.comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  if (!comment.likes.includes(Number(userId))) {
    comment.likes.push(Number(userId));
  }

  res.status(200).json({ message: "Comment liked successfully" });
};

const unlikeComment = (req, res) => {
  const id = parseInt(req.params.id);
  const { userId } = req.body;

  const comment = dataStore.comments.find(c => c.id === id);

  if (!comment) {
    return res.status(404).json({ error: "Comment not found" });
  }

  comment.likes = comment.likes.filter(like => like !== Number(userId));

  res.status(200).json({ message: "Comment unliked successfully" });
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment
};