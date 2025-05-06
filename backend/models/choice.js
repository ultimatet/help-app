module.exports = (sequelize, DataTypes) => {
    const Choice = sequelize.define(
        "Choice",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            points: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            questionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "questions",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
        },
        {
            tableName: "choices",
            timestamps: true,
        }
    );

    Choice.associate = (models) => {
        Choice.belongsTo(models.Question, {
            foreignKey: "questionId",
            as: "question",
        });
    };

    return Choice;
};
