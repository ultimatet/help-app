const express         = require('express');
const { QuizResult }  = require('../models');
const questions       = require('../data/questions.json');
const loadOutputLookup = require('../utils/loadOutputLookup');

const router = express.Router();
let outputLookup = {};

// 1) Load the lookup table once at startup
loadOutputLookup()
  .then(lu => { outputLookup = lu; })
  .catch(err => console.error('Could not load output lookup:', err));

// 2) Return all questions
router.get('/questions', (req, res) => {
  res.json(questions);
});

// 3) Accept answers, compute scores, and return detailed report
router.post('/submit', async (req, res) => {
  try {
    const { userId, answers } = req.body;

    // a) Sum & count per domain
    const sums = {}, counts = {};
    for (let q of questions) {
      const score = answers[q.id];
      if (score == null) continue;
      sums[q.domain]   = (sums[q.domain]   || 0) + score;
      counts[q.domain] = (counts[q.domain] || 0) + 1;
    }

    // b) Compute average 1–5 → scale to 0–10
    const scores = {};
    Object.keys(sums).forEach(domain => {
      const avg = sums[domain] / counts[domain];
      scores[domain] = Number(((avg - 1) / 4 * 10).toFixed(2));
    });

    // c) Persist the result
    await QuizResult.create({ userId, answers, scores });

    // d) Build the personalized report
    const report = {};
    for (let [domain, score] of Object.entries(scores)) {
      const buckets = outputLookup[domain] || [];
      const bucket  = buckets.find(b => {
        if (b.min != null && score < b.min) return false;
        if (b.max != null && score > b.max) return false;
        return true;
      }) || {};

      report[domain] = {
        score,                                  // 0–10
        againstBenchmark: bucket.label  || '', // “Lower”/“Similar”/“Higher”
        meaning:          bucket.meaning || '',// “What This Means” text
        action:           bucket.action  || '' // “What You Can Do” text
      };
    }

    return res.json({ report });
  } catch (err) {
    console.error('Quiz submission error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
