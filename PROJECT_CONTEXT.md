# Project Context

Goal: simple full-stack demo.

Stack:
- Frontend: React + TypeScript + Vite (port 5173)
- Backend: Node.js + Express (port 4000)

Repo layout:
- /frontend
- /backend

API contract:
POST /api/color
Body: { "radius": number }
Resp: { "color": "#RRGGBB" }

Rules:
- radius must be number, integer ok, min=1 max=200
- Backend must never return #FFFFFF

Definition of done:
- Frontend validates radius, calls backend, draws centered circle with returned color.
- Backend validates and returns non-white color.
- Clear run instructions.
