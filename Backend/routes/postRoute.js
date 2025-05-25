const express = require('express');
const router = express.Router();

const {
  getPostsByStatus,
  approvePost,
  rejectPost
} = require('../controllers/postController');

// 📥 View posts by moderation status
router.get('/status', getPostsByStatus); // e.g. ?status=pending

// ✅ Approve post
router.patch('/approve/:id', approvePost);

// ❌ Reject post
router.patch('/reject/:id', rejectPost);

module.exports = router;
