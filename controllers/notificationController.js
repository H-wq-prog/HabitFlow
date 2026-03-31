const Notification = require("../models/Notification")
const getNotifications = async (req, res) => {
    try {
        const notification = await Notification.find({
            userId: req.user.id
        });
        res.json(notification);
    } catch (error) {
        res.status(500).json({ msg: "servr has error" })
    }
}


const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        res.json(notification);
    } catch (error) {
        res.status(500).json({ msg: "server hsa error" })
    }
}

module.exports = {
    getNotifications,
    markAsRead
}