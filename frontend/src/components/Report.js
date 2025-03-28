import React from "react";
import { calculateScores } from "../utils/calculateScores";
import { generateRecommendations } from "../utils/generateRecommendations";
import { Link } from "react-router-dom";
import "./Report.css";

const Report = ({ answers, questions }) => {
  const scores = calculateScores(answers, questions);
  const recommendations = generateRecommendations(scores);



  return (
    <div className="report">
      <h2>Your Death Literacy Report</h2>
      {/* <h3>Category Scores:</h3>
      <div className="category-scores">
      <ul>
        <li>Communication: {scores.categories.communication}</li>
        <li>Knowledge: {scores.categories.knowledge}</li>
        <li>Planning: {scores.categories.planning}</li>
      </ul>
      </div> */}
      <h3>Recommendations:</h3>
      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index}>{recommendation}</li>
        ))}
      </ul>
      <Link className="reset" to='/home'>Reset Demo</Link>
    </div>
  );
};

export default Report;