import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Report from "./Report";
import "./Quiz.css";

const Quiz = () => {
    const { user } = useAuth0();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [step, setStep] = useState(0);
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 1) Fetch questions on mount
    useEffect(() => {
        fetch("/quiz/questions")
            .then((res) => res.json())
            .then(setQuestions)
            .catch((err) => console.error("Failed to fetch quiz questions:", err));
    }, []);

    // 2) Record an answer (1–5)
    const handleSelect = (value) => {
        const q = questions[step];
        setAnswers((a) => ({ ...a, [q.id]: value }));
    };

    // 3) Move next or submit
    const handleNext = () => {
        if (step < questions.length - 1) {
            setStep((s) => s + 1);
        } else {
            submitQuiz();
        }
    };
    // 4) Submit answers to backend
    const submitQuiz = async () => {
        if (!user?.email) {
            console.error("No authenticated user found");
            return;
        }

        setLoading(true);
        try {
            const payload = {
                email: user.email, // Using email from Auth0 user
                answers,
            };
            const res = await fetch("/quiz/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const { report } = await res.json();
            setReport(report);
        } catch (err) {
            console.error("Quiz submission failed:", err);
        } finally {
            setLoading(false);
        }
    };

    // 5) Render states
    if (!questions.length) return <div>Loading questions…</div>;
    if (report)
        return (
            <Report
                report={report}
                onRetake={() => {
                    setReport(null);
                    setAnswers({});
                    setStep(0);
                }}
            />
        );

    const q = questions[step];
    const selected = answers[q.id] || 0;

    return (
        <div className="quiz-container">
            <div className="quiz">
                <h2>
                    Question {step + 1} of {questions.length}
                </h2>
                <p className="question-text">{q.text}</p>

                <div className="likert-scale">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <label key={n} className="likert-option">
                            <input
                                type="radio"
                                name={q.id}
                                value={n}
                                checked={selected === n}
                                onChange={() => handleSelect(n)}
                            />
                            {n}
                        </label>
                    ))}
                </div>

                <div className="quiz-nav">
                    {step > 0 && (
                        <button onClick={() => setStep((s) => s - 1)} disabled={loading}>
                            Back
                        </button>
                    )}
                    {step === 0 && <button onClick={() => navigate("/")}>Back</button>}
                    <button
                        onClick={handleNext}
                        disabled={!selected || loading}
                        className="next-button"
                    >
                        {step < questions.length - 1
                            ? "Next"
                            : loading
                            ? "Submitting…"
                            : "Submit Quiz"}
                    </button>
                </div>

                <button className="cancel-button" onClick={() => navigate("/")}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Quiz;
