# Provati Loan App - Modular Refactor

This project has been refactored from a single monolithic file into a clean, modular React folder structure.

## Folder Structure

- `src/components/`: Reusable UI components (e.g., CircularProgress).
- `src/screens/`: 
  - `HomeScreen/`: 4 variants of the dashboard dashboard.
  - `LoanFlow/`: Screens for requesting and selecting loans.
  - `ProfileFlow/`: Profile completion and document upload.
  - `LoginScreen.jsx`, `TransactionSuccessScreen.jsx`.
- `src/data/`: Centralized mock data.
- `src/App.jsx`: Main entry point and navigation router.

## How to Run

1. Make sure you have **Node.js** and **Tailwind CSS** installed.
2. Install dependencies: `npm install lucide-react`.
3. Start your dev server: `npm start` or `npm run dev`.

## Key Improvements

- **Maintainability**: Each screen is less than 200 lines long.
- **State Persistence**: User and Form data are managed centrally in `App.jsx`.
- **Reusable Components**: Clean separation of UI and Logic.
