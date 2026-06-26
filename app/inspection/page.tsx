export default function InspectionPage() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={labelStyle}>AETHER INSPECTION</p>

        <h1 style={titleStyle}>검수사진</h1>

        <p style={descStyle}>
          상품 출고 전 컨디션과 디테일을 확인할 수 있는 검수사진 공간입니다.
          <br />
          실제 상품 이미지, 구성품, 로고, 상태 등을 순차적으로 안내할 예정입니다.
        </p>

        <div style={gridStyle}>
          <div style={sampleBoxStyle}>DETAIL</div>
          <div style={sampleBoxStyle}>LOGO</div>
          <div style={sampleBoxStyle}>PACKAGE</div>
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
  background: "linear-gradient(180deg,#fff,#f7f2ea)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "720px",
  background: "#fff",
  borderRadius: "30px",
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
  marginBottom: "30px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "14px",
  marginBottom: "28px",
};

const sampleBoxStyle = {
  height: "150px",
  borderRadius: "20px",
  background: "linear-gradient(145deg,#111,#2b2b2b)",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 950,
  letterSpacing: "2px",
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