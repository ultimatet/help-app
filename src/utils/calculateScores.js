export const calculateScores = (answers, questions) => {
  let totalScore = 0;
  const categoryScores = {
    communication: 0,
    knowledge: 0,
    planning: 0,
  };
  const maxPossibleScore = questions.length * 5;

  questions.forEach((question) => {
    if (answers[question.id]) {
      totalScore += answers[question.id].score;
      categoryScores[question.category] += answers[question.id].score;
    }
  });

  const percentageScore = Math.round((totalScore / maxPossibleScore) * 100);

  return {
    total: totalScore,
    percentage: percentageScore,
    categories: categoryScores,
  };
};