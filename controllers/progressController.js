const HabitProgress = require("../models/HabitProgress");
// check in habit 
const checkInHabit = async (req, res) => {
    try {
        // create new progress in database 
        const progress = await HabitProgress.create({
            userId: req.user.id,
            habitId: req.body.habitId,
            completed: true
        });

        res.status(201).json(progress);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { checkInHabit };