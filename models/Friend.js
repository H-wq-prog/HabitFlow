const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        friendName: {
            type: String,
            required: true,
        },
        friendEmail: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Friend", friendSchema);