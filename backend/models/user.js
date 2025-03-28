module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    google_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'users',  // Specify the table name
    timestamps: true,    // Automatically add createdAt and updatedAt fields
  });

  return User;
};