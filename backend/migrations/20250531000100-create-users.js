"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("users", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            auth0_email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            result: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "quiz_results",
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("users");
    },
};
