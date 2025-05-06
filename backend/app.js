require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwksRsa = require("jwks-rsa");
const { expressjwt: jwt } = require("express-jwt");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
        res.status(401).send({ error: "Unauthorized" });
    } else {
        next(err);
    }
});

// Routes
app.get("/", (req, res) => res.send("Public API - No Authentication Required"));
app.get("/profile", checkJwt, (req, res) => {
    res.send({ message: "This is a protected route!", user: req.user });
});

module.exports = app;
