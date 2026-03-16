const Joi = require("joi");

const checkInSchema = Joi.object({
    habitId: Joi.string().required()
});

module.exports = { checkInSchema };