const express = require("express");

const {
    getHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    toggleHabit,
    resetHabits,
} = require("../controllers/habitController");

const {
    verifyToken,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, getHabits);

router.post("/", verifyToken, createHabit);

router.delete("/reset/all", verifyToken, resetHabits);

router.put("/:id", verifyToken, updateHabit);

router.delete("/:id", verifyToken, deleteHabit);

router.patch("/:id/toggle", verifyToken, toggleHabit);

module.exports = router;