// A function to shuffle array elements (Fisher-Yates shuffle algorithm)
export function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  
// A function to calculate the quiz score
export function calculateScore(userAnswers, correctAnswers) {
    let score = 0;
  
    // Assuming userAnswers is an array of objects { questionId: X, optionId: Y }
    // And correctAnswers is an array of objects { id: X, correct: Y }
    userAnswers.forEach(userAnswer => {
      const correct = correctAnswers.find(answer => answer.id === userAnswer.questionId);
      if (correct && correct.correct === userAnswer.optionId) {
        score++;
      }
    });
  
    return score;
  }
  
  
  // A function to format the score into a percentage
  export function formatScore(score, totalQuestions) {

    console.log(score, totalQuestions);
    return (score / totalQuestions * 100).toFixed(0);
  }
  