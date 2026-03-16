const mongoose = require("mongoose");

const habitProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit",
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    date: {
        type: Date,
        default: Date.now
    }

});

const HabitProgress = mongoose.model("HabitProgress", habitProgressSchema);
module.exports = HabitProgress;