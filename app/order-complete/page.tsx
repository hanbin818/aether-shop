"use client";

import { useEffect, useState } from "react";

export default function OrderCompletePage() {
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    const savedOrderNumber = localStorage.getItem(
      "aether-last-order-number"
    );

    if (savedOrderNumber) {
      setOrderNumber(savedOrderNumber);
    }
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0f",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#15151d",
          padding: "50px",
          borderRadius: "24px",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "20px",
          }}
        >
          주문이 접수되었습니다
        </h1>

        <p
          style={{
            color: "#bbb",
            lineHeight: "1.8",
          }}
        >
          AETHER를 이용해줘서 고마워.
          <br />
          입금 확인 후 배송이 시작됩니다.
        </p>

        {orderNumber && (
          <div
            style={{
              marginTop: "24px",
              padding: "18px",
              borderRadius: "14px",
              background: "#20202b",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#999",
              }}
            >
              주문번호
            </p>

            <h2
              style={{
                margin: "8px 0 0",
                fontSize: "24px",
              }}
            >
              {orderNumber}
            </h2>
          </div>
        )}

        <div
          style={{
            marginTop: "30px",
            padding: "24px",
            background: "#fff",
            color: "#111",
            borderRadius: "18px",
            textAlign: "left",
          }}
        >
          <h2 style={{ marginTop: 0 }}>입금 계좌</h2>

          <p>
            <strong>은행</strong>
            <br />
            국민은행
          </p>

          <p>
            <strong>계좌번호</strong>
            <br />
            000000-00-000000
          </p>

          <p>
            <strong>예금주</strong>
            <br />
            AETHER
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "30px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a href="/order-status">
            <button style={buttonStyle}>
              주문조회
            </button>
          </a>

          <a href="/products">
            <button style={buttonStyle}>
              쇼핑 계속하기
            </button>
          </a>

          <a href="/">
            <button style={darkButtonStyle}>
              홈으로
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}

const buttonStyle = {
  padding: "14px 22px",
  borderRadius: "999px",
  border: "none",
  background: "#fff",
  color: "#111",
  fontWeight: "bold",
  cursor: "pointer",
};

const darkButtonStyle = {
  ...buttonStyle,
  background: "#2a2a35",
  color: "#fff",
};