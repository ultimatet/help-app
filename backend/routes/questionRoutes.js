const express = require("express");
const questionController = require("../controllers/questionController");
const router = express.Router();

// --- Quiz logic ---
router.post("/submit", questionController.submitQuiz);
router.get("/results/:userId", questionController.getUserResults);

// --- Question CRUD ---
router.get("/", questionController.getAllQuestions);
router.get("/:id", questionController.getQuestionById);

module.exports = router;
