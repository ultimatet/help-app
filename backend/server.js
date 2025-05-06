require("dotenv").config();
const { sequelize } = require("./models");

const app = require("./app");
const PORT = process.env.PORT || 5000;

// Database and Server Initialization
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Database connection established");

    // Sync models with the database
    await sequelize.sync({
      alter: process.env.NODE_ENV === "development" // Careful in production
    });
    console.log("Database models synchronized");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
}

startServer();