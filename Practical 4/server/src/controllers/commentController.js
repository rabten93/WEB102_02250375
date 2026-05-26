const prisma = require("../lib/prisma");

exports.addComment = async (req, res) => {
  try {
    const videoId = Number(req.params.videoId);
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Comment text is required",
      });
    }

    const comment = await prisma.comment.create({
      data: {
        text,
        videoId,
        userId: req.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add comment",
      error: error.message,
    });
  }
};