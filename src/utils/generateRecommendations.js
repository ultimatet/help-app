export const generateRecommendations = (scores) => {
  const recommendations = [];

  if (scores.categories.communication < 3) {
    recommendations.push(
      "Consider starting small conversations about end-of-life wishes with trusted family members."
    );
  }

  if (scores.categories.knowledge < 3) {
    recommendations.push(
      "Explore resources about palliative care options available in your community."
    );
  }

  if (scores.categories.planning < 3) {
    recommendations.push(
      "Begin documenting your preferences for end-of-life care in a living will."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Continue building on your strong foundation of death literacy by sharing your knowledge with others."
    );
  }

  return recommendations;
};