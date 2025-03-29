require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwksRsa = require("jwks-rsa");
const { expressjwt: jwt } = require("express-jwt");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Auth0 JWT Middleware
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    console.error('Invalid JWT:', err);
    // Log error details:
    console.error('Error Type:', err.code);
    console.error('Error Message:', err.message);
  }
  next(err);
});

// Routes
app.get("/", (req, res) => res.send("Public API - No Authentication Required"));

app.get("/profile", checkJwt, (req, res) => {
  res.send({ message: "This is a protected route!", user: req.user });
});

// Database and Server Initialization
async function startServer() {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Database connection established");

    // Sync models (use { alter: true } in development only)
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

// Start the application
startServer();