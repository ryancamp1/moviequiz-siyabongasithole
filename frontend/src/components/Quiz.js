import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuizById, submitAnswers } from '../services/api';
import Question from './Question';
import Result from './Result';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navigateToResult, setNavigateToResult] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await fetchQuizById(quizId);
        setQuiz(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (navigateToResult) {


       
      navigate('/result', { state: { userAnswers, score, totalQuestions: quiz.questions.length, quiz: quiz } });
    }
  }, [navigateToResult, navigate, userAnswers, score, quiz]);

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);

   // console.log(currentQuestionIndex, quiz.questions.length - 1, 'here', answer, newAnswers)

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit(newAnswers)
    }
  };

  const handleSubmit = async (newAnswers) => {
    console.log(quizId,newAnswers)
    try {
      const response = await submitAnswers(quizId, newAnswers);
      console.log(response,'here')
      setScore(response.score);
      setNavigateToResult(true);
    } catch (error) {
        console.log(error)
      setError(error);
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <div>Error loading quiz: {error.message}</div>;
  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div>
      {navigateToResult ? (
        <div>Submitting your answers...</div>
      ) : (
        <div>
          <h2>{quiz.title}</h2>
          <Question
            question={quiz.questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
          />
          {currentQuestionIndex === quiz.questions.length - 1 && (
            <button onClick={handleSubmit}>Submit Quiz</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
