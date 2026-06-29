const express = require("express");

const {
    register,
    login,
    profile,
    updateProfile,
} = require("../controllers/authController");

const {
    verifyToken,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/profile", verifyToken, profile);

router.put("/profile", verifyToken, updateProfile);

module.exports = router;