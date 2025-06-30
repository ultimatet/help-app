import React from "react";
import { Radar } from "react-chartjs-2";
import { useLocation, useNavigate } from "react-router-dom";
import { getBenchmarkInfo } from "../lib/benchmarks";
import "./Report.css";

// Report component displays the user's quiz results, including a radar chart and detailed analysis
const Report = ({ session, user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    // Get report data from location state (from Quiz submission)
    const report = location.state?.report;
    const scores = report?.categoryScores || null;

    // Define color palettes for each domain in the radar chart
    const domainColors = [
        "rgba(255, 99, 132, 0.5)", // red
        "rgba(54, 162, 235, 0.5)", // blue
        "rgba(255, 205, 86, 0.5)", // yellow
        "rgba(75, 192, 192, 0.5)", // teal
        "rgba(153, 102, 255, 0.5)", // purple
        "rgba(255, 159, 64, 0.5)", // orange
        "rgba(83, 102, 255, 0.5)", // indigo
        "rgba(199, 199, 199, 0.5)", // grey
    ];
    const borderColors = domainColors.map((c) => c.replace("0.5", "1"));

    // Prepare radar chart data, assigning a unique color to each domain
    const radarData = scores
        ? {
              labels: Object.keys(scores),
              datasets: [
                  {
                      label: "Death Literacy Score",
                      data: Object.values(scores).map((v) =>
                          typeof v === "number" && !isNaN(v) ? Number(v.toFixed(2)) : 0
                      ),
                      backgroundColor: Object.keys(scores).map(
                          (_, i) => domainColors[i % domainColors.length]
                      ),
                      borderColor: Object.keys(scores).map(
                          (_, i) => borderColors[i % borderColors.length]
                      ),
                      borderWidth: 3,
                      pointBackgroundColor: Object.keys(scores).map(
                          (_, i) => borderColors[i % borderColors.length]
                      ),
                      pointBorderColor: "#fff",
                  },
              ],
          }
        : null;

    // Radar chart options, including custom legend to show all domains
    const radarOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: "bottom",
                labels: {
                    usePointStyle: false,
                    padding: 20,
                    font: {
                        size: 16,
                    },
                    // Show all domains in the legend with their color
                    generateLabels: (chart) => {
                        const labels = chart.data.labels || [];
                        return labels.map((label, i) => ({
                            text: label,
                            fillStyle: chart.data.datasets[0].backgroundColor[i],
                            strokeStyle: chart.data.datasets[0].borderColor[i],
                            lineWidth: 5,
                            hidden: false,
                            index: i,
                        }));
                    },
                },
            },
        },
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 5, 
                ticks: {
                    beginAtZero: true, stepsize: 1, font: { size: 12 },
                },
            },
        },
    };

    if (!scores) return <div>No report data found.</div>;

    return (
        <div className="report">
            <h2>Your Assessment Report</h2>
            <div className="report-view">
                {/* Radar Chart (shows scores for each domain, colored per domain) */}
                {radarData && (
                    <div className="chart-container">
                        <h3>Score Visualization</h3>
                        <div className="responsive-radar">
                            <Radar data={radarData} options={radarOptions} />
                        </div>
                    </div>
                )}

                {/* Detailed Report (collapsible per domain) */}
                <div className="detailed-report">
                    <h3>Detailed Analysis</h3>
                    {scores &&
                        Object.entries(scores).map(([domain, score]) => {
                            const bench = getBenchmarkInfo(domain, score);
                            return (
                                <details key={domain} className="report-domain">
                                    <summary className="domain-summary">
                                        <h4>{domain}</h4>
                                        <span className="score-badge">
                                            {typeof score === "number" && !isNaN(score)
                                                ? score.toFixed(1)
                                                : "-"}
                                            /5
                                        </span>
                                    </summary>
                                    <div className="domain-content">
                                        <p>
                                            <strong>How you scored:</strong> {bench?.label || "-"}
                                        </p>
                                        <p>
                                            <strong>What this means:</strong>{" "}
                                            {bench?.meaning || "-"}
                                        </p>
                                        <p>
                                            <strong>What you can do:</strong> {bench?.action || "-"}
                                        </p>
                                    </div>
                                </details>
                            );
                        })}
                </div>
            </div>

            {/* Retake Quiz button */}
            <div className="report-actions">
                <button onClick={() => navigate("/quiz")}>Retake Quiz</button>
            </div>
        </div>
    );
};

export default Report;
