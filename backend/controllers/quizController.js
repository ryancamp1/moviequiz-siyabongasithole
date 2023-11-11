// quizController.js
const Quiz = require('../models/quiz');
const Question = require('../models/question');
const Answer = require('../models/answer');

const quizController = {
  // Controller to get all quizzes
  async getAllQuizzes(req, res) {
    try {
      const quizzes = await Quiz.getAll();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Controller to get questions and answers for a specific quiz
  async getQuestionsForQuiz(req, res) {
    try {
      const { quizId } = req.params;
      const quiz = await Quiz.getById(quizId);
      if (!quiz) {
        res.status(404).json({ error: `Quiz with id ${quizId} not found` });
        return;
      }

      const questions = await Question.getByQuizId(quizId);
      for (let question of questions) {
        const answers = await Answer.getByQuestionId(question.id);
        question.answers = answers;
      }
      res.json({ title: quiz.title, questions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Controller for /quizzes/:quizId/submit endpoint
  async submitQuiz(req, res) {
    try {
      const { quizId } = req.params;
      const userAnswers = req.body.answers;
      let score = 0;

      for (const answerId of userAnswers) {
        const correctAnswer = await Answer.getByIdAndCorrectness(answerId, true);
        if (correctAnswer) {
          score++;
        }
      }

      const totalQuestions = await Question.countByQuizId(quizId);
      res.json({ score, total: totalQuestions });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = quizController;
