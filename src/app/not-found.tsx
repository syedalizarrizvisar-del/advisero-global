import Link from "next/link";

export default function NotFound() {
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
              fontSize: 64,
              fontWeight: 900,
              lineHeight: 1,
              background: "linear-gradient(90deg,#3b82f6,#22d3ee)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            404
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 8 }}>Page not found</h1>
          <p style={{ opacity: 0.7, marginTop: 12 }}>
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link
              href="/"
              style={{
                borderRadius: 9999,
                padding: "12px 20px",
                fontWeight: 800,
                background: "#3b82f6",
                color: "white",
              }}
            >
              Back to home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
