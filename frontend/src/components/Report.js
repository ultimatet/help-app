import React from "react";
import { calculateScores } from "../utils/calculateScores";
import { generateRecommendations } from "../utils/generateRecommendations";
import "./Report.css";

const Report = ({ answers, questions, resetDemo }) => {
  const scores = calculateScores(answers, questions);
  const recommendations = generateRecommendations(scores);



  return (
    <div className="report">
      <h2>Your Death Literacy Report</h2>
      <p>
        Total Score: {scores.total} / {scores.maxScore} ({scores.percentage}%)
      </p>
      <h3>Category Scores:</h3>
      <ul>
        <li>Communication: {scores.categories.communication}</li>
        <li>Knowledge: {scores.categories.knowledge}</li>
        <li>Planning: {scores.categories.planning}</li>
      </ul>
      <h3>Recommendations:</h3>
      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index}>{recommendation}</li>
        ))}
      </ul>
      <button className="reset" onClick={resetDemo}>Reset Demo</button>
    </div>
  );
};

export default Report;