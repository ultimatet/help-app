module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'questions',  // Specify the table name
    timestamps: true,        // Automatically add createdAt and updatedAt fields
  });

  return Question;
};