const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    massage: {
        type: String,
        required: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true });

module.exports = mongoose.model("Notification", notificationSchema)