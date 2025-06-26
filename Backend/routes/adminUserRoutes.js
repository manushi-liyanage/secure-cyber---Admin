const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
} = require("../controllers/adminUserController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getAllUsers);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
