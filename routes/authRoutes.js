const express = require("express");
const router = express.Router();
// connect to controllers 
const { register, login } = require("../controllers/authController");
// connect to middleware validation
const validate = require("../middleware/validationMiddleware");
// get data after chack data in joi
const { registerSchema, loginSchema } = require("../validation/authValidation");

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

module.exports = router;