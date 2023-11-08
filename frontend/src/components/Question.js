import React from 'react';

const Question = ({ question, onAnswerSelect }) => {
  return (
    <div>
      <h3>{question.question_text}</h3> {/* Update to the correct property name */}
  
        {question.options.map((option) => (
          <span key={option.id}>
            <button onClick={() => onAnswerSelect(option.id)}>
              {option.option_text} {/* Update to the correct property name */}
            </button>
          </span>
        ))}
   
    </div>
  );
};

export default Question;
