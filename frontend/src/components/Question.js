import React from 'react';

const Question = ({ question, onAnswerSelect }) => {
  return (
    <div>
      <h3>{question.question}</h3> {/* Update to the correct property name */}
  
        {question.answers.map((answer) => (
          <span key={answer.id}>
            <button onClick={() => onAnswerSelect(answer.id)}>
              {answer.answer} {/* Update to the correct property name */}
            </button>
          </span>
        ))}
   
    </div>
  );
};

export default Question;
