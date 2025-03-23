import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import questions from "../utils/questions";
import Report from "./Report";
import "./Quiz.css";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showReport, setShowReport] = useState(false);

  const navigate = useNavigate();
  const handleAnswer = (questionId, score) => {
    // Keep a copy of the answers array then update the answers object with the new answer
    setAnswers({ ...answers, [questionId]: { score } }); 

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowReport(true);
    }
  };
  const resetDemo = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setShowReport(false); 
  };

  return (
    <div className="quiz">
      {showReport ? (
        <Report answers={answers} questions={questions} resetDemo={resetDemo} />
      ) : (
        <>
          <h2>{questions[currentQuestion].text}</h2>
          <div className="options">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option.id}
                className={`option-button ${answers[questions[currentQuestion].id]?.score === option.score ? "selected" : ""}`}
                onClick={() => handleAnswer(questions[currentQuestion].id, option.score)}
              >
                {option.text}
              </button>
            ))}
            
          </div>
          <button className="back-button" onClick={() => navigate('/')}>Back</button>
        </>
      )}
    </div>
  );
};

export default Quiz;