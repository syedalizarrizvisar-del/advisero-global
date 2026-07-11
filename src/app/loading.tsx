export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#04091f",
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 9999,
          border: "3px solid rgba(59,130,246,0.25)",
          borderTopColor: "#3b82f6",
          animation: "advisero-spin 0.8s linear infinite",
        }}
      />
      <style>{`@keyframes advisero-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
