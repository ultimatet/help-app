// backend/scripts/generate-questions-sql.js
const fs   = require('fs');
const path = require('path');

// 1) Load your JSON
const questions = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'data', 'questions.json'), 'utf8')
);

// 2) Build SQL statements
const lines = ['BEGIN;'];
for (const q of questions) {
  // If your IDs are "Q1", "Q2", etc, extract the number; otherwise adjust as needed
  const numericId = parseInt(q.id.replace(/^Q/, ''), 10);

  // Escape single quotes
  const category = q.domain.replace(/'/g, "''");
  const text     = q.text.replace(/'/g, "''");

  lines.push(
    `INSERT INTO questions (id, category, question_text, answer_text, points)` +
    ` VALUES (${numericId}, '${category}', '${text}', '', 0);`
  );
}
lines.push('COMMIT;');

// 3) Write to a .sql file
const outPath = path.join(__dirname, '..', 'data', 'questions.sql');
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(`Generated SQL → ${outPath}`);
