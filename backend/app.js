// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwksRsa = require("jwks-rsa");
const { expressjwt: jwt } = require("express-jwt");

// Existing route modules
const questionRoutes = require("./routes/questionRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
    console.log("Request received:", {
        method: req.method,
        url: req.url,
        path: req.path,
        body: req.body,
    });
    next();
});

// Auth0 JWT Middleware
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ["RS256"],
});

// JWT error handling
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        console.error("Invalid JWT:", err.message);
        return res.status(401).json({ error: "Unauthorized" });
    }
    next(err);
});

// Public & protected routes
app.get("/", (req, res) => res.send("Public API - No Authentication Required"));
app.get("/profile", checkJwt, (req, res) => {
    res.json({ message: "This is a protected route!", user: req.user });
});

// Your existing routes
app.use("/question", questionRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/quiz", quizRoutes);

// Test route
app.get("/test", (req, res) => {
    res.json({ message: "Test route working" });
});

module.exports = app;
