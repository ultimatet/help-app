"use strict";
module.exports = (sequelize, DataTypes) => {
    const QuizResult = sequelize.define(
        "QuizResult",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            answers: {
                type: DataTypes.JSON,
                allowNull: false,
                validate: {
                    isValidAnswers(value) {
                        if (!Array.isArray(value)) {
                            throw new Error('Answers must be an array');
                        }
                        value.forEach(answer => {
                            if (!answer.questionId || !answer.selectedValue) {
                                throw new Error('Each answer must have questionId and selectedValue');
                            }
                            if (answer.selectedValue < 1 || answer.selectedValue > 5) {
                                throw new Error('Selected value must be between 1 and 5');
                            }
                        });
                    }
                }
            },
            categoryScores: {
                type: DataTypes.JSON,
                allowNull: false,
                validate: {
                    isValidScores(value) {
                        if (typeof value !== 'object' || value === null) {
                            throw new Error('Category scores must be an object');
                        }
                    }
                }
            }
        },
        {
            tableName: "quiz_results",
            timestamps: true,
        }
    );

    QuizResult.associate = (models) => {
        QuizResult.belongsTo(models.User, {
            foreignKey: "userId",
            as: "user",
        });
    }

    return QuizResult;
};
