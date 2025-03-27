require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const app = express();
const PORT = process.env.PORT || 5000;

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

// Public Route
app.get("/", (req, res) => res.send("Public API - No Authentication Required"));

// Protected Route (requires Auth0 JWT)
app.get("/profile", checkJwt, (req, res) => {
  res.send({ message: "This is a protected route!", user: req.user });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
