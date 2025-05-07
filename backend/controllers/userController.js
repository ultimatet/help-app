const {User} = require('../models');

const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            if (users.length === 0) {
                return res.status(200).json([]); 
            }
            res.status(200).json(users);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const { auth0_email, role } = req.body;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            user.auth0_email = auth0_email;
            user.role = role;
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = userController;