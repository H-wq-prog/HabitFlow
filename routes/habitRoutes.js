const express = require("express");
const router = express.Router();
// conenct to models
const authMiddleware = require("../middleware/authMiddleware");
// connect to middleware validation
const validate = require("../middleware/validationMiddleware");
// connect to controllers
const { createHabit, getHabits, getHabitById, updateHabit, deleteHabit } = require("../controllers/habitController");
// connect to validation schema
const { createHabitSchema } = require("../validation/habitValidation");
// create post habit route
router.post(
    "/",
    authMiddleware,
    validate(createHabitSchema),
    createHabit
);
// create get habits route
router.get(
    "/",
    authMiddleware,
    getHabits
);
router.get(
    "/:id",
    authMiddleware,
    getHabitById
);
// update habit route
router.put(
    "/:id",
    authMiddleware,
    updateHabit

);
// delete habit route
router.delete(
    "/:id",
    authMiddleware,
    deleteHabit
);

module.exports = router;