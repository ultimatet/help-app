module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            auth0_email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            result: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "quiz_results",
                    key: "id",
                },
            },
        },
        {
            tableName: "users",
            timestamps: true,
        }
    );

    User.associate = (models) => {
        User.hasMany(models.QuizResult, {
            foreignKey: "userId",
            as: "quizResult",
        });
    };

    return User;
};
