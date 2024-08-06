# Task Scheduler App 

Overview
This project is a simple mobile application using React Native that integrates with Firebase. The app is a "Task Manager" where users can add, edit, delete, and view tasks. Each task has a title, description, and status (completed or not). Additionally, the app features a leaderboard to track which users have completed the most tasks within specified periods (e.g., daily, weekly, monthly).

Dev Time: Less than 8 Hours (I will ensure to keep within this timeframe).

Requirements
1. React Native Application
I will create a new React Native project. The use of frameworks to structure my code is 100% fine; I will use whatever works best for me.
I will use functional components and hooks where applicable.
I will follow best practices for code organization and structure.

2. Firebase Integration
I will set up Firebase in the project. The amount of data used will fall within the free tier of usage.
I will use Firestore for storing task and user data.
I will use Firebase Authentication to allow users to sign up, log in, and log out.

3. Task Manager Features
Task Management: I will implement CRUD operations (Create, Read, Update, Delete) for tasks using Firestore.
Task List: I will display a list of tasks fetched from Firestore.
Task Status: I will allow users to mark tasks as completed or not completed.

4. Leaderboard Feature
I will track the number of tasks each user completes.
I will implement a leaderboard that displays the top users who have completed the most tasks.
I will allow the leaderboard to be filtered by time periods (daily, weekly, monthly).

Bonus Points (In Order of Weightage)
I will write unit tests for critical parts of the application.
I will add the ability for users to upload and display images for each task using Firebase Storage.
I will implement form validation for the authentication and task forms.
I will use TypeScript for type safety.

## Get started
1. Create .env file and add configurations
   ```bash
   FIREBASECONFIG = { FIREBASECONFIG };
   ```

3. Install dependencies

   ```bash
   npm install
   ```

4. Start the app

   ```bash
    npx expo start
   ```

4a. Start the app in ios simulator

   ```bash
    i
   ```
4b. Start the app in web simulator 

   ```bash
    w
   ```
