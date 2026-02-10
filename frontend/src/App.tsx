import { useState, useEffect, useRef } from "react";

const API_URL = "http://localhost:4000/api/color";
const MIN_RADIUS = 1;
const MAX_RADIUS = 200;
const DEBOUNCE_MS = 300;

function validate(value: string): string | null {
  if (value.trim() === "") return null; // empty is OK, just no circle
  const n = Number(value);
  if (isNaN(n)) return "Must be a number";
  if (n < 0) return "Cannot be negative";
  if (n < MIN_RADIUS) return `Minimum radius is ${MIN_RADIUS}`;
  if (n > MAX_RADIUS) return `Maximum radius is ${MAX_RADIUS}`;
  if (!Number.isInteger(n)) return "Must be a whole number";
  return null;
}

export default function App() {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [circle, setCircle] = useState<{ radius: number; color: string } | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const err = validate(input);
    if (err) {
      setError(err);
      return;
    }
    if (input.trim() === "") {
      setError(null);
      setCircle(null);
      return;
    }

    setError(null);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ radius: Number(input) }),
        });
        if (!res.ok) {
          const body = await res.json();
          setError(body.error || "Server error");
          return;
        }
        const { color } = await res.json();
        setCircle({ radius: Number(input), color });
      } catch {
        setError("Cannot reach backend");
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [input]);

  return (
    <div style={{ margin: 0, background: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Controls */}
      <div style={{ padding: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <label>
          Radius (1–200):
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ marginLeft: 8, padding: "4px 8px", width: 80 }}
          />
        </label>
        <input
            type="range"
            min={MIN_RADIUS}
            max={MAX_RADIUS}
            value={Number(input) || MIN_RADIUS}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: 200 }}
          />
        {error && <span style={{ color: "red", fontSize: 14 }}>{error}</span>}
      </div>

      {/* Circle display area */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 80px)",
        }}
      >
        {circle && (
          <div
            style={{
              width: circle.radius * 2,
              height: circle.radius * 2,
              borderRadius: "50%",
              backgroundColor: circle.color,
            }}
          />
        )}
      </div>
    </div>
  );
}
