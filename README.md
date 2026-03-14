# Portfolio Frontend

Frontend application for the portfolio website, built with React and Vite.

## Tech Stack

- React 18
- Vite 5
- React Router
- Axios
- React Query
- Tailwind CSS
- Framer Motion

## Project Structure

```text
portfolio-frontend/
  public/
  src/
    assets/
      css/
      image/
    components/
    services/
      api.js
    App.jsx
    main.jsx
  index.html
  package.json
  vercel.json
```

## Prerequisites

- Node.js 18+
- npm 9+

## Local Development

1. Open the frontend folder:

```bash
cd portfolio-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

`VITE_API_URL` is optional. If it is not set, the app defaults to `http://127.0.0.1:8000/api`.

4. Start development server:

```bash
npm run dev
```

The app will run on the local Vite URL shown in the terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Start Vite development server
- `npm run build`: Build production files to `dist/`
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint checks
- `npm run format`: Format `src/**/*.js` and `src/**/*.jsx` with Prettier
- `npm run test`: Run tests with Vitest

## API Integration

API calls are defined in `src/services/api.js`.

Expected backend base URL:

- Local: `http://127.0.0.1:8000/api`

Example endpoints consumed by the frontend:

- `/profile/`
- `/projects/`
- `/tools/`
- `/experiences/`
- `/education/`
- `/services/`
- `/testimonials/`
- `/certifications/`
- `/contact/`

## Deployment

This project is configured for Vercel using `vercel.json`:

- Build command: `npm run build`
- Output directory: `dist`
- Framework: `vite`

For SPA routing, all routes are rewritten to `index.html`.