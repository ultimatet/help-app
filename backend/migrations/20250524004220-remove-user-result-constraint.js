"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // 1. Set all result values to null first
        await queryInterface.sequelize.query("UPDATE users SET result = NULL;");

        // 2. Drop the foreign key constraint
        await queryInterface.sequelize.query(
            "ALTER TABLE users DROP CONSTRAINT IF EXISTS users_result_fkey;"
        );
    },

    down: async (queryInterface, Sequelize) => {
        // Add back the foreign key constraint in down migration
        await queryInterface.addConstraint("users", {
            fields: ["result"],
            type: "foreign key",
            name: "users_result_fkey",
            references: {
                table: "quiz_results",
                field: "id",
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });
    },
};
