"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // 1. First update users.result to be null
        await queryInterface.sequelize.query("UPDATE users SET result = NULL;");

        // 2. Remove the foreign key constraint
        await queryInterface.sequelize.query(
            "ALTER TABLE users DROP CONSTRAINT IF EXISTS users_result_fkey;"
        );

        // 3. Then drop existing table
        await queryInterface.dropTable("quiz_results");

        // 4. Create new quiz_results table structure
        await queryInterface.createTable("quiz_results", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            answers: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            categoryScores: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        // 1. Remove the foreign key constraint first
        await queryInterface.sequelize.query(
            "ALTER TABLE users DROP CONSTRAINT IF EXISTS users_result_fkey;"
        );

        // 2. Drop the new table
        await queryInterface.dropTable("quiz_results");

        // 3. Recreate the original table structure without questionId
        await queryInterface.createTable("quiz_results", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            answers: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            categoryScores: {
                type: Sequelize.JSON,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn("NOW"),
            },
        });
    },
};
