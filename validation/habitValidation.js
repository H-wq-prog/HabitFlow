const Joi = require("joi");

const createHabitSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().allow(""),
    targetDays: Joi.number().min(1).max(365)
});

const updateHabitSchema = Joi.object({
    title: Joi.string().min(3),
    description: Joi.string().allow(""),
    targetDays: Joi.number().min(1).max(365)
});

module.exports = {
    createHabitSchema,
    updateHabitSchema
};