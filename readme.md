# testproject

## Description
This project is a full-stack TypeScript application with a frontend and backend setup. The backend is built using Express, and the frontend is a React application powered by Vite.

## Features
- Full TypeScript support for both frontend and backend
- Express.js backend
- React frontend using Vite
- Tailwind CSS for styling
- Concurrent development setup for frontend and backend
- Nodemon for backend hot-reloading
- ESLint and TypeScript support
- Testing setup for both frontend and backend

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd testproject
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   ```

## Usage
### Running the project
- **Frontend:**
  ```sh
  npm run frontend
  ```
- **Backend:**
  ```sh
  npm run backend
  ```
- **Run both frontend and backend concurrently:**
  ```sh
  npm run dev
  ```

### Building the frontend
```sh
cd frontend
npm run build
```

### Testing
- **Frontend tests:**
  ```sh
  cd frontend
  npm run test
  ```
- **Backend tests:**
  ```sh
  npm run test:backend
  ```

## Dependencies
### Backend
#### Production Dependencies
- `cors`
- `express`

#### Development Dependencies
- TypeScript and Type Definitions (`@types/*`)
- `concurrently` for running multiple scripts
- `nodemon` for automatic backend restarts
- `supertest` for testing HTTP endpoints
- `vitest` for backend testing

### Frontend
#### Production Dependencies
- `react`
- `react-dom`
- `tailwindcss`
- `@tailwindcss/vite`

#### Development Dependencies
- `vite` for fast development and build
- `eslint` and plugins for linting
- `typescript` for static typing
- `vitest` and `@testing-library/react` for testing
