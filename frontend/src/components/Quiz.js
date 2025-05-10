import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Report from "./Report";
import "./Quiz.css";

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [choice, setAnswers] = useState({});
    const [showReport, setShowReport] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("http://localhost:5000/question"); 
                const data = await response.json();
                console.log("Fetched questions:", data); // Debugging line
                setQuestions(data);
            } catch (err) {
                console.error("Failed to fetch questions:", err);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswer = (questionId, score) => {
        setAnswers({ ...choice, [questionId]: { score } });

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowReport(true);
        }
    };

    if (questions.length === 0) return <div>Loading questions...</div>;

    const current = questions[currentQuestion];

    return (
        <div className="quiz-container">
            <div className="quiz">
                {showReport ? (
                    <Report choice={choice} questions={questions} />
                ) : (
                    <>
                        <h2 className="question-text">{current.question_text}</h2>
                        <div className="options">
                            {current.choices.map((choice) => (
                                <button
                                    key={choice.id}
                                    className={`option-button ${
                                        choice[current.id]?.score === choice.points
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => handleAnswer(current.id, choice.points)}
                                >
                                    {choice.choice_text}
                                </button>
                            ))}
                        </div>
                        <button className="back-button" onClick={() => navigate("/")}>
                            Back
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Quiz;
