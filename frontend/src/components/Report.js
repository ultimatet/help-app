import React from "react";
// import { calculateScores } from "../utils/calculateScores";
// import { generateRecommendations } from "../utils/generateRecommendations";
import { Link } from "react-router-dom";
import "./Report.css";

const Report = ({ answers, questions }) => {
    // const scores = calculateScores(answers, questions);
    // const recommendations = generateRecommendations(scores);

    return (
        <div className="report">
            <h2>Your Death Literacy Report</h2>
        </div>
    );
};

export default Report;
