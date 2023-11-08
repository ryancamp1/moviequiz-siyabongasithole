import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuizzes } from '../services/api';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchQuizzes();
        setQuizzes(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  if (error) {
    return <div>Error fetching quizzes: {error.message}</div>;
  }

  return (
    <div className= 'quiz-container'>
      <h1>Select a Quiz</h1>
  
        {quizzes.map((quiz) => (
          <span key={quiz.id}>
            <Link id='start-button' to={`/quiz/${quiz.id}`}>
              {quiz.title} - {quiz.description}
            </Link>
          </span>
        ))}
    
    </div>
  );
};

export default QuizList;
