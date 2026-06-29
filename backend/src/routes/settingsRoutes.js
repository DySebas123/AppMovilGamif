const express = require("express");

const {
    getSettings,
    updateSettings,
} = require("../controllers/settingsController");

const {
    verifyToken,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getSettings);

router.put("/", verifyToken, updateSettings);

module.exports = router;