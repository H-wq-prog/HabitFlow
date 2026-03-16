const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        // get data from request body
        const { name, email, password } = req.body;

        // check if user already existe in database with the same email
        const existingUser = await User.findOne({ email });


        // if user already exist return error massage 
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // if user not exist create new user and hash password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user in database
        const user = new User({
            name,
            email,
            password: hashedPassword,
        })
        await user.save();
        res.status(201).json({ msg: "User created successfully" });
    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

const login = async (req, res) => {
    try {
        // get data from request body
        const { email, password } = req.body;

        // check if user exist in database with the same email
        const user = await User.findOne({ email });


        // if user not exist return error massage
        if (!user) {
            return res.status(400).json({ msg: "user not found" });
        }

        // if user exist compare password with hashed password in database 
        const isMatch = await bcrypt.compare(password, user.password);


        // if password not match return error massage
        if (!isMatch) {
            return res.status(400).json({ msg: "password is incorrect" });
        }

        // if password match create token 
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // return token to client
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ msg: "server error" });
    }
};

module.exports = { register, login };