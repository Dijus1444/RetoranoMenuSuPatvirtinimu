const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController.js");

const { protectAdmin } = require("../middlewares/adminAuthMiddleware.js");

router.post("/register", registerUser); //  http://localhost:8000/users/register
router.post("/login", loginUser); // http://localhost:8000/users/login
router.get("/all", protectAdmin, getAllUsers); //  http://localhost:8000/users/all

module.exports = router;
