# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Getting Started

Prerequisites

Make sure you have the following installed on your system:

Node.js (v16 or higher recommended)

npm (or yarn) for package management

Clone the Repository

To clone the repository, run the following command in your terminal:

```bash
git clone https://github.com/0rishav/hospital-management.git 

Frontend Setup

1.Navigate to the frontend directory:

```bash
cd frontend

2.Install dependencies:

```bash
npm install

3.Start the development server:

```bash
npm run dev

The application will be available at http://localhost:5173 by default.

Backend Setup

1.Navigate to the API (backend) directory:

```bash
cd api

2.Install dependencies:

```bash
npm install

3.Start the backend server using nodemon:

```bash
nodemon index.js

The backend server will be available at http://localhost:8000 by default.

Directory Structure

frontend/: Contains the React application powered by Vite.

api/: Contains the Node.js/Express backend.

Notes

Make sure both the frontend and backend servers are running simultaneously for full functionality.

Use .env files in the api and frontend directories to configure environment variables like database URIs, API keys, etc.
