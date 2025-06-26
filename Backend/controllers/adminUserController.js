const User = require("../models/userModel");

//Get all users
const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().select("-password -verifyToken");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message })
    }
};


//delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};



module.exports = {getAllUsers, deleteUser};