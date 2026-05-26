const dataStore = require("../models");

const getAllUsers = (req, res) => {
  res.status(200).json(dataStore.users);
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const user = dataStore.users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user);
};

const createUser = (req, res) => {
  const { username, email, name } = req.body;

  if (!username || !email) {
    return res.status(400).json({ error: "username and email are required" });
  }

  const newUser = {
    id: dataStore.users.length + 1,
    username,
    email,
    name: name || username,
    followers: [],
    following: []
  };

  dataStore.users.push(newUser);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = dataStore.users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  user.name = req.body.name || user.name;

  res.status(200).json(user);
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  const index = dataStore.users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  dataStore.users.splice(index, 1);
  res.status(204).send();
};

const getUserVideos = (req, res) => {
  const id = parseInt(req.params.id);
  const videos = dataStore.videos.filter(v => v.userId === id);

  res.status(200).json(videos);
};

const getUserFollowers = (req, res) => {
  const id = parseInt(req.params.id);
  const user = dataStore.users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user.followers);
};

const followUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { followerId } = req.body;

  const user = dataStore.users.find(u => u.id === id);
  const follower = dataStore.users.find(u => u.id === Number(followerId));

  if (!user || !follower) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!user.followers.includes(Number(followerId))) {
    user.followers.push(Number(followerId));
  }

  if (!follower.following.includes(id)) {
    follower.following.push(id);
  }

  res.status(200).json({ message: "User followed successfully" });
};

const unfollowUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { followerId } = req.body;

  const user = dataStore.users.find(u => u.id === id);
  const follower = dataStore.users.find(u => u.id === Number(followerId));

  if (!user || !follower) {
    return res.status(404).json({ error: "User not found" });
  }

  user.followers = user.followers.filter(f => f !== Number(followerId));
  follower.following = follower.following.filter(f => f !== id);

  res.status(200).json({ message: "User unfollowed successfully" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserVideos,
  getUserFollowers,
  followUser,
  unfollowUser
};