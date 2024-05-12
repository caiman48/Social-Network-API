const User = require("../models/User");

const userController = {

    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Failed to get users", error });
        }
    },
    // get user by id
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);