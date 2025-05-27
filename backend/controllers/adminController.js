const { Question, QuizResult, User } = require("../models");
const { Parser } = require("json2csv");
const fs = require("fs");

const adminController = {
    async createQuestion(req, res) {
        try {
            const { question_text, category } = req.body;
            if (!question_text) {
                return res.status(400).json({ error: "question_text is required" });
            }
            const newQuestion = await Question.create({ question_text, category });
            res.status(201).json(newQuestion);
        } catch (error) {
            console.error("Error creating question:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async updateQuestion(req, res) {
        const { id } = req.params;
        const { question_text, category } = req.body;
        try {
            const question = await Question.findByPk(id);
            if (!question) {
                return res.status(404).json({ error: "Question not found" });
            }
            if (question_text !== undefined) question.question_text = question_text;
            if (category !== undefined) question.category = category;
            await question.save();
            res.status(200).json(question);
        } catch (error) {
            console.error("Error updating question:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async deleteQuestion(req, res) {
        const { id } = req.params;
        try {
            const question = await Question.findByPk(id);
            if (!question) {
                return res.status(404).json({ error: "Question not found" });
            }
            await question.destroy();
            res.status(204).send();
        } catch (error) {
            console.error("Error deleting question:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    // Export quiz_results as CSV
    exportQuizResults: async (req, res) => {
        try {
            const results = await QuizResult.findAll({
                include: [{ model: User, as: "user", attributes: ["id", "auth0_email"] }],
                order: [["createdAt", "DESC"]],
            });
            const plainResults = results.map((r) => r.get({ plain: true }));
            // Flatten user info
            const data = plainResults.map((r) => ({
                ...r,
                user_email: r.user ? r.user.auth0_email : "",
            }));
            // Remove nested user object
            data.forEach((d) => delete d.user);
            // Convert to CSV
            const parser = new Parser();
            const csv = parser.parse(data);
            res.header("Content-Type", "text/csv");
            res.attachment("quiz_results.csv");
            return res.send(csv);
        } catch (err) {
            console.error("Export quiz_results error:", err);
            res.status(500).json({ error: "Failed to export quiz results" });
        }
    },
};

module.exports = adminController;
