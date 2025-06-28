import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";
import "./Quiz.css";

const Quiz = ({ loading, setLoading }) => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [step, setStep] = useState(0);
    const navigate = useNavigate();

    // 1) Fetch questions from Supabase on mount
    useEffect(() => {
        async function fetchQuestions() {
            const { data, error } = await supabase
                .from("questions")
                .select("id, question_text, category");

            if (error) {
                console.error("Failed to fetch quiz questions from Supabase:", error);
                setQuestions([]);
            } else {
                // Normalize to always use q.id as a string and q.category, and set q.question_text for frontend compatibility
                const normalized = data.map((q) => ({
                    ...q,
                    id: typeof q.id === "number" ? String(q.id) : q.id,
                    question_text: q.question_text || q.text || "",
                    category: q.category || "",
                }));
                setQuestions(normalized);
            }
        }

        fetchQuestions();
    }, []);

    const handleSelect = (value) => {
        setAnswers((prev) => ({ ...prev, [questions[step].id]: value }));
    };

    const handleNext = async () => {
        setLoading(true);
        try {
            if (step < questions.length - 1) {
                setStep((s) => s + 1);
                setLoading(false);
            } else {
                // Submit logic
                try {
                    // Get current user from Supabase Auth
                    const {
                        data: { user },
                        error: userError,
                    } = await supabase.auth.getUser();
                    if (userError || !user) {
                        throw new Error("User not found in Supabase Auth: " + userError?.message);
                    }
                    const { data: userRow, error: dbError } = await supabase
                        .from("users")
                        .select("id")
                        .eq("auth_id", user.id)
                        .single();

                    if (dbError || !userRow) {
                        throw new Error("User not found in users table: " + dbError?.message);
                    }
                    const userId = userRow.id;

                    // 2. Transform answers from { qid: value } to array of { questionId, selectedValue }
                    const transformedAnswers = Object.entries(answers).map(
                        ([questionId, selectedValue]) => ({
                            questionId,
                            selectedValue,
                        })
                    );

                    // 3. Compute category scores (simple average per category for now)
                    const categoryScores = {};
                    questions.forEach((q) => {
                        const val = answers[q.id];
                        if (val) {
                            categoryScores[q.category] = categoryScores[q.category] || [];
                            categoryScores[q.category].push(val);
                        }
                    });

                    Object.keys(categoryScores).forEach((cat) => {
                        const values = categoryScores[cat];
                        const average = values.reduce((sum, val) => sum + val, 0) / values.length;
                        categoryScores[cat] = Number(average.toFixed(2));
                    });

                    // 4. Submit to Supabase `quiz_results` table
                    const { data: resultData, error: resultError } = await supabase
                        .from("quiz_results")
                        .insert([
                            {
                                userId,
                                answers: transformedAnswers,
                                categoryScores,
                            },
                        ])
                        .select();

                    if (resultError) {
                        throw new Error("Failed to insert quiz result: " + resultError.message);
                    }

                    console.log("Quiz result submitted:", resultData);
                    navigate("/report", { state: { report: { categoryScores } } });
                } catch (err) {
                    console.error("Quiz submission failed:", err);
                } finally {
                    setLoading(false);
                }
            }
        } catch (err) {
            console.error("Error handling next step:", err);
            setLoading(false);
        }
    };

    // 5) Render states
    if (!questions.length)
        return loading || typeof loading === "undefined" ? <div>Loading…</div> : loading;

    const q = questions[step];
    const selected = answers[q.id] || 0;

    return (
        <div className="quiz-container">
            <div className="quiz">
                <h2>
                    Question {step + 1} of {questions.length}
                </h2>
                <p className="question-text">{q.question_text}</p>

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
