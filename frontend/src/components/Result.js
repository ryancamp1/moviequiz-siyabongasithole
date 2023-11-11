import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {  formatScore } from '../utils/helper';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.userAnswers) {
      console.error("Missing state at Result component");
      navigate('/');
    }
  }, [location, navigate]);

  const { userAnswers = [], score = 0, totalQuestions = 0, quiz = "" } = location.state || {};
console.log(userAnswers, score, totalQuestions, quiz, 'qqq')
  const formattedScore = formatScore(score, totalQuestions);

  return (
    <div>
        <h1>Quiz: {quiz.title}</h1>
      <h1>Your Score</h1>

      <p>{formattedScore}%</p>
      
      <Link to="/">Take another quiz</Link>
    </div>
  );
};

export default Result;
