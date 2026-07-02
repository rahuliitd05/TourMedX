# TourMedX

TourMedX is a full-stack medical tourism platform for Egypt built with React 19, Vite, Express, and MongoDB.

## Workspaces

- `frontend`: React + Vite patient-facing site and admin dashboard
- `backend`: Express + MongoDB API with JWT authentication, CRUD modules, and file uploads

## Scripts

- `npm run dev` - run frontend and backend together
- `npm run build` - build both workspaces
- `npm run lint` - lint both workspaces

## Vercel deployment

This repo is configured to deploy the React frontend and Express API together on Vercel.

1. Set the project root to the repository root.
2. Add `MONGODB_URI`, `JWT_SECRET`, `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` in Vercel environment variables.
3. Deploy with the default build command from `vercel.json`.
4. The frontend will call the API on the same Vercel domain through `/api`.
