const dataStore = require("../models");

const getAllVideos = (req, res) => {
  res.status(200).json(dataStore.videos);
};

const getVideoById = (req, res) => {
  const id = parseInt(req.params.id);
  const video = dataStore.videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  res.status(200).json(video);
};

const createVideo = (req, res) => {
  const { title, description, url, userId } = req.body;

  if (!title || !url || !userId) {
    return res.status(400).json({ error: "title, url and userId are required" });
  }

  const user = dataStore.users.find(u => u.id === Number(userId));

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const newVideo = {
    id: dataStore.videos.length + 1,
    title,
    description,
    url,
    userId: Number(userId),
    likes: []
  };

  dataStore.videos.push(newVideo);
  res.status(201).json(newVideo);
};

const updateVideo = (req, res) => {
  const id = parseInt(req.params.id);
  const video = dataStore.videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  video.title = req.body.title || video.title;
  video.description = req.body.description || video.description;
  video.url = req.body.url || video.url;

  res.status(200).json(video);
};

const deleteVideo = (req, res) => {
  const id = parseInt(req.params.id);
  const index = dataStore.videos.findIndex(v => v.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Video not found" });
  }

  dataStore.videos.splice(index, 1);
  res.status(204).send();
};

const getVideoComments = (req, res) => {
  const id = parseInt(req.params.id);
  const comments = dataStore.comments.filter(c => c.videoId === id);

  res.status(200).json(comments);
};

const getVideoLikes = (req, res) => {
  const id = parseInt(req.params.id);
  const video = dataStore.videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  res.status(200).json(video.likes);
};

const likeVideo = (req, res) => {
  const id = parseInt(req.params.id);
  const { userId } = req.body;

  const video = dataStore.videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  if (!video.likes.includes(Number(userId))) {
    video.likes.push(Number(userId));
  }

  res.status(200).json({ message: "Video liked successfully" });
};

const unlikeVideo = (req, res) => {
  const id = parseInt(req.params.id);
  const { userId } = req.body;

  const video = dataStore.videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ error: "Video not found" });
  }

  video.likes = video.likes.filter(like => like !== Number(userId));

  res.status(200).json({ message: "Video unliked successfully" });
};

module.exports = {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  getVideoComments,
  getVideoLikes,
  likeVideo,
  unlikeVideo
};