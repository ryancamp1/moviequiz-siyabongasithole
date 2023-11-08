import axios from 'axios';

// Create an instance of axios with the base URL of your backend server
const API = axios.create({
  baseURL: 'http://localhost:5000', // Replace with the actual URL of your backend
});

// Function to get all quizzes
export const fetchQuizzes = async () => {
  try {
    const { data } = await API.get('/quizzes');
    return data;
  } catch (error) {
    console.error("Error fetching quizzes: ", error);
    throw error;
  }
};

// Function to get a single quiz by its ID
export const fetchQuizById = async (quizId) => {
  try {
    const { data } = await API.get(`/quizzes/${quizId}/questions`);
    return data;
  } catch (error) {
    console.error(`Error fetching quiz with id ${quizId}: `, error);
    throw error;
  }
};

// Function to submit answers for a quiz
export const submitAnswers = async (quizId, userAnswers) => {
  try {
    const { data } = await API.post(`/quizzes/${quizId}/submit`, { answers: userAnswers });
    return data;
  } catch (error) {
    console.error(`Error submitting answers for quiz id ${quizId}: `, error);
    throw error;
  }
};

export default API;
