const { Question, Choice } = require("../models");

const adminController = {
    async createQuestion(req, res) {
        console.log("Received POST request for creating question");
        const { question_text, category, choices } = req.body;
        try {
            const newQuestion = await Question.create(
                {
                    question_text,
                    category,
                    choices,
                },
                {
                    include: [{ model: Choice, as: "choices" }],
                }
            );
            res.status(201).json(newQuestion);
        } catch (error) {
            console.error("Error creating question:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async updateQuestion(req, res) {
        const { id } = req.params;
        const { question_text, category, points, choices } = req.body;
    
        try {
            const question = await Question.findByPk(id, {
                include: [{ model: Choice, as: "choices" }],
            });
    
            if (!question) {
                return res.status(404).json({ error: "Question not found" });
            }
    
            // Update main fields
            question.question_text = question_text;
            question.category = category;
            question.points = points;
            await question.save();
    
            // Replace existing choices
            await Choice.destroy({ where: { questionId: question.id } });
            const newChoices = await Choice.bulkCreate(
                choices.map((choice) => ({
                    ...choice,
                    questionId: question.id,
                }))
            );
    
            res.status(200).json({ question, choices: newChoices });
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
};

module.exports = adminController;
