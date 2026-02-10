# Instruction

This is the original prompt used to generate the initial implementation.

You are the Tech Lead. Create a small full-stack project with a strict separation of frontend and backend.

High-level spec:
Stack: Node.js + Express backend, React frontend (TypeScript preferred). Two folders: /backend and /frontend.
Feature: Web app that draws a circle based on radius input. Frontend sends radius to backend; backend returns a hex color; frontend draws the circle centered with that color.

Functional requirements:

Frontend (React):

- White page background.
- UI: one text input (radius) and a submit/apply button (or update on input, your choice, but keep it simple and predictable).
- Validate radius:
  - Must be a number.
  - Must be non-negative; reject negatives.
  - Bound it so the circle always fits the view area. Use these bounds: min=1, max=200 (pixels).
  - Show a small inline error message if invalid; do not call backend if invalid.
- On valid radius, call backend REST API and receive { color: "#RRGGBB" }.
- Draw a circle in the center of the view with diameter = 2\*radius and fill color from backend.
  - Use CSS (border-radius) or HTML canvas; choose the simplest.
  - Ensure it stays centered and visible; no clipping at max radius.

Backend (Node + Express):

- Provide REST endpoint: POST /api/color
  - Request body JSON: { "radius": number }
  - Response JSON: { "color": "#RRGGBB" }
- Validate radius server-side as well: must be number, min=1, max=200; otherwise respond 400 with a clear error JSON.
- Generate a color code based on the radius input. Prefer deterministic output for the same radius (good for testing), but still “random-looking”.
  - Must never return white (#FFFFFF). If generated white, regenerate/adjust until non-white.
- Enable CORS for local dev (frontend dev server).

Engineering process constraints (important):

- Act as Tech Lead delegating work:
  1. First write a brief plan and repo structure.
  2. Then “Frontend Engineer” section: implement frontend with clean code + minimal styling.
  3. Then “Backend Engineer” section: implement backend.
  4. Then “Tech Lead Verification” section: confirm API contract matches, ports, integration steps, and provide run instructions.

Repo details:

- Use Vite for the frontend.
- Use npm scripts in root package.json to run both easily (e.g. concurrently) OR provide clear separate instructions.
- Backend port: 4000
- Frontend port: 5173 (default Vite)
- Keep dependencies minimal.

Deliverables:

- Full file tree listing.
- All code files content (package.json files included).
- Exact commands to run:
  - install
  - start backend
  - start frontend
- A short manual test checklist (5 items).

Do not include any irrelevant features. Keep it small but complete.
