const Post = require('../models/postModel');    

// ✅ Get posts by status (for dashboard tabs)
const getPostsByStatus = async (req, res) => {
  const { status } = req.query;

  try {
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status query parameter" });
    }

    const posts = await Post.find({ status })
      .populate("userId", "name email") 
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Approve a post
const approvePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post approved", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Reject a post
const rejectPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json({ message: "Post rejected", post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPostsByStatus,
  approvePost,
  rejectPost
};
