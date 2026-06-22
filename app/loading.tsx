export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "18px",
      }}
    >
      <h1
        style={{
          fontSize: "38px",
          letterSpacing: "8px",
          margin: 0,
          fontWeight: 700,
        }}
      >
        AETHER
      </h1>

      <div
        style={{
          width: "36px",
          height: "36px",
          border: "3px solid rgba(255,255,255,0.25)",
          borderTop: "3px solid white",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}