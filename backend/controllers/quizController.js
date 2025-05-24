const { QuizResult, User } = require("../models");
const questions = require("../data/questions.json");
const loadOutputLookup = require("../utils/loadOutputLookup");
const { sequelize } = require("../models");
const fs = require("fs");
const path = require("path");
const questionsPath = path.join(__dirname, "../data/questions.json");

let outputLookup = {};

// Initialize output lookup once
const initializeOutputLookup = async () => {
    try {
        outputLookup = await loadOutputLookup();
    } catch (err) {
        console.error("Could not load output lookup:", err);
    }
};

// Initialize on module load
initializeOutputLookup();

const quizController = {
    getQuestions: (req, res) => {
        res.json(questions);
    },

    createQuestion: (req, res) => {
        const { text, category, domain } = req.body;

        if (!text || !category || !domain) {
            return res.status(400).json({ error: "Text, category, and domain are required." });
        }

        const newId = questions.length ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
        const newQuestion = { id: newId, text, category, domain };

        questions.push(newQuestion);

        fs.writeFile(questionsPath, JSON.stringify(questions, null, 2), (err) => {
            if (err) {
                console.error("Failed to save question:", err);
                return res.status(500).json({ error: "Failed to save question" });
            }
            return res.status(201).json(newQuestion);
        });
    },

    deleteQuestion: (req, res) => {
        const { id } = req.params;
        const questionId = parseInt(id);

        const index = questions.findIndex((q) => q.id === questionId);
        if (index === -1) {
            return res.status(404).json({ error: "Question not found" });
        }

        questions.splice(index, 1);

        fs.writeFile(questionsPath, JSON.stringify(questions, null, 2), (err) => {
            if (err) {
                console.error("Failed to delete question:", err);
                return res.status(500).json({ error: "Failed to delete question" });
            }
            return res.json({ message: `Question ${questionId} deleted successfully.` });
        });
    },

    processAnswers: (answers) => {
        const scores = {};
        const formattedAnswers = [];

        for (let [questionId, selectedValue] of Object.entries(answers)) {
            if (selectedValue != null) {
                // Find the question from JSON to get its domain
                const question = questions.find((q) => q.id === questionId);
                if (question) {
                    // Extract numeric ID from "Q1" -> 1, "Q2" -> 2, etc.
                    const numericQuestionId = parseInt(questionId.replace("Q", ""));

                    // Initialize domain score if not exists
                    if (!scores[question.domain]) {
                        scores[question.domain] = 0;
                    }

                    // Accumulate score for the domain
                    scores[question.domain] += selectedValue;

                    // Add to formatted answers array
                    formattedAnswers.push({
                        questionId: numericQuestionId,
                        selectedValue: selectedValue,
                    });
                }
            }
        }

        // Normalize scores
        for (let domain in scores) {
            const domainQuestions = questions.filter((q) => q.domain === domain);
            scores[domain] = scores[domain] / domainQuestions.length;
        }

        return { scores, formattedAnswers };
    },

    buildReport: (scores) => {
        const report = {};
        for (let [domain, score] of Object.entries(scores)) {
            const buckets = outputLookup[domain] || [];
            const bucket =
                buckets.find((b) => {
                    if (b.min != null && score < b.min) return false;
                    if (b.max != null && score > b.max) return false;
                    return true;
                }) || {};

            report[domain] = {
                score, // 0–10
                againstBenchmark: bucket.label || "", // "Lower"/"Similar"/"Higher"
                meaning: bucket.meaning || "", // "What This Means" text
                action: bucket.action || "", // "What You Can Do" text
            };
        }
        return report;
    },

    submitQuiz: async (req, res) => {
        const transaction = await sequelize.transaction();

        try {
            const { email, answers } = req.body;

            // Find user by email
            const user = await User.findOne({ where: { auth0_email: email }, transaction });
            if (!user) {
                await transaction.rollback();
                return res.status(404).json({ error: "User not found" });
            }

            const userId = user.id;

            // Format answers and calculate scores
            const { scores, formattedAnswers } = quizController.processAnswers(answers);

            if (formattedAnswers.length === 0) {
                await transaction.rollback();
                return res.status(400).json({ error: "No valid quiz answers provided" });
            }

            // Create a single quiz result record
            const quizResult = await QuizResult.create(
                {
                    userId: userId,
                    answers: formattedAnswers,
                    categoryScores: scores,
                },
                { transaction }
            );

            // Update user with latest result
            await User.update(
                { result: quizResult.id },
                {
                    where: { id: userId },
                    transaction,
                }
            );

            // Build the personalized report
            const report = quizController.buildReport(scores);

            // Commit transaction before sending response
            await transaction.commit();

            return res.json({ report, quizResultId: quizResult.id });
        } catch (err) {
            // Only rollback if transaction hasn't been committed yet
            if (!transaction.finished) {
                await transaction.rollback();
            }
            console.error("Quiz submission error:", err);
            return res.status(500).json({ error: "Server error", details: err.message });
        }
    },

    getUserResults: async (req, res) => {
        try {
            const { userId } = req.params;

            const results = await QuizResult.findAll({
                where: { userId },
                attributes: ["id", "answers", "categoryScores", "createdAt"],
                order: [["createdAt", "DESC"]],
            });

            if (!results || results.length === 0) {
                return res.status(404).json({ error: "No results found for this user" });
            }

            return res.json({
                userId,
                results: results.map((result) => ({
                    id: result.id,
                    answers: result.answers,
                    scores: result.categoryScores,
                    createdAt: result.createdAt,
                })),
            });
        } catch (err) {
            console.error("Get results error:", err);
            return res.status(500).json({ error: "Server error" });
        }
    },
};

module.exports = quizController;
