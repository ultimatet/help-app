const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/register-auth0-user", userController.createUser);
router.put("/:id", userController.updateUser);

module.exports = router;