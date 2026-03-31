const express = require("express")
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");


const {
    addFriend,
    getFriends,
    deleteFriend,
} = require("../controllers/friendController");

router.post("/", authMiddleware, addFriend);
router.get("/", authMiddleware, getFriends)
router.delete("/:id", authMiddleware, deleteFriend)


module.exports = router;