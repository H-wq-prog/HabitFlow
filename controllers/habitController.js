const Habit = require("../models/Habit");
// creat habit 
const createHabit = async (req, res) => {
    try {
        // create new habit in database 
        const habit = new Habit({
            title: req.body.title,
            description: req.body.description,
            targetDays: req.body.targetDays,
            userId: req.user.id,
        })

        await habit.save();
        res.status(201).json(habit);
        // catch error
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// get all habits for user
const getHabits = async (req, res) => {
    try {
        // find all habits for user in database 
        const habits = await Habit.find({ userId: req.user.id });
        res.json(habits);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(habit);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const deleteHabit = async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.id);

        res.json({ msg: "Habit deleted" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    createHabit,
    getHabits,
    updateHabit,
    deleteHabit,
};