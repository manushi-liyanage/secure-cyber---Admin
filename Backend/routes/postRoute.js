const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  getPostsByStatus,
  approvePost,
  rejectPost
} = require('../controllers/postController');

// 📥 View posts by moderation status
router.get('/status', authMiddleware, getPostsByStatus); // e.g. ?status=pending

// ✅ Approve post
router.patch('/approve/:id', authMiddleware, approvePost);

// ❌ Reject post
router.patch('/reject/:id', authMiddleware, rejectPost);

module.exports = router;
