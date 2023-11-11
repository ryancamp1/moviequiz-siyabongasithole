const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Path to the JSON file
const jsonPath = './db/quiz-data.json';

// Create a new database
const db = new sqlite3.Database('./db/movie_quiz.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the movie_quiz database.');
});

// Function to create tables
function createTables(callback) {
    const queries = [
        `CREATE TABLE IF NOT EXISTS QUIZZES (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
        );`,
        `CREATE TABLE IF NOT EXISTS QUESTIONS (
            id INTEGER PRIMARY KEY,
            quiz_id INTEGER NOT NULL,
            question TEXT NOT NULL,
            FOREIGN KEY(quiz_id) REFERENCES QUIZZES(id)
        );`,
        `CREATE TABLE IF NOT EXISTS ANSWERS (
            id INTEGER PRIMARY KEY,
            question_id INTEGER NOT NULL,
            answer TEXT NOT NULL,
            isCorrect BOOLEAN NOT NULL,
            FOREIGN KEY(question_id) REFERENCES QUESTIONS(id)
        );`
    ];

    queries.forEach((query, index) => {
        db.run(query, (err) => {
            if (err) {
                console.error(err.message);
            }
            if (index === queries.length - 1) {
                console.log('Tables created or already exist.');
                callback();
            }
        });
    });
}

// Function to insert data
function insertData() {
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err.message);
            return;
        }
        const quizzes = JSON.parse(data).movieQuiz;

        quizzes.forEach(quiz => {
            db.run(`INSERT INTO QUIZZES (name) VALUES (?)`, [quiz.name], function(err) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                const quizId = this.lastID;
                quiz.questions.forEach(question => {
                    db.run(`INSERT INTO QUESTIONS (quiz_id, question) VALUES (?, ?)`, [quizId, question.question], function(err) {
                        if (err) {
                            console.error(err.message);
                            return;
                        }
                        const questionId = this.lastID;
                        question.answers.forEach(option => {
                            db.run(`INSERT INTO ANSWERS (question_id, answer, isCorrect) VALUES (?, ?, ?)`, [questionId, option.answer, option.isCorrect], function(err) {
                                if (err) {
                                    console.error(err.message);
                                }
                            });
                        });
                    });
                });
            });
        });

        console.log('Data inserted successfully.');
    });
}

// Create tables and insert data
createTables(() => {
    insertData();
    // Close the database connection inside a setTimeout to ensure all operations are complete
    setTimeout(() => {
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Database connection closed.');
        });
    }, 5000); // Adjust the timeout as needed based on the amount of data
});
