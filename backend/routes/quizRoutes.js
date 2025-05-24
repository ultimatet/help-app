const express = require("express");
const quizController = require("../controllers/quizController");
const router = express.Router();

// Routes
router.get("/questions", quizController.getQuestions);
router.post("/questions", quizController.createQuestion); 
router.post("/submit", quizController.submitQuiz);
router.get("/results/:userId", quizController.getUserResults);
router.delete("/questions/:id", quizController.deleteQuestion);


module.exports = router;