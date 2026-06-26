export default function ReviewsPage() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={labelStyle}>AETHER REVIEW</p>

        <h1 style={titleStyle}>구매후기</h1>

        <p style={descStyle}>
          AETHER 고객님들의 실제 구매후기를 확인할 수 있는 공간입니다.
          <br />
          현재 리뷰 페이지를 준비하고 있습니다.
          <br />
          정식 오픈 후 다양한 후기와 착용사진을 만나보세요.
        </p>

        <div style={comingStyle}>
          리뷰 서비스 준비중
        </div>

        <a href="/home" style={buttonStyle}>
          홈으로 돌아가기
        </a>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg,#fff,#f8f5ef)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "650px",
  background: "#fff",
  borderRadius: "28px",
  padding: "50px 30px",
  textAlign: "center" as const,
  boxShadow: "0 20px 60px rgba(0,0,0,.08)",
};

const labelStyle = {
  color: "#9b8b73",
  letterSpacing: "4px",
  fontWeight: 900,
  fontSize: "12px",
};

const titleStyle = {
  fontSize: "clamp(36px,7vw,58px)",
  fontWeight: 950,
  margin: "12px 0 20px",
};

const descStyle = {
  color: "#666",
  lineHeight: 1.9,
  fontSize: "16px",
};

const comingStyle = {
  marginTop: "30px",
  marginBottom: "24px",
  padding: "20px",
  borderRadius: "18px",
  background: "#f5f5f5",
  fontWeight: 900,
  fontSize: "18px",
};

const buttonStyle = {
  display: "block",
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  padding: "18px",
  borderRadius: "999px",
  fontWeight: 900,
};