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

1. Enter `50`, click **Draw** — a colored circle appears centered on the page.
2. Enter `50` again — the same color is returned (deterministic).
3. Enter `1` and `200` — both render correctly within the viewport.
4. Enter `-5`, `abc`, `0`, or `201` — a red inline error appears and no request is sent.
5. Stop the backend, then click **Draw** — a "Cannot reach backend" error appears.
