
# Expense Tracker

## Description
An expense tracker application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This application allows users to track their income and expenses with features like authentication, total income/expense/savings tracking, and transaction history management.

## Setup

### Prerequisite
Ensure you have the following installed on your machine:
- Node.js
- Mongodb

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/MazharSolkar/expense_tracker.git
   cd expense_tracker
   ```
2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```
3. Install Backend dependencies:
   ```bash
   cd server
   npm install
   ```
4. Setup `.env` file using the `.env.example`
5. Create database expense_tracker with following collections
   - users
   - transactions

6. Serve the application: `Keep both the commands running`
   ```bash
   cd client
   npm run dev

   cd server
   node --watch index.js
   ```

## Features

- User authentication (Sign Up/Login)

- Add, edit, and delete transactions (income/expenses)

- Track total income, expenses, and savings

- View transaction history

- Responsive UI built with React

- Secure backend API with JWT authentication

## License

This project is licensed under the MIT License.

## Author

Developed by Mazhar Solkar.