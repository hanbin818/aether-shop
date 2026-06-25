"use client";

import { useEffect, useState } from "react";

export default function LandingPage() {
  const [showBenefitPopup, setShowBenefitPopup] = useState(false);

  useEffect(() => {
    const closed = sessionStorage.getItem("aether-benefit-popup-closed");

    if (!closed) {
      setShowBenefitPopup(true);
    }
  }, []);

  const closeBenefitPopup = () => {
    sessionStorage.setItem("aether-benefit-popup-closed", "true");
    setShowBenefitPopup(false);
  };

  return (
    <main style={pageStyle}>
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

        {showBenefitPopup && (
          <div style={benefitPopupStyle}>
            <button style={benefitCloseStyle} onClick={closeBenefitPopup}>
              ×
            </button>

            <div style={kakaoIconStyle}>Ch</div>

            <div style={benefitTextBoxStyle}>
              <p style={benefitLabelStyle}>SPECIAL BENEFIT</p>
              <p style={benefitTextStyle}>
                신규 가입 후 카카오톡 채널 추가시
                <br />
                전품목 <span style={benefitPercentStyle}>10%</span> 할인
              </p>
            </div>

            <div style={giftIconStyle}>🎁</div>
          </div>
        )}

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
  color: "#fff",
} as const;

const titleStyle = {
  color: "#fff",
  fontSize: "30px",
  marginBottom: "16px",
  lineHeight: 1.4,
  fontWeight: 900,
} as const;

const descStyle = {
  color: "#3f3f3f",
  marginBottom: "28px",
  lineHeight: 1.8,
  fontSize: "17px",
  fontWeight: 500,
} as const;

const benefitPopupStyle = {
  position: "relative",
  width: "100%",
  boxSizing: "border-box",
  margin: "0 auto 24px",
  padding: "18px 46px 18px 18px",
  borderRadius: "18px",
  background: "rgba(255, 255, 255, 0.92)",
  display: "flex",
  alignItems: "center",
  gap: "14px",
  boxShadow: "0 16px 40px rgba(0, 0, 0, 0.16)",
} as const;

const benefitCloseStyle = {
  position: "absolute",
  top: "12px",
  right: "14px",
  background: "transparent",
  border: "none",
  color: "#222",
  fontSize: "26px",
  lineHeight: 1,
  cursor: "pointer",
} as const;

const kakaoIconStyle = {
  width: "58px",
  height: "58px",
  borderRadius: "50%",
  background: "#fee500",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  fontWeight: 950,
  flexShrink: 0,
} as const;

const benefitTextBoxStyle = {
  textAlign: "left",
  flex: 1,
} as const;

const benefitLabelStyle = {
  margin: "0 0 5px",
  color: "#d38770",
  fontSize: "11px",
  fontWeight: 950,
  letterSpacing: "2px",
} as const;

const benefitTextStyle = {
  margin: 0,
  color: "#222",
  fontSize: "18px",
  lineHeight: 1.45,
  fontWeight: 900,
  wordBreak: "keep-all",
} as const;

const benefitPercentStyle = {
  color: "#ef5b3c",
  fontSize: "24px",
  fontWeight: 950,
} as const;

const giftIconStyle = {
  fontSize: "30px",
  flexShrink: 0,
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