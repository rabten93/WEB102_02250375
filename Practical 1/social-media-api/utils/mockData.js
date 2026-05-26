let users = [
  {
    id: "1",
    username: "traveler",
    email: "traveler@example.com",
    full_name: "Karma",
    profile_picture: "https://example.com/profiles/traveler.jpg",
    bio: "Travel photographer",
    created_at: "2023-01-15"
  },
  {
    id: "2",
    username: "student",
    email: "student@example.com",
    full_name: "Pelden",
    profile_picture: "default-profile.jpg",
    bio: "Student and developer",
    created_at: "2023-02-10"
  }
];

let posts = [
  {
    id: "1",
    caption: "Beautiful mountain view",
    image: "mountain.jpg",
    user_id: "1",
    created_at: "2023-03-01"
  },
  {
    id: "2",
    caption: "Learning REST API",
    image: "api.jpg",
    user_id: "2",
    created_at: "2023-03-05"
  }
];

module.exports = { users, posts };