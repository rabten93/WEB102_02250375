const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const { posts, users } = require("../utils/mockData");

exports.getPosts = asyncHandler(async (req, res) => {
  const enhancedPosts = posts.map(post => {
    const user = users.find(user => user.id === post.user_id);

    return {
      ...post,
      user: user
        ? {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            profile_picture: user.profile_picture
          }
        : null
    };
  });

  res.status(200).json({
    success: true,
    count: enhancedPosts.length,
    data: enhancedPosts
  });
});

exports.getPost = asyncHandler(async (req, res, next) => {
  const post = posts.find(post => post.id === req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post not found", 404));
  }

  res.status(200).json({
    success: true,
    data: post
  });
});

exports.createPost = asyncHandler(async (req, res, next) => {
  const userId = req.header("X-User-Id");

  if (!userId) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  const newPost = {
    id: (posts.length + 1).toString(),
    caption: req.body.caption,
    image: req.body.image,
    user_id: userId,
    created_at: new Date().toISOString().slice(0, 10)
  };

  posts.push(newPost);

  res.status(201).json({
    success: true,
    data: newPost
  });
});

exports.updatePost = asyncHandler(async (req, res, next) => {
  const index = posts.findIndex(post => post.id === req.params.id);

  if (index === -1) {
    return next(new ErrorResponse("Post not found", 404));
  }

  posts[index] = {
    ...posts[index],
    ...req.body,
    id: req.params.id
  };

  res.status(200).json({
    success: true,
    data: posts[index]
  });
});

exports.deletePost = asyncHandler(async (req, res, next) => {
  const index = posts.findIndex(post => post.id === req.params.id);

  if (index === -1) {
    return next(new ErrorResponse("Post not found", 404));
  }

  posts.splice(index, 1);

  res.status(200).json({
    success: true,
    data: {}
  });
});