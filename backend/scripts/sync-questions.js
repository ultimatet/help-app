// backend/scripts/sync-questions.js
require('dotenv').config();
const path = require('path');
const { Sequelize, Op } = require('sequelize');
const { Question } = require('../models');
const questions = require(path.join(__dirname, '..', 'data', 'questions.json'));

async function syncQuestions() {
  console.log(`Syncing ${questions.length} questions…`);
  for (const q of questions) {
    // If your JSON id is “Q1” string, convert to integer:
    const id = Number(q.id.replace(/^Q/, ''));
    const values = {
      id,
      category:     q.domain,
      question_text:q.text,
      answer_text:  q.answer_text || '',
      points:       q.points || 0
    };
    // Upsert: insert if new, update if exists
    await Question.upsert(values);
    process.stdout.write('.');
  }
  console.log('\n✅ Done.');
  process.exit(0);
}

syncQuestions().catch(err => {
  console.error('❌ Sync failed:', err);
  process.exit(1);
});

// run this at the begining to sync if add new questions: npm run sync:questions