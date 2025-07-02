const Post = require('../models/postModel');
const User = require('../models/userModel');     //Even if you don't use User directly in the file, this registers the schema with Mongoose, allowing .populate("userId") to work.

// ✅ Get posts by status (for dashboard tabs)
// const getPostsByStatus = async (req, res) => {
//   const { status } = req.query;

//   try {
//     if (!["pending", "approved", "rejected"].includes(status)) {
//       return res.status(400).json({ message: "Invalid status query parameter" });
//     }

//     const posts = await Post.find({ status })
//       .populate("userId", "name email") 
//       .sort({ createdAt: -1 });

//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getPostsByStatus = async (req, res) => {
  const { status } = req.query;
  console.log("🔍 Incoming request to fetch posts with status:", status);

  try {
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status query parameter" });
    }

    const posts = await Post.find({ status })
      .populate({
        path: "userId",
        select: "name email",
        strictPopulate: false, // ✅ prevents crash if user missing
      })
      .sort({ createdAt: -1 });

    console.log("✅ Posts fetched:", posts.length);
    res.status(200).json(posts);
  } catch (error) {
    console.error("❌ Error in getPostsByStatus:", error);
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
