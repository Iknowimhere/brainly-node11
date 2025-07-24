# Brainly

Collaborative learning platform with content sharing, authentication, and responsive UI.

## Features
- User authentication (signup/signin)
- Add, view, and share content (documents, videos, audio, Twitter)
- Responsive dashboard and sidebar
- Public shareable dashboard via link
- Skeleton loaders for fast UX

## Setup
1. Clone the repo
2. Install dependencies:
   - Backend: `cd brainly-backend && npm install`
   - Frontend: `cd brainly-frontend && npm install`
3. Start backend: `npm start` (from `brainly-backend`)
4. Start frontend: `npm run dev` (from `brainly-frontend`)

## Usage
- Access frontend at `http://localhost:5173`
- Access backend at `http://localhost:5000`
- Share dashboard: `/brain/share/:hash`

## Tech Stack
- Node.js, Express, MongoDB (backend)
- React, Vite, Tailwind CSS (frontend)