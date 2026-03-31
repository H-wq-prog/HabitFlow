const Friend = require("../models/Friend");
const addFriend = async (req, res) => {
    try {
        const friend = await Friend.create({
            userId: req.user.id,
            friendName: req.body.friendName,
            friendEmail: req.body.friendEmail
        })
        res.status(201).json(friend);
    } catch (error) {
        res.status(500).json({ msg: "server is has error" })
    }
}

const getFriends = async (req, res) => {
    try {
        const friends = await Friend.find({
            userId: req.user.id
        })
        res.json(friends);
    } catch (error) {
        res.status(500).json({ msg: "server is has error" })
    }
}

const deleteFriend = async (req, res) => {
    try {
        await Friend.findByIdAndDelete(req.params.id);
        res.json({ msg: "Friend deleted" })
    } catch (error) {
        res.status(500).json({ msg: "server is has error" })
    }
}

module.exports = {
    addFriend,
    getFriends,
    deleteFriend,
};