const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const validate = require("../middleware/validationMiddleware");

const { checkInHabit } = require("../controllers/progressController");
const { checkInSchema } = require("../validation/progressValidation");

router.post(
    "/checkin",
    authMiddleware,
    validate(checkInSchema),
    checkInHabit
);

module.exports = router;