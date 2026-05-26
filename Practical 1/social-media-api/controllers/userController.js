const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { users } = require("../utils/mockData");

exports.getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = users.find(user => user.id === req.params.id);

  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

exports.createUser = asyncHandler(async (req, res) => {
  const newUser = {
    id: (users.length + 1).toString(),
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    full_name: req.body.full_name,
    profile_picture: req.body.profile_picture || "default-profile.jpg",
    bio: req.body.bio || "",
    created_at: new Date().toISOString().slice(0, 10)
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const index = users.findIndex(user => user.id === req.params.id);

  if (index === -1) {
    return next(new ErrorResponse("User not found", 404));
  }

  users[index] = {
    ...users[index],
    ...req.body,
    id: req.params.id
  };

  res.status(200).json({
    success: true,
    data: users[index]
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const index = users.findIndex(user => user.id === req.params.id);

  if (index === -1) {
    return next(new ErrorResponse("User not found", 404));
  }

  users.splice(index, 1);

  res.status(200).json({
    success: true,
    data: {}
  });
});