export default function RequestPage() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={labelStyle}>AETHER REQUEST</p>

        <h1 style={titleStyle}>찾아주세요</h1>

        <p style={descStyle}>
          찾고 싶은 상품이 있으신가요?
          <br />
          브랜드명, 상품명, 사진을 카카오톡 채널로 보내주시면
          AETHER가 확인 후 안내해드립니다.
        </p>

        <a
          href="http://pf.kakao.com/_FvxexfX"
          target="_blank"
          rel="noopener noreferrer"
          style={buttonStyle}
        >
          카카오톡 채널로 문의하기
        </a>

        <a href="/home" style={backButtonStyle}>
          홈으로 돌아가기
        </a>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #ffffff 0%, #f7f2ea 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px 18px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "620px",
  background: "#fff",
  borderRadius: "30px",
  padding: "46px 28px",
  textAlign: "center" as const,
  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
};

const labelStyle = {
  color: "#9b8b73",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "4px",
};

const titleStyle = {
  fontSize: "clamp(38px, 8vw, 64px)",
  fontWeight: 950,
  margin: "12px 0 18px",
};

const descStyle = {
  color: "#555",
  fontSize: "16px",
  lineHeight: 1.9,
  marginBottom: "30px",
};

const buttonStyle = {
  display: "block",
  background: "#fee500",
  color: "#111",
  textDecoration: "none",
  padding: "18px",
  borderRadius: "999px",
  fontWeight: 950,
  marginBottom: "12px",
};

const backButtonStyle = {
  display: "block",
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  padding: "18px",
  borderRadius: "999px",
  fontWeight: 950,
};