const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/questions", adminController.createQuestion);
router.put("/questions/:id", adminController.updateQuestion);
router.delete("/questions/:id", adminController.deleteQuestion);

module.exports = router;
