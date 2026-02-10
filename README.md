# Circle App

A full-stack web application that draws a colored circle based on a user-provided radius. The frontend sends the radius to the backend, which returns a deterministic hex color. The circle is then rendered centered on the page with that color.

## Purpose

This project is a small experiment in AI-assisted full-stack development.

The goal is not feature complexity, but to explore:

- Clear spec → AI delegation
- Frontend / backend contract alignment
- Human-in-the-loop verification
- Guardrails, validation, and deterministic behavior

The initial implementation was generated with AI assistance and then reviewed and refined with a senior engineering mindset.

## Tech Stack

- **Frontend:** React + TypeScript (Vite)
- **Backend:** Node.js + Express + TypeScript

## Project Structure

```
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── index.ts           # Express server with POST /api/color
└── frontend/
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── index.html
    └── src/
        ├── main.tsx           # React entry point
        └── App.tsx            # UI: input, validation, circle rendering
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Install Dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

Or from the project root:

```bash
npm run install:all
```

### Run the App

Start the backend and frontend in two separate terminals:

**Terminal 1 — Backend (port 4000):**

```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend (port 5173):**

```bash
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

### Environment Variables

| Variable       | Default | Used by  | Description                    |
| -------------- | ------- | -------- | ------------------------------ |
| `PORT`         | `4000`  | Backend  | Express server listen port     |
| `PORT`         | `5173`  | Frontend | Vite dev server port           |
| `BACKEND_PORT` | `4000`  | Frontend | Proxy target for `/api` routes |

Example: `PORT=5000 npm run dev` in the backend folder starts it on port 5000.

## API

### `POST /api/color`

Returns a deterministic hex color for a given radius.

**Request:**

```json
{ "radius": 100 }
```

**Response (200):**

```json
{ "color": "#b73975" }
```

**Error Response (400):**

```json
{ "error": "radius must be between 1 and 200" }
```

### Validation Rules

| Rule          | Detail                                |
| ------------- | ------------------------------------- |
| Type          | Must be a finite number               |
| Range         | 1–200 (pixels)                        |
| Deterministic | Same radius always returns same color |
| Never white   | `#FFFFFF` is never returned           |

Both the frontend and backend enforce these rules.

## Manual Test Checklist

1. Type `50` in the text input — circle appears automatically after a short debounce (no button needed).
2. Drag the slider — circle resizes and recolors live as you drag.
3. Type `50` again — same color as before (deterministic). Hex code is shown below the circle.
4. Enter `1` and `200` — both render correctly within the viewport.
5. Enter `-5`, `abc`, `0`, or `201` — a red inline error appears and no request is sent.
6. Stop the backend, then change the radius — a "Cannot reach backend" error appears.
