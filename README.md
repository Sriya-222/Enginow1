# E-Learning Platform (FSD2)

A full-stack E-Learning application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
*   **Authentication**: Secure Signup/Login with JWT.
*   **Browsing**: Course listing with Search and Filters.
*   **Enrollment**: Users can enroll in courses and track progress.
*   **Admin**: Dashboard to manage courses and users.
*   **Design**: Modern Peach-themed UI with Tailwind CSS v4.

## Tech Stack
*   **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, React Router.
*   **Backend**: Node.js, Express, Mongoose.
*   **Database**: MongoDB Atlas.

## Getting Started

### Prerequisites
*   Node.js (v18+)
*   MongoDB Atlas URI

### Installation

1.  **Clone the repo**:
    ```bash
    git clone <repo-url>
    cd fsd2
    ```

2.  **Setup Server**:
    ```bash
    cd server
    npm install
    cp .env.example .env # (Create .env and add MONGO_URI, JWT_SECRET)
    npm run data:import # Seed data
    npm run dev
    ```

3.  **Setup Client**:
    ```bash
    cd ../client
    npm install
    npm run dev
    ```

4.  **Visit**: `http://localhost:5173`

## Testing
*   Client: `cd client && npm test`
*   Server: `cd server && npm test`

## Project Structure
*   `/client`: Frontend React application
*   `/server`: Backend Express API
