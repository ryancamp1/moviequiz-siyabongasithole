// Import sqlite3 and sqlite modules for database interactions
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// Open a database connection with a promise to the SQLite file
const dbPromise = open({
  filename: './db/movie_quiz.db', // Relative path to the SQLite database file
  driver: sqlite3.Database        // sqlite3 driver for database operations
});

// Export dbPromise for use in other files
module.exports = { dbPromise };
