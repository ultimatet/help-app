const questions = [
  {
    id: 1,
    text: "How comfortable are you discussing end-of-life wishes with your family?",
    options: [
      { id: 1, text: "Very uncomfortable", score: 1 },
      { id: 2, text: "Somewhat uncomfortable", score: 2 },
      { id: 3, text: "Neutral", score: 3 },
      { id: 4, text: "Somewhat comfortable", score: 4 },
      { id: 5, text: "Very comfortable", score: 5 },
    ],
    category: "communication",
  },
  {
    id: 2,
    text: "How knowledgeable are you about available end-of-life care options?",
    options: [
      { id: 1, text: "Not at all knowledgeable", score: 1 },
      { id: 2, text: "Slightly knowledgeable", score: 2 },
      { id: 3, text: "Moderately knowledgeable", score: 3 },
      { id: 4, text: "Very knowledgeable", score: 4 },
      { id: 5, text: "Extremely knowledgeable", score: 5 },
    ],
    category: "knowledge",
  },
  {
    id: 3,
    text: "Have you made any formal arrangements for your end-of-life care?",
    options: [
      { id: 1, text: "No arrangements at all", score: 1 },
      { id: 2, text: "Thought about it but no formal plans", score: 2 },
      { id: 3, text: "Some basic discussions with family", score: 3 },
      { id: 4, text: "Started formal documentation", score: 4 },
      { id: 5, text: "Comprehensive plans in place", score: 5 },
    ],
    category: "planning",
  },
];

export default questions;