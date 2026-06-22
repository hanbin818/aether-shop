export default function Footer() {
  return (
    <footer
      style={{
        background: "#111",
        color: "#fff",
        padding: "60px 20px 40px",
        marginTop: "0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "30px",
            fontWeight: 900,
            letterSpacing: "8px",
            marginBottom: "18px",
          }}
        >
          AETHER
        </h2>

        <p
          style={{
            color: "#bdbdbd",
            fontSize: "15px",
            lineHeight: "1.8",
            maxWidth: "700px",
            margin: "0 auto 30px",
          }}
        >
          프리미엄 패션과 럭셔리 라이프스타일을 위한
          <br />
          새로운 쇼핑 경험을 제공합니다.
        </p>

        <div
          style={{
            width: "100%",
            height: "1px",
            background: "#2b2b2b",
            marginBottom: "24px",
          }}
        />

        <p
          style={{
            color: "#777",
            fontSize: "13px",
            letterSpacing: "1px",
          }}
        >
          © 2026 AETHER. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}