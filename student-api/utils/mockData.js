// utils/mockData.js

// USERS
const users = [
  {
    id: 1,
    username: "karma",
    full_name: "Karma Dorji",
    bio: "Travel photographer",
    created_at: "2023-01-10"
  },
  {
    id: 2,
    username: "sonam",
    full_name: "Sonam Wangdi",
    bio: "Food blogger",
    created_at: "2023-02-05"
  }
];

// POSTS
const posts = [
  {
    id: 1,
    user_id: 1,
    caption: "Beautiful mountains!",
    image_url: "https://example.com/image1.jpg",
    created_at: "2023-03-01"
  }
];

// COMMENTS
const comments = [
  {
    id: 1,
    post_id: 1,
    user_id: 2,
    text: "Amazing photo!"
  }
];

// LIKES
const likes = [
  {
    id: 1,
    post_id: 1,
    user_id: 2
  }
];

// FOLLOWERS
const followers = [
  {
    id: 1,
    user_id: 1,
    follower_id: 2
  }
];

module.exports = {
  users,
  posts,
  comments,
  likes,
  followers
};