const express = require("express")
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware")
const {
    getNotifications,
    markAsRead
} = require("../controllers/notificationController")
router.get("/", authMiddleware, getNotifications);
router.put("/:id/read", authMiddleware, markAsRead)

module.exports = router;