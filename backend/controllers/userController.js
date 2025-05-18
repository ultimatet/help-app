const { get } = require('../app');
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

    async getUserRoleByEmail(req, res) {
        const { email } = req.params;

        if (!email) {
            return res.status(400).json({ error: "Email parameter is required" });
        }

        try {
            const user = await User.findOne({ where: { auth0_email: email } });

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Send only the role back
            res.status(200).json({ role: user.role });
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    

    async createUser(req, res) {
        const { email, role = 'user' } = req.body;

        try {
          const existingUser = await User.findOne({ where: { auth0_email: email } });
      
          if (existingUser) {
            return res.status(200).json({ message: 'User already exists' });
          }
      
          const newUser = await User.create({ auth0_email: email, role });
          return res.status(201).json({ message: 'User created', user: newUser });
        } catch (error) {
          console.error('Error creating user:', error);
          return res.status(500).json({ error: 'Internal server error' });
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