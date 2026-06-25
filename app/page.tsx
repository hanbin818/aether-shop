import SummerPopup from "../components/SummerPopup";

export default function LandingPage() {
  return (
    <main style={pageStyle}>
      <SummerPopup />

      <div style={cardStyle}>
        <div style={logoStyle}>
          <h1 style={logoTextStyle}>A</h1>
        </div>

        <p style={brandStyle}>AETHER</p>

        <h2 style={titleStyle}>
          프리미엄 명품 셀렉트샵
          <br />
          AETHER
        </h2>

        <p style={descStyle}>
          상품 문의는 오픈채팅으로,
          <br />
          쇼핑은 공식 웹사이트에서 이용해주세요.
        </p>

        <a
          style={{ ...buttonStyle, ...kakaoButtonStyle }}
          href="https://open.kakao.com/o/여기에_오픈채팅주소"
          target="_blank"
          rel="noopener noreferrer"
        >
          오픈채팅 주문 / 제품문의
        </a>

        <a style={{ ...buttonStyle, ...websiteButtonStyle }} href="/home">
          공식 웹사이트
        </a>
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #f5c2b0 0%, #efb19e 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
} as const;

const cardStyle = {
  width: "100%",
  maxWidth: "500px",
  textAlign: "center",
} as const;

const logoStyle = {
  width: "130px",
  height: "130px",
  margin: "0 auto 24px",
  borderRadius: "50%",
  background: "#7b2738",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
} as const;

const logoTextStyle = {
  color: "white",
  fontSize: "70px",
  margin: 0,
  fontFamily: "serif",
} as const;

const brandStyle = {
  fontSize: "14px",
  letterSpacing: "6px",
  fontWeight: 700,
  marginBottom: "10px",
} as const;

const titleStyle = {
  fontSize: "30px",
  marginBottom: "16px",
  lineHeight: 1.4,
} as const;

const descStyle = {
  color: "#444",
  marginBottom: "40px",
  lineHeight: 1.8,
} as const;

const buttonStyle = {
  display: "block",
  textDecoration: "none",
  color: "#111",
  marginBottom: "18px",
  padding: "22px",
  borderRadius: "18px",
  fontSize: "18px",
  fontWeight: 700,
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.12)",
} as const;

const kakaoButtonStyle = {
  background: "#fee500",
} as const;

const websiteButtonStyle = {
  background: "white",
} as const;