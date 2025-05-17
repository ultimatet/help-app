const { Question, Choice } = require("../models");

const questionController = {
    async getAllQuestions(req, res) {
        try {
            const questions = await Question.findAll({
                include: [{ model: Choice, as: "choices" }],
            });
            if (questions.length === 0) {
                return res.status(200).json([]);
            }
            res.status(200).json(questions);
        } catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async getQuestionById(req, res) {
        const { id } = req.params;
        try {
            const question = await Question.findByPk(id, {
                include: [{ model: Choice, as: "choices" }],
            });
            if (!question) {
                return res.status(404).json({ error: "Question not found" });
            }
            res.status(200).json(question);
        } catch (error) {
            console.error("Error fetching question:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },
};

module.exports = questionController;
