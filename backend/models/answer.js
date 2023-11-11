// Import the database promise object for connecting to the SQLite database
const { dbPromise } = require('../db/database');

class Option {
  // Retrieves all options for a given question ID
  static async getByQuestionId(questionId) {
    const db = await dbPromise;
    return db.all(`SELECT 
      id, 
      question_id, 
      answer
     FROM ANSWERS WHERE question_id = ?`, questionId);
  }

  // Retrieves an option by its ID and correctness status
  static async getByIdAndCorrectness(optionId, isCorrect) {
    const db = await dbPromise;
    return db.get('SELECT * FROM ANSWERS WHERE id = ? AND isCorrect = ?', [optionId, isCorrect]);
  }
}

// Export the Option class to enable its methods to be used in other parts of the application
module.exports = Option;
