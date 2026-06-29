const express = require("express");
const path = require("path");

const corsConfig = require("./config/cors");

const authRoutes = require("./routes/authRoutes");
const habitRoutes = require("./routes/habitRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const quoteRoutes = require("./routes/quoteRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(corsConfig);

app.use(express.json({
    limit: "10mb",
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.json({
        success: true,
        application: "HabitQuest API",
        version: "1.0.0",
        status: "Running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/upload", uploadRoutes);

module.exports = app;