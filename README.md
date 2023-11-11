## Web App Using Node as Backend And React as Front

## Tech / Framework used
#### DevDep:

- CORS
- Express
- Sqlite3
- Nodejs
- React

## Tech / Framework used | React
#### Built with:
- Axios

```bash
# clone this repository
git clone https://github.com/siyabongaprospersithole/moviequiz.git

```

## Backend Setup - Node JS

```bash
## cd to backend folder
cd backend

# Install NPM
npm i

```
## Database Migration

[Download the Database Seed File - quiz-data.json](backend/db/quiz-data.json)

```bash

## Above is the json file used to generate the DB

## Run the migration File
node db/migration.js

# Wait for the migration to succeed

# run the backend server to get the url for the post calls on your react app:
node index.js

## Backend Setup - Node JS

```

## Backend File Structure

backend/
├── controllers/
│   ├── quizController.js
├── db/
│   ├── database.js
├── models/
│   ├── quiz.js
│   ├── question.js
│   ├── answer.js
├── routes/
│   ├── quizRoutes.js
├── index.js

```bash

## cd to backend folder
cd frontend

# Install NPM
npm i

```
# Frontend File Structure - REACT

```bash

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── components/
│   │   ├── Quiz.js
│   │   ├── Question.js
│   │   ├── QuizList.js
│   │   ├── Result.js
│   ├── utils/
│   │   ├── helper.js
│   ├── services/
│   │   ├── api.js
│   ├── App.js
│   ├── index.js
│   ├── setupTests.js
├── package.json

```bash

# Run react app
npm start

# NB:
This example of a quiz using sqlite for simplicity, you can convert the db to your choice and connect to run it.
