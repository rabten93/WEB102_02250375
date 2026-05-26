const prisma = require("../lib/prisma");

exports.getVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        comments: true,
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      count: videos.length,
      videos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch videos",
      error: error.message,
    });
  }
};

exports.createVideo = async (req, res) => {
  try {
    const { caption, videoUrl, thumbnail } = req.body;

    if (!caption || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Caption and videoUrl are required",
      });
    }

    const video = await prisma.video.create({
      data: {
        caption,
        videoUrl,
        thumbnail,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Video created successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create video",
      error: error.message,
    });
  }
};

exports.likeVideo = async (req, res) => {
  try {
    const videoId = Number(req.params.id);

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_videoId: {
          userId: req.user.id,
          videoId,
        },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });

      return res.json({
        success: true,
        message: "Video unliked",
      });
    }

    await prisma.like.create({
      data: {
        userId: req.user.id,
        videoId,
      },
    });

    res.json({
      success: true,
      message: "Video liked",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to like video",
      error: error.message,
    });
  }
};