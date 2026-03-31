require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// middleware
app.use(express.json());
// routes
const authRoutes = require("./routes/authRoutes")
app.use("/auth", authRoutes);

const habitRoutes = require("./routes/habitRoutes")
app.use("/habits", habitRoutes);

const progressRoutes = require("./routes/progressRoutes")
app.use("/progress", progressRoutes);

const friendRoutes = require("./routes/friendRoutes");
app.use("/friends", friendRoutes);

const notificationRoutes = require("./routes/notificationRoutes");
app.use("/notifications", notificationRoutes);


// connect to MongoDB
const port = process.env.PORT || 3000;
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to mongodb");
    } catch (error) {
        console.log(error);
    }
}

connectDB();

// run server 
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})