import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';
import Result from './components/Result';
import './App.css'; // Your main app styles

function App() {
  return (
    <Router>
      <div className="App">
        {/* You can add a header or navigation here */}
        <Routes>
          <Route path="/" element={<QuizList />} exact />
          <Route path="/quiz/:quizId" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
