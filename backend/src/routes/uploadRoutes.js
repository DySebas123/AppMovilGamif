const express = require("express");

const upload = require("../config/multer");

const {
    uploadProfileImage,
} = require("../controllers/uploadController");

const {
    verifyToken,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/profile-image",
    verifyToken,
    upload.single("image"),
    uploadProfileImage
);

module.exports = router;