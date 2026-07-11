"use client";

import * as React from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#04091f",
          color: "#e5e7eb",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", padding: "24px", maxWidth: 480 }}>
          <div
            style={{
              fontSize: 40,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              background: "linear-gradient(90deg,#3b82f6,#22d3ee)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Something went wrong
          </div>
          <p style={{ opacity: 0.7, marginTop: 12 }}>
            An unexpected error occurred. Please try again.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                borderRadius: 9999,
                padding: "12px 20px",
                fontWeight: 800,
                background: "#3b82f6",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                borderRadius: 9999,
                padding: "12px 20px",
                fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#e5e7eb",
              }}
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
