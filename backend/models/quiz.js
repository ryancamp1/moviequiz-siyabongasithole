// Import database connection promise
const { dbPromise } = require('../db/database');

class Quiz {
  // Retrieve all quizzes from the database
  static async getAll() {
    const db = await dbPromise;
    return db.all('SELECT * FROM QUIZZES');
  }

  // Retrieve a quiz by its unique identifier
  static async getById(quizId) {
    const db = await dbPromise;
    return db.get('SELECT * FROM QUIZZES WHERE id = ?', quizId);
  }

}

// Export Quiz class for use in other files
module.exports = Quiz;
