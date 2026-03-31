const HabitProgress = require("../models/HabitProgress");
// check in habit 

const checkInHabit = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const alreadyChecked = await HabitProgress.findOne({
            userId: req.user.id,
            habitId: req.body.habitId,
            date: { $gte: today }
        });

        if (alreadyChecked) {
            return res.status(400).json({
                message: "Already checked in today"
            });
        }

        const progress = await HabitProgress.create({
            userId: req.user.id,
            habitId: req.body.habitId,
            completed: true
        });

        res.status(201).json(progress);

    } catch (error) {
        res.status(500).json({
            msg: "sevre has error "
        });
    }
};

const getHabitProgress = async (req, res) => {
    try {
        const progress = await HabitProgress.find({
            habitId: req.params.habitId,
            userId: req.user.id
        });

        res.json(progress);

    } catch (error) {
        res.status(500).json({
            msg: "sevre has error "
        });
    }
};


const getHabitStats = async (req, res) => {
    try {
        const progress = await HabitProgress.find({
            habitId: req.params.habitId,
            userId: req.user.id
        }).sort({ date: -1 });

        const totalCompleted = progress.length;
        const streak = totalCompleted;

        res.json({
            totalCompleted,
            streak
        });

    } catch (error) {
        res.status(500).json({
            msg: "sevre has error "
        });
    }
};

const getAdvancedHabitStats = async (req, res) => {
    try {
        const Habit = require("../models/Habit");

        const habit = await Habit.findById(req.params.habitId);

        if (!habit) {
            return res.status(404).json({
                message: "Habit not found"
            });
        }

        const progress = await HabitProgress.find({
            habitId: req.params.habitId,
            userId: req.user.id
        }).sort({ date: 1 });

        const totalCompleted = progress.length;
        const completionRate = Math.round(
            (totalCompleted / habit.targetDays) * 100
        );

        const streak = calculateStreak(progress);

        res.json({
            totalCompleted,
            targetDays: habit.targetDays,
            completionRate,
            streak,
            remainingDays:
                habit.targetDays - totalCompleted
        });

    } catch (error) {
        res.status(500).json({
            msg: "sevre has error "
        });
    }
};



const getWeeklyProgress = async (req, res) => {
    try {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const progress = await HabitProgress.find({
            habitId: req.params.habitId,
            userId: req.user.id,
            date: { $gte: lastWeek }
        });

        res.json({
            weekTotal: progress.length,
            progress
        });

    } catch (error) {
        res.status(500).json({
            msg: "sevre has error "
        });
    }
};

const calculateStreak = (progress) => {
    if (!progress.length) return 0;

    let streak = 1;

    for (let i = progress.length - 1; i > 0; i--) {
        const current = new Date(progress[i].date);
        const previous = new Date(progress[i - 1].date);

        current.setHours(0, 0, 0, 0);
        previous.setHours(0, 0, 0, 0);

        const diff =
            (current - previous) /
            (1000 * 60 * 60 * 24);

        if (diff === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
};
module.exports = {
    checkInHabit,
    getHabitProgress,
    getHabitStats,
    getAdvancedHabitStats,
    getWeeklyProgress
};