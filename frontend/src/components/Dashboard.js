import React, { useEffect, useState } from "react";
import FileSaver from "file-saver";
import supabase from "../lib/supabase";
import "./Dashboard.css";

const Dashboard = ({ user }) => {
    const [userRole, setUserRole] = useState(null); // role fetched from backend
    const [questions, setQuestions] = useState([]);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ question_text: "", category: "" });
    const [error, setError] = useState("");
    const [view, setView] = useState("menu"); // "menu", "edit", "export"

    // Initial fetch of user role from supabase
    useEffect(() => {
        if (!user?.id) return;
        async function fetchUserRole() {
            // Fetch the user's role from the users table
            const { data, error } = await supabase
                .from("users")
                .select("role")
                .eq("auth_id", user.id)
                .single();
            if (error) {
                console.error("Failed to fetch user role from Supabase:", error);
            } else {
                setUserRole(data.role);
                console.log("User role:", data.role);
            }
        }
        fetchUserRole();
    }, [user.id]);

    // Role verification
    useEffect(() => {
        if (!user && userRole !== "admin" && userRole !== "researcher") {
            setError("Access denied");
        } else {
            setError("");
        }
    }, [user, userRole]);

    //Fetch questions only if admin
    useEffect(() => {
        if (user && userRole === "admin") {
            // Fetch questions from Supabase
            supabase
                .from("questions")
                .select("id, question_text, category")
                .then(({ data, error }) => {
                    if (error) {
                        console.error("Failed to fetch questions from Supabase:", error);
                    } else {
                        setQuestions(data);
                    }
                });
        }
    }, [user, userRole]);

    const handleEdit = (q) => {
        setEditing(q.id);
        setForm({
            question_text: q.question_text, // Use DB field
            category: q.category, // Use DB field
        });
    };

    const handleDelete = (id) => {
        // supabase
        //     .delete(`http://localhost:5000/admin/questions/${id}`)
        //     .then(() => {
        //         setQuestions(questions.filter((q) => q.id !== id));
        //         setForm({ question_text: "", category: "" });
        //         setEditing(null);
        //         console.log("Question deleted successfully");
        //     })
        //     .catch((err) => {
        //         console.error("Error deleting question:", err);
        //     });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            // Update existing question
            supabase
                .from("questions")
                .update({
                    question_text: form.question_text,
                    category: form.category,
                })
                .eq("id", editing)
                .then(({ data, error }) => {
                    if (error) {
                        console.error("Failed to update question:", error);
                        setError("Failed to update question");
                    } else {
                        setQuestions(
                            questions.map((q) =>
                                q.id === editing ? { ...q, ...data[0] } : q
                            )
                        );
                        setEditing(false);
                        setForm({ question_text: "", category: "" });
                    }
                });
        } else {
            // Add new question
            supabase
                .from("questions")
                .insert([{ question_text: form.question_text, category: form.category }])
                .then(({ data, error }) => {
                    if (error) {
                        console.error("Failed to add question:", error);
                        setError("Failed to add question");
                    } else {
                        setQuestions([...questions, data[0]]);
                        setForm({ question_text: "", category: "" });
                    }
                });
        }
    };

    // Export quiz_results as CSV and trigger download (from Supabase)
    const handleExport = async () => {
        try {
            // Fetch all quiz results from Supabase
            let { data: results, error } = await supabase
                .from("quiz_results")
                .select("id, userId, answers, categoryScores, createdAt");
            if (error) throw new Error("Failed to fetch quiz results: " + error.message);
            if (!results || results.length === 0) throw new Error("No quiz results found");

            // Convert to CSV (comma-separated, JSON fields properly quoted for Excel)
            const header = ["id", "userId", "answers", "categoryScores", "createdAt"];
            function escapeForCSV(val) {
                if (typeof val === "object") val = JSON.stringify(val);
                if (typeof val === "string") {
                    // Escape double quotes by doubling them
                    val = val.replace(/"/g, '""');
                    return `"${val}"`;
                }
                return val;
            }
            const csv = [
                header.join(","),
                ...results.map((row) =>
                    [
                        row.id,
                        row.userId,
                        escapeForCSV(row.answers),
                        escapeForCSV(row.categoryScores),
                        row.createdAt,
                    ].join(",")
                ),
            ].join("\r\n");

            // Download
            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            FileSaver.saveAs(blob, "quiz_results.csv");
        } catch (err) {
            alert("Export failed: " + err.message);
        }
    };

    if (error) return <div className="dashboard-error">{error}</div>;
    if (!user || (userRole !== "admin" && userRole !== "researcher")) return null;

    return (
        <div className="outer-dashboard-container">
            <div className="dashboard-container">
                <h2>Admin/Researcher Dashboard</h2>

                {view === "menu" && (
                    <div className="dashboard-menu">
                        <button onClick={() => setView("edit")}>Edit Questions</button>
                        <button onClick={() => setView("export")}>Export Data</button>
                    </div>
                )}

                {view === "edit" && (
                    <>
                        <button id="back-btn" onClick={() => setView("menu")}>
                            ← Back to Menu
                        </button>

                        {userRole === "admin" ? (
                            <>
                                <form onSubmit={handleSubmit} className="dashboard-form">
                                    <input
                                        name="question_text"
                                        value={form.question_text}
                                        onChange={handleChange}
                                        placeholder="Question text"
                                        required
                                    />
                                    <input
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        placeholder="Domain"
                                    />

                                    <button type="submit">
                                        {editing ? "Update" : "Add"} Question
                                    </button>
                                    {editing && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditing(false);
                                                setForm({
                                                    question_text: "",
                                                    category: "",
                                                });
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </form>

                                <h3>All Questions</h3>
                                <ul className="dashboard-list">
                                    {questions.map((q) => (
                                        <li key={q.id}>
                                            <b>{q.question_text}</b> <i>({q.category})</i>
                                            <div>
                                                <button onClick={() => handleEdit(q)}>Edit</button>
                                                <button onClick={() => handleDelete(q.id)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>
                                <br />
                                You do not have permission to edit questions.
                            </p>
                        )}
                    </>
                )}

                {view === "export" && (
                    <div className="export-placeholder">
                        <div className="table-summary">
                            <h2>Summary of Quiz Results Table</h2>
                            <p>
                                This table displays quiz submissions collected from all users across
                                the platform. Each row represents a unique quiz attempt and includes
                                the following information:
                            </p>
                            <ul>
                                <li>
                                    <strong>id</strong>: The unique identifier for each quiz result
                                    submission. Each quiz attempt receives its own sequential id.
                                </li>
                                <li>
                                    <strong>userId</strong>: The unique identifier of the user who
                                    submitted the quiz. This links the result to the user's account
                                    in the database.
                                </li>
                                <li>
                                    <strong>answers</strong>: A JSON array containing each{" "}
                                    <code>questionId</code> and its corresponding{" "}
                                    <code>selectedValue</code> (rated from 1 to 5).
                                </li>
                                <li>
                                    <strong>categoryScores</strong>: A JSON object with the average
                                    score per domain (e.g.,
                                    <em> Talking Support</em>, <em> Knowledge</em>,{" "}
                                    <em> Experience</em>, etc.), calculated based on the answers
                                    submitted.
                                </li>
                                <li>
                                    <strong>createdAt</strong>: Timestamps indicating
                                    when each quiz result was recorded or last modified.
                                </li>
                            </ul>
                            <p>
                                This dataset enables researchers and administrators to analyze
                                trends in death literacy, monitor learning progress across
                                demographics, and evaluate the effectiveness of interventions or
                                educational resources offered on the platform.
                            </p>
                        </div>

                        <button onClick={handleExport}>Download Quiz Results</button>
                        <button onClick={() => setView("menu")}>← Back to Menu</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
