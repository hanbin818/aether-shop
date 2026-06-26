export default function EventsPage() {
  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={labelStyle}>AETHER EVENT</p>

        <h1 style={titleStyle}>이벤트</h1>

        <p style={descStyle}>
          AETHER에서 진행되는 할인, 리뷰, 시즌 이벤트를 확인할 수 있는 공간입니다.
          <br />
          현재 이벤트 페이지를 준비하고 있습니다.
        </p>

        <div style={eventBoxStyle}>
          <p style={eventLabelStyle}>COMING SOON</p>
          <h2 style={eventTitleStyle}>이벤트 준비중</h2>
          <p style={eventTextStyle}>
            카카오톡 채널 추가 혜택과 시즌 프로모션이 곧 공개됩니다.
          </p>
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
  maxWidth: "700px",
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

const eventBoxStyle = {
  background: "linear-gradient(145deg,#111,#2b2b2b)",
  color: "#fff",
  borderRadius: "24px",
  padding: "34px 22px",
  marginBottom: "28px",
};

const eventLabelStyle = {
  margin: "0 0 10px",
  color: "#d8c39f",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "4px",
};

const eventTitleStyle = {
  margin: "0 0 12px",
  fontSize: "30px",
  fontWeight: 950,
};

const eventTextStyle = {
  margin: 0,
  color: "rgba(255,255,255,.72)",
  lineHeight: 1.7,
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