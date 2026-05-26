const dataStore = {
  users: [
    {
      id: 1,
      username: "pelden",
      email: "pelden@example.com",
      name: "Pelden Choda",
      followers: [2],
      following: [2]
    },
    {
      id: 2,
      username: "sonam",
      email: "sonam@example.com",
      name: "Sonam Wangmo",
      followers: [1],
      following: [1]
    }
  ],

  videos: [
    {
      id: 1,
      title: "First TikTok Video",
      description: "Sample video one",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
      userId: 1,
      likes: [2]
    },
    {
      id: 2,
      title: "Second TikTok Video",
      description: "Sample video two",
      url: "https://www.w3schools.com/html/movie.mp4",
      userId: 2,
      likes: [1]
    }
  ],

  comments: [
    {
      id: 1,
      videoId: 1,
      userId: 2,
      text: "Nice video!",
      likes: [1]
    }
  ]
};

module.exports = dataStore;