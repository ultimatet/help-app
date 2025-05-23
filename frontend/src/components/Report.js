import React from "react";
import "./Report.css";

const Report = ({ report, onRetake }) => {
  return (
    <div className="report">
      <h2>Your Death Literacy Report</h2>
      {Object.entries(report).map(([domain, { score, againstBenchmark, meaning, action }]) => (
        <div key={domain} className="report-domain">
          <h3>{domain}</h3>
          <p><strong>Score:</strong> {score}/10</p>
          <p><strong>How you scored:</strong> {againstBenchmark}</p>
          <p><strong>What this means:</strong> {meaning}</p>
          <p><strong>What you can do:</strong> {action}</p>
        </div>
      ))}

      <div className="report-actions">
        <button onClick={onRetake}>Retake Quiz</button>
      </div>
    </div>
  );
};

export default Report;
