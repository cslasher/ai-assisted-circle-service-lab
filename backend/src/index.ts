import express from "express";
import cors from "cors";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

/**
 * Deterministic color generation from radius.
 * Uses a simple hash-like mapping so the same radius always produces the same color,
 * but different radii produce visually distinct colors.
 * Guaranteed to never return #FFFFFF.
 */
function radiusToColor(radius: number): string {
  const r = (radius * 137 + 51) % 256;
  const g = (radius * 89 + 117) % 256;
  const b = (radius * 53 + 193) % 256;

  // If we hit white, shift blue down
  if (r === 255 && g === 255 && b === 255) {
    return "#FFFFFE";
  }

  const hex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

app.post("/api/color", (req, res) => {
  const { radius } = req.body;

  if (typeof radius !== "number" || !Number.isFinite(radius)) {
    res.status(400).json({ error: "radius must be a finite number" });
    return;
  }
  if (radius < 1 || radius > 200) {
    res.status(400).json({ error: "radius must be between 1 and 200" });
    return;
  }

  const color = radiusToColor(radius);
  res.json({ color });
});

const server = app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

function shutdown() {
  console.log("\nShutting down gracefully…");
  server.close(() => process.exit(0));
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
