"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function OrderStatusPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const searchOrder = async () => {
    if (!orderNumber.trim()) {
      alert("주문번호를 입력해줘!");
      return;
    }

    setLoading(true);
    setOrder(null);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", orderNumber.trim())
      .single();

    setLoading(false);

    if (error) {
      console.error(error);
      alert("주문을 찾을 수 없어 ㅠㅠ");
      return;
    }

    setOrder(data);
  };

  return (
    <main style={mainStyle}>
      <div style={{ width: "100%", maxWidth: "720px" }}>
        <a
          href="/"
          style={{ color: "#333", textDecoration: "none", fontWeight: "700" }}
        >
          ← 홈으로
        </a>

        <h1 style={titleStyle}>주문 조회</h1>

        <section style={cardStyle}>
          <p style={{ color: "#333", textAlign: "center", fontWeight: "600" }}>
            주문번호를 입력하면 입금 및 배송 상태를 확인할 수 있어.
          </p>

          <input
            type="text"
            placeholder="주문번호 ex) AETHER-20260618-121530"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchOrder();
              }
            }}
            style={inputStyle}
          />

          <button onClick={searchOrder} disabled={loading} style={buttonStyle}>
            {loading ? "조회 중..." : "주문 조회하기"}
          </button>
        </section>

        {order && (
          <section style={cardStyle}>
            <div style={orderHeaderStyle}>
              <div>
                <h2 style={{ margin: 0, fontSize: "30px", fontWeight: "900" }}>
                  {order.order_number || `주문번호 #${order.id}`}
                </h2>

                {order.created_at && (
                  <p
                    style={{
                      color: "#333",
                      marginBottom: 0,
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    {new Date(order.created_at).toLocaleString("ko-KR")}
                  </p>
                )}
              </div>

              <span style={statusBadgeStyle}>{order.status || "입금대기"}</span>
            </div>

            <div style={infoGridStyle}>
              <p style={infoItemStyle}>
                <strong style={infoLabelStyle}>주문자</strong>
                <br />
                <span style={infoValueStyle}>{order.customer_name}</span>
              </p>

              <p style={infoItemStyle}>
                <strong style={infoLabelStyle}>배송지</strong>
                <br />
                <span style={infoValueStyle}>{order.customer_address}</span>
              </p>

              <p style={infoItemStyle}>
                <strong style={infoLabelStyle}>입금자명</strong>
                <br />
                <span style={infoValueStyle}>{order.depositor_name || "-"}</span>
              </p>

              <p style={infoItemStyle}>
                <strong style={infoLabelStyle}>결제방법</strong>
                <br />
                <span style={infoValueStyle}>
                  {order.payment_method || "무통장입금"}
                </span>
              </p>
            </div>

            <hr style={lineStyle} />

            <h3 style={{ fontSize: "22px", fontWeight: "900" }}>주문 상품</h3>

            {order.items?.map((item: any, index: number) => (
              <div key={index} style={itemRowStyle}>
                <span style={{ color: "#111", fontWeight: "700" }}>
                  {item.name}
                </span>
                <strong>
                  {item.quantity}개 × ₩{Number(item.price).toLocaleString()}
                </strong>
              </div>
            ))}

            <hr style={lineStyle} />

            <div style={totalStyle}>
              <span>총 입금금액</span>
              <strong>₩{Number(order.total_price).toLocaleString()}</strong>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

const mainStyle = {
  minHeight: "100vh",
  background: "#f5f5f5",
  padding: "60px 20px",
  color: "#111",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
};

const titleStyle = {
  fontSize: "46px",
  marginTop: "30px",
  marginBottom: "10px",
  textAlign: "center" as const,
  fontWeight: "900",
  color: "#111",
};

const cardStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "20px",
  width: "100%",
  marginTop: "24px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
};

const inputStyle = {
  width: "100%",
  padding: "16px",
  margin: "18px 0",
  border: "1px solid #ccc",
  borderRadius: "12px",
  fontSize: "16px",
  boxSizing: "border-box" as const,
  color: "#111",
  fontWeight: "700",
};

const buttonStyle = {
  width: "100%",
  padding: "16px",
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "900",
};

const orderHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  alignItems: "center",
  flexWrap: "wrap" as const,
  marginBottom: "22px",
};

const statusBadgeStyle = {
  display: "inline-block",
  padding: "10px 16px",
  background: "#111",
  color: "#fff",
  borderRadius: "999px",
  fontWeight: "900",
  fontSize: "15px",
};

const infoGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "16px",
  background: "#f1f1f1",
  padding: "22px",
  borderRadius: "16px",
  border: "1px solid #e0e0e0",
};

const infoItemStyle = {
  margin: 0,
  color: "#111",
};

const infoLabelStyle = {
  color: "#000",
  fontSize: "16px",
  fontWeight: "900",
};

const infoValueStyle = {
  display: "inline-block",
  marginTop: "8px",
  color: "#111",
  fontSize: "18px",
  fontWeight: "800",
};

const lineStyle = {
  margin: "24px 0",
  border: "none",
  borderTop: "1px solid #ddd",
};

const itemRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "16px",
  padding: "13px 0",
  borderBottom: "1px solid #eee",
  color: "#111",
  fontWeight: "700",
};

const totalStyle = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "24px",
  fontWeight: "900",
  color: "#111",
};