export const generateRecommendations = (scores) => {
  const recommendations = [];

  // Communication recommendations
  if (scores.categories.communication < 3) {
    recommendations.push(
      "Begin with small conversations about end-of-life wishes with close family members or friends. Start by sharing an article or news story as a conversation opener."
    );
    recommendations.push(
      "Practice using clear, non-euphemistic language when discussing death. Resources like The Conversation Project offer guided discussion prompts."
    );
  } else if (scores.categories.communication >= 3 && scores.categories.communication < 4) {
    recommendations.push(
      "Expand your comfort zone by discussing end-of-life preferences in more detail with family members. Consider recording these conversations for future reference."
    );
  } else if (scores.categories.communication >= 4) {
    recommendations.push(
      "Your communication skills are a valuable asset. Consider organizing family meetings to help others discuss end-of-life wishes or volunteer with community death education initiatives."
    );
  }

  // Knowledge recommendations
  if (scores.categories.knowledge < 3) {
    recommendations.push(
      "Learn about the different levels of end-of-life care including hospice, palliative care, and home care options available in your community."
    );
    recommendations.push(
      "Access resources from organizations like the National Hospice and Palliative Care Organization to understand the physical and emotional aspects of dying."
    );
  } else if (scores.categories.knowledge >= 3 && scores.categories.knowledge < 4) {
    recommendations.push(
      "Deepen your understanding by attending workshops on specific aspects of end-of-life care or exploring online courses on death education."
    );
  } else if (scores.categories.knowledge >= 4) {
    recommendations.push(
      "With your strong knowledge base, consider joining advocacy efforts to improve end-of-life care access or mentoring healthcare professionals on patient-centered approaches."
    );
  }

  // Planning recommendations
  if (scores.categories.planning < 3) {
    recommendations.push(
      "Start with basic documentation such as an advance directive or living will. Many free templates are available online to help you get started."
    );
    recommendations.push(
      "Research funeral and memorial costs in your area and consider setting up a dedicated savings account for end-of-life expenses."
    );
  } else if (scores.categories.planning >= 3 && scores.categories.planning < 4) {
    recommendations.push(
      "Review your existing end-of-life documents annually and ensure your healthcare proxy and family members know where to find them and understand your wishes."
    );
  } else if (scores.categories.planning >= 4) {
    recommendations.push(
      "Share your planning approach with others who haven't yet started this process. Consider creating a comprehensive end-of-life file with all relevant documents and information."
    );
  }

  // Overall recommendations based on average score
  if (scores.overall < 2) {
    recommendations.push(
      "Visit our platform's Learning Center for introductory resources on death literacy and join our beginner-friendly discussion forums to connect with others on similar journeys."
    );
  } else if (scores.overall >= 2 && scores.overall < 3.5) {
    recommendations.push(
      "Explore our platform's interactive planning tools and participate in our monthly virtual workshops to build confidence in discussing and preparing for end-of-life matters."
    );
  } else if (scores.overall >= 3.5) {
    recommendations.push(
      "Consider contributing to our community as a mentor or discussion facilitator. Your experience and comfort with death literacy topics can help others navigate their own journeys."
    );
  }

  return recommendations;
};