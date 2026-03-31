const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const { checkInHabit, getHabitProgress, getHabitStats, getAdvancedHabitStats, getWeeklyProgress } = require("../controllers/progressController");
const { checkInSchema } = require("../validation/progressValidation");

router.post(
    "/checkin",
    authMiddleware,
    validate(checkInSchema),
    checkInHabit
);
router.get(
    "/:habitsId",
    authMiddleware,
    getHabitProgress

);
router.get(
    "/stats/:habitsId",
    authMiddleware,
    getHabitStats,
)
router.get(
    "/advanced/:habitId",
    authMiddleware,
    getAdvancedHabitStats
);

router.get(
    "/weekly/:habitId",
    authMiddleware,
    getWeeklyProgress
);
module.exports = router;