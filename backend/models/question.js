// Import promise-based DB connection
const { dbPromise } = require('../db/database');

class Question {
  // Fetches questions for a specific quiz by its ID
  static async getByQuizId(quizId) {
    const db = await dbPromise;
    let questions = await db.all('SELECT * FROM QUESTIONS WHERE quiz_id = ?', quizId);
    questions = Question.shuffleArray(questions);
    return questions;
  }


   // Utility method to shuffle an array
   static shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  
  // Counts the number of questions in a specific quiz by its ID
  static async countByQuizId(quizId) {
    const db = await dbPromise;
    const result = await db.get('SELECT COUNT(*) as count FROM QUESTIONS WHERE quiz_id = ?', quizId);
    return result.count;
  }
}

// Exports the Question class for external use
module.exports = Question;
