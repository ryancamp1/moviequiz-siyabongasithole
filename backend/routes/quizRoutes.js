// Import Express and controllers
const express = require('express');
const quizController = require('../controllers/quizController');

// Initialize the router
const router = express.Router();

// Define routes for quiz-related endpoints
router.get('/', quizController.getAllQuizzes);  // Fetch all quizzes
router.get('/:quizId/questions', quizController.getQuestionsForQuiz);  // Fetch questions for a quiz
router.post('/:quizId/submit', quizController.submitQuiz);  // Submit answers to a quiz

// Export the router for use in the main server file
module.exports = router;
