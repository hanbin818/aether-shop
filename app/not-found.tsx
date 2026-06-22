export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0b",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            fontSize: "88px",
            margin: 0,
            letterSpacing: "6px",
          }}
        >
          404
        </h1>

        <h2
          style={{
            marginTop: "20px",
            fontSize: "32px",
            fontWeight: 600,
          }}
        >
          페이지를 찾을 수 없습니다.
        </h2>

        <p
          style={{
            marginTop: "16px",
            color: "#bbb",
            lineHeight: 1.7,
          }}
        >
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
          <br />
          AETHER 메인으로 이동해주세요.
        </p>

        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: "36px",
            padding: "14px 34px",
            border: "1px solid #fff",
            color: "#fff",
            textDecoration: "none",
            transition: "0.3s",
          }}
        >
          HOME
        </a>
      </div>
    </main>
  );
}