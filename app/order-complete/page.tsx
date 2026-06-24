"use client";

import { useEffect, useState } from "react";

export default function OrderCompletePage() {
  const [orderNumber, setOrderNumber] = useState("");

  const openChatUrl = "#";

  useEffect(() => {
    const savedOrderNumber = localStorage.getItem("aether-last-order-number");

    if (savedOrderNumber) {
      setOrderNumber(savedOrderNumber);
    }
  }, []);

  const copyOrderNumber = async () => {
    if (!orderNumber) {
      alert("복사할 주문번호가 없습니다.");
      return;
    }

    await navigator.clipboard.writeText(orderNumber);
    alert("주문번호가 복사되었습니다.");
  };

  return (
    <main style={pageStyle}>
      <section style={cardStyle}>
        <p style={labelStyle}>AETHER ORDER</p>

        <h1 style={titleStyle}>주문이 완료되었습니다</h1>

        <p style={descStyle}>
          주문이 정상적으로 접수되었습니다.
          <br />
          주문번호를 복사한 뒤 카카오톡 상담창에 보내주세요.
        </p>

        <div style={orderBoxStyle}>
          <p style={orderLabelStyle}>주문번호</p>

          <h2 style={orderNumberStyle}>
            {orderNumber || "주문번호를 불러오는 중입니다"}
          </h2>

          <button type="button" onClick={copyOrderNumber} style={copyButtonStyle}>
            주문번호 복사
          </button>
        </div>

        <div style={noticeBoxStyle}>
          <strong>안내사항</strong>
          <p>
            현재 AETHER는 카카오톡 오픈채팅 상담 후 계좌이체 방식으로 주문이
            진행됩니다. 상담 확인 후 입금 계좌와 배송 안내를 도와드립니다.
          </p>
        </div>

        <div style={buttonGroupStyle}>
          <a href={openChatUrl} target="_blank" style={primaryButtonStyle}>
            카카오톡 상담하기
          </a>

          <a href="/order" style={outlineButtonStyle}>
            주문조회
          </a>

          <a href="/products" style={outlineButtonStyle}>
            쇼핑 계속하기
          </a>

          <a href="/" style={textButtonStyle}>
            홈으로 돌아가기
          </a>
        </div>
      </section>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #fff 0%, #f7f1e8 100%)",
  color: "#111",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "48px 18px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "640px",
  background: "rgba(255,255,255,0.96)",
  borderRadius: "34px",
  padding: "42px 24px",
  textAlign: "center" as const,
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 28px 90px rgba(0,0,0,0.1)",
};

const labelStyle = {
  margin: 0,
  marginBottom: "14px",
  color: "#9b8b73",
  fontSize: "12px",
  fontWeight: 950,
  letterSpacing: "4px",
};

const titleStyle = {
  margin: 0,
  marginBottom: "18px",
  fontSize: "38px",
  fontWeight: 950,
  letterSpacing: "-1.5px",
};

const descStyle = {
  margin: 0,
  color: "#666",
  fontSize: "15px",
  lineHeight: "1.8",
  wordBreak: "keep-all" as const,
};

const orderBoxStyle = {
  marginTop: "30px",
  padding: "24px 18px",
  borderRadius: "26px",
  background: "#111",
  color: "#fff",
};

const orderLabelStyle = {
  margin: 0,
  marginBottom: "10px",
  color: "#c9b89a",
  fontSize: "12px",
  fontWeight: 900,
  letterSpacing: "3px",
};

const orderNumberStyle = {
  margin: 0,
  marginBottom: "18px",
  fontSize: "22px",
  fontWeight: 950,
  wordBreak: "break-all" as const,
};

const copyButtonStyle = {
  width: "100%",
  height: "50px",
  borderRadius: "999px",
  border: "none",
  background: "#fff",
  color: "#111",
  fontSize: "15px",
  fontWeight: 950,
  cursor: "pointer",
};

const noticeBoxStyle = {
  marginTop: "20px",
  padding: "20px",
  borderRadius: "22px",
  background: "#fafafa",
  border: "1px solid #eee",
  color: "#555",
  textAlign: "left" as const,
  lineHeight: "1.7",
  fontSize: "14px",
};

const buttonGroupStyle = {
  display: "grid",
  gap: "12px",
  marginTop: "24px",
};

const primaryButtonStyle = {
  height: "56px",
  borderRadius: "999px",
  background: "#111",
  color: "#fff",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: 950,
};

const outlineButtonStyle = {
  height: "54px",
  borderRadius: "999px",
  background: "#fff",
  color: "#111",
  border: "1px solid #ddd",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "15px",
  fontWeight: 950,
};

const textButtonStyle = {
  color: "#9b8b73",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 900,
  marginTop: "6px",
};