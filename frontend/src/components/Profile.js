import React, { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import { getBenchmarkInfo } from "../lib/benchmarks";
import { Radar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import "./Profile.css";

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Profile = ({ user }) => {
    const [role, setRole] = useState(null);
    const [reports, setReports] = useState([]);
    const [selIdx, setSelIdx] = useState(0);
    const [editing, setEditing] = useState(false);
    const [nameInput, setNameInput] = useState("");

    useEffect(() => {
        if (!user?.id) return;

        const fetchRole = async () => {
            const { data, error } = await supabase
                .from("users")
                .select("role")
                .eq("auth_id", user.id)
                .single();

            if (error) console.error("fetch role:", error);
            else setRole(data.role);
        };

        fetchRole();
    }, [user?.id]);

    useEffect(() => {
        if (!user?.id) return;

        const fetchReports = async () => {
            const { data: userRow, error: userError } = await supabase
                .from("users")
                .select("id")
                .eq("auth_id", user.id)
                .single();

            if (userError || !userRow) return console.error("fetch user row:", userError);

            const { data, error } = await supabase
                .from("quiz_results")
                .select("id, answers, categoryScores, createdAt")
                .eq("userId", userRow.id)
                .order("createdAt", { ascending: false })
                .limit(3);

            if (error) console.error("fetch reports:", error);
            else setReports(data);
        };

        fetchReports();
    }, [user?.id]);

    useEffect(() => {
        if (user?.user_metadata?.full_name) {
            setNameInput(user.user_metadata.full_name);
        } else if (user?.email) {
            setNameInput("");
        }
    }, [user]);

    const handleEdit = () => setEditing((prev) => !prev);
    const handleNameChange = (e) => setNameInput(e.target.value);

    const handleNameSave = async () => {
        if (!user?.id) return;

        const { error } = await supabase.auth.updateUser({
            data: { full_name: nameInput },
        });

        if (error) alert("Failed to update name: " + error.message);
        else setEditing(false);
    };

    const domainColors = [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 205, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(83, 102, 255, 0.5)",
        "rgba(199, 199, 199, 0.5)",
    ];
    const borderColors = domainColors.map((c) => c.replace("0.5", "1"));

    const report = reports[selIdx];
    const hasScores = report?.categoryScores && typeof report.categoryScores === "object";

    const radarData = hasScores
        ? {
              labels: Object.keys(report.categoryScores),
              datasets: [
                  {
                      label: "Death Literacy Score",
                      data: Object.values(report.categoryScores),
                      backgroundColor: Object.keys(report.categoryScores).map(
                          (_, i) => domainColors[i % domainColors.length]
                      ),
                      borderColor: Object.keys(report.categoryScores).map(
                          (_, i) => borderColors[i % borderColors.length]
                      ),
                      borderWidth: 3,
                      pointBackgroundColor: Object.keys(report.categoryScores).map(
                          (_, i) => borderColors[i % borderColors.length]
                      ),
                      pointBorderColor: "#fff",
                  },
              ],
          }
        : null;

    const radarOptions = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
            r: {
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: { beginAtZero: true, stepSize: 1, font: { size: 12 } },
                pointLabels: { font: { size: 13 } },
            },
        },
    };

    if (!user?.id) return <div>Loading user...</div>;

    return (
        <div className="profile-container">
            <div className="container-bg">
                <div className="profile">
                    {editing ? (
                        <>
                            <input
                                type="text"
                                value={nameInput}
                                onChange={handleNameChange}
                                placeholder="Enter your name"
                            />
                            <button onClick={handleNameSave}>Save</button>
                            <button onClick={() => setEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <h2 className="profile-name-row">
                                {user.user_metadata?.full_name || user.email}
                                <span
                                    className="edit-name-icon"
                                    title="Edit Name"
                                    onClick={handleEdit}
                                    role="button"
                                    tabIndex={0}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") handleEdit();
                                    }}
                                >
                                    <span className="edit-name-inner-icon">🖋</span>
                                </span>
                            </h2>
                            <p>{user.email}</p>
                            <p>Role: {role ?? "--"}</p>
                        </>
                    )}
                </div>

                <div className="report-container">
                    <div className="report-card">
                        <h2>Reports</h2>

                        {reports.length > 1 && (
                            <div style={{ marginBottom: "1rem" }}>
                                <label htmlFor="report-select">
                                    <b>Select Report:</b>
                                </label>{" "}
                                <select
                                    id="report-select"
                                    value={selIdx}
                                    onChange={(e) => setSelIdx(Number(e.target.value))}
                                >
                                    {reports.map((r, i) => (
                                        <option key={r.id} value={i}>
                                            {new Date(r.createdAt).toLocaleString()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {hasScores ? (
                            <>
                                <p>Date: {new Date(report.createdAt).toLocaleString()}</p>
                                <div className="radar-chart">
                                    <Radar data={radarData} options={radarOptions} />
                                </div>
                                <div className="detailed-report">
                                    <h3>Detailed Analysis</h3>
                                    {Object.entries(report.categoryScores).map(
                                        ([domain, score]) => {
                                            const bench = getBenchmarkInfo(domain, score);
                                            return (
                                                <details key={domain} className="report-domain">
                                                    <summary className="domain-summary">
                                                        <h4>{domain}</h4>
                                                        <span className="score-badge">
                                                            {typeof score === "number" &&
                                                            !isNaN(score)
                                                                ? score.toFixed(1)
                                                                : "-"}
                                                            /5
                                                        </span>
                                                    </summary>
                                                    <div className="domain-content">
                                                        <p>
                                                            <strong>How you scored:</strong>{" "}
                                                            {bench?.label || "-"}
                                                        </p>
                                                        <p>
                                                            <strong>What this means:</strong>{" "}
                                                            {bench?.meaning || "-"}
                                                        </p>
                                                        <p>
                                                            <strong>What you can do:</strong>{" "}
                                                            {bench?.action || "-"}
                                                        </p>
                                                    </div>
                                                </details>
                                            );
                                        }
                                    )}
                                </div>
                            </>
                        ) : (
                            <p>No report data found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
